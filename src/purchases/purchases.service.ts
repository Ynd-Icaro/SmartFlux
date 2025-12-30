import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreatePurchaseDto, UpdatePurchaseDto, CreateSupplierDto, UpdateSupplierDto } from './dto/create-purchase.dto';
import { PurchaseStatus } from '@prisma/client';

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  // SUPPLIERS
  async createSupplier(tenantId: string, createSupplierDto: CreateSupplierDto) {
    const data: any = {
      name: createSupplierDto.name,
      document: createSupplierDto.document,
      email: createSupplierDto.email,
      tenantId,
      type: 'NORMAL',
    };
    return this.prisma.supplier.create({ data });
  }

  async getSuppliers(tenantId: string, skip = 0, take = 20) {
    const [suppliers, total] = await Promise.all([
      this.prisma.supplier.findMany({
        where: { tenantId },
        skip,
        take,
        include: { purchases: true },
        orderBy: { name: 'asc' },
      }),
      this.prisma.supplier.count({ where: { tenantId } }),
    ]);

    return { data: suppliers, total };
  }

  async getSupplier(tenantId: string, id: string) {
    return this.prisma.supplier.findUnique({
      where: { id },
      include: { purchases: { include: { items: true } } },
    });
  }

  async updateSupplier(tenantId: string, id: string, updateSupplierDto: UpdateSupplierDto) {
    return this.prisma.supplier.update({
      where: { id },
      data: updateSupplierDto,
    });
  }

  async deleteSupplier(tenantId: string, id: string) {
    return this.prisma.supplier.delete({
      where: { id },
    });
  }

  async searchSuppliers(tenantId: string, query: string) {
    return this.prisma.supplier.findMany({
      where: {
        tenantId,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { document: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 10,
    });
  }

  // PURCHASES
  async createPurchase(tenantId: string, createPurchaseDto: CreatePurchaseDto, userId: string) {
    const { items, ...purchaseData } = createPurchaseDto;

    let subtotal = 0;
    let totalTax = 0;
    const purchaseItems = [];

    for (const item of items) {
      const itemTotal = item.quantity * item.unitCost;
      const itemDiscount = item.discount || 0;
      const itemTax = item.tax || 0;

      subtotal += itemTotal - itemDiscount;
      totalTax += itemTax;

      purchaseItems.push({
        productId: item.productVariantId,
        quantity: item.quantity,
        subtotal: itemTotal - itemDiscount,
        totalCost: itemTax,
      });
    }

    const freight = purchaseData.freight || 0;
    const discount = purchaseData.discount || 0;
    const total = subtotal + totalTax + freight - discount;

    const purchase = await this.prisma.purchase.create({
      data: {
        code: `PUR-${Date.now()}`,
        supplierId: purchaseData.supplierId,
        tenantId,
        subtotal,
        taxTotal: totalTax,
        freightCost: freight,
        otherCosts: discount,
        total,
        paymentMethod: 'BANK_SLIP',
        status: PurchaseStatus.PENDING,
        items: {
          create: purchaseItems,
        },
      },
      include: {
        items: true,
        supplier: true,
      },
    });

    return purchase;
  }

  async getPurchases(tenantId: string, skip = 0, take = 20) {
    const [purchases, total] = await Promise.all([
      this.prisma.purchase.findMany({
        where: { tenantId },
        skip,
        take,
        include: { items: true, supplier: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.purchase.count({ where: { tenantId } }),
    ]);

    return { data: purchases, total };
  }

  async getPurchase(tenantId: string, id: string) {
    return this.prisma.purchase.findUnique({
      where: { id },
      include: {
        items: true,
        supplier: true,
      },
    });
  }

  async updatePurchase(tenantId: string, id: string, updatePurchaseDto: UpdatePurchaseDto) {
    return this.prisma.purchase.update({
      where: { id },
      data: updatePurchaseDto,
      include: { items: true, supplier: true },
    });
  }

  async getPurchaseStats(tenantId: string) {
    const [pending, received, cancelled] = await Promise.all([
      this.prisma.purchase.aggregate({
        where: { tenantId, status: PurchaseStatus.PENDING },
        _sum: { total: true },
      }),
      this.prisma.purchase.aggregate({
        where: { tenantId, status: PurchaseStatus.RECEIVED },
        _sum: { total: true },
      }),
      this.prisma.purchase.aggregate({
        where: { tenantId, status: PurchaseStatus.CANCELED },
        _sum: { total: true },
      }),
    ]);

    const pendingAmount = pending._sum.total ? parseFloat(pending._sum.total.toString()) : 0;
    const receivedAmount = received._sum.total ? parseFloat(received._sum.total.toString()) : 0;
    const cancelledAmount = cancelled._sum.total ? parseFloat(cancelled._sum.total.toString()) : 0;

    return {
      pending: pendingAmount,
      received: receivedAmount,
      cancelled: cancelledAmount,
      total: pendingAmount + receivedAmount,
    };
  }

  async getTaxReport(tenantId: string, startDate: Date, endDate: Date) {
    const purchases = await this.prisma.purchase.findMany({
      where: {
        tenantId,
        createdAt: { gte: startDate, lte: endDate },
      },
      include: { items: true },
    });

    const totalTax = purchases.reduce((sum, p) => {
      const tax = typeof p.taxTotal === 'number' ? p.taxTotal : parseFloat(p.taxTotal.toString());
      return sum + tax;
    }, 0);

    const totalCost = purchases.reduce((sum, p) => {
      const total = typeof p.total === 'number' ? p.total : parseFloat(p.total.toString());
      return sum + total;
    }, 0);

    return {
      period: { startDate, endDate },
      totalPurchases: purchases.length,
      totalCost,
      totalTax,
      effectiveTaxRate: totalCost > 0 ? (totalTax / totalCost) * 100 : 0,
    };
  }
}
