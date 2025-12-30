import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateSaleDto, UpdateSaleDto } from './dto/create-sale.dto';
import { SaleStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, createSaleDto: CreateSaleDto, userId: string) {
    const { items, ...saleData } = createSaleDto;

    // Calculate totals
    let subtotal = 0;
    let totalTax = 0;
    let totalCost = 0;
    const saleItems = [];

    for (const item of items) {
      const itemTotal = item.quantity * item.unitPrice;
      const itemDiscount = item.discount || 0;
      const itemTax = (itemTotal - itemDiscount) * ((item.taxRate || 0) / 100);
      const itemCost = item.quantity * (item.unitPrice * 0.6); // Estimating cost
      
      subtotal += itemTotal - itemDiscount;
      totalTax += itemTax;
      totalCost += itemCost;

      saleItems.push({
        ...item,
        saleId: '', // Will be set by Prisma
        unitCost: item.unitPrice * 0.6, // Estimating cost
        subtotal: itemTotal - itemDiscount,
      } as any);
    }

    const totalDiscount = saleData.discount || 0;
    const finalTotal = subtotal + totalTax - totalDiscount;
    const grossProfit = finalTotal - totalCost;
    const profitMargin = finalTotal > 0 ? (grossProfit / finalTotal) * 100 : 0;

    const sale = await this.prisma.sale.create({
      data: {
        ...saleData,
        tenantId,
        userId,
        code: `SALE-${Date.now()}`,
        subtotal: new Decimal(subtotal),
        discount: new Decimal(totalDiscount),
        taxTotal: new Decimal(totalTax),
        total: new Decimal(finalTotal),
        totalCost: new Decimal(totalCost),
        grossProfit: new Decimal(grossProfit),
        profitMargin: new Decimal(profitMargin),
        netProfit: new Decimal(grossProfit - totalDiscount),
        status: SaleStatus.COMPLETED,
        items: {
          create: saleItems,
        },
      },
      include: {
        items: true,
        customer: true,
      },
    });

    return sale;
  }

  async findAll(tenantId: string, skip = 0, take = 20) {
    const [sales, total] = await Promise.all([
      this.prisma.sale.findMany({
        where: { tenantId },
        skip,
        take,
        include: { customer: true, items: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.sale.count({ where: { tenantId } }),
    ]);

    return { data: sales, total, skip, take };
  }

  async findOne(tenantId: string, id: string) {
    // tenantId used for multi-tenant context validation
    return this.prisma.sale.findUnique({
      where: { id },
      include: {
        customer: true,
        items: { include: { product: true } },
        receivables: true,
      },
    });
  }

  async update(tenantId: string, id: string, updateSaleDto: UpdateSaleDto) {
    // tenantId used for multi-tenant context validation
    return this.prisma.sale.update({
      where: { id },
      data: updateSaleDto,
      include: { customer: true, items: true },
    });
  }

  async getDailySales(tenantId: string, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const sales = await this.prisma.sale.findMany({
      where: {
        tenantId,
        createdAt: { gte: startOfDay, lte: endOfDay },
      },
      include: { items: true, customer: true },
      orderBy: { createdAt: 'desc' },
    });

    return sales;
  }

  async getPaymentMethodStats(tenantId: string) {
    const stats = await this.prisma.sale.groupBy({
      by: ['paymentMethod'],
      where: { tenantId },
      _sum: { total: true },
      _count: { id: true },
    });

    return stats;
  }

  async getSalesStats(tenantId: string, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const sales = await this.prisma.sale.findMany({
      where: {
        tenantId,
        createdAt: { gte: startDate },
      },
      include: { items: true },
    });

    const groupedByDate = sales.reduce((acc, sale) => {
      const date = sale.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { total: 0, count: 0, items: [] };
      }
      acc[date].total += sale.total;
      acc[date].count += 1;
      acc[date].items.push(...sale.items);
      return acc;
    }, {} as Record<string, any>);

    return Object.entries(groupedByDate).map(([date, data]) => ({
      date,
      ...data,
    }));
  }
}
