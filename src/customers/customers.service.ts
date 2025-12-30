import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: {
        ...createCustomerDto,
        tenantId,
        tags: createCustomerDto.tags ? createCustomerDto.tags.split(',') : [],
      },
    });
  }

  async findAll(tenantId: string, skip = 0, take = 20) {
    const [customers, total] = await Promise.all([
      this.prisma.customer.findMany({
        where: { tenantId },
        skip,
        take,
        include: {
          sales: { select: { id: true } },
          serviceOrders: { select: { id: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.customer.count({ where: { tenantId } }),
    ]);

    return { data: customers, total, skip, take };
  }

  async findOne(tenantId: string, id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
      include: {
        sales: { orderBy: { createdAt: 'desc' } },
        serviceOrders: { orderBy: { createdAt: 'desc' } },
        receivables: { orderBy: { createdAt: 'desc' } },
      },
    });
  }

  async update(tenantId: string, id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { id },
      data: {
        ...updateCustomerDto,
        tags: updateCustomerDto.tags ? updateCustomerDto.tags.split(',') : undefined,
      },
    });
  }

  async remove(tenantId: string, id: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }

  async search(tenantId: string, query: string) {
    return this.prisma.customer.findMany({
      where: {
        tenantId,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { phone: { contains: query, mode: 'insensitive' } },
          { document: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 10,
    });
  }

  async getStats(tenantId: string) {
    const totalCustomers = await this.prisma.customer.count({ where: { tenantId } });
    const totalSales = await this.prisma.sale.aggregate({
      where: { tenantId },
      _sum: { total: true },
    });

    const totalSalesValue = totalSales._sum.total ? parseFloat(totalSales._sum.total.toString()) : 0;

    return {
      totalCustomers,
      totalSalesValue,
      averageOrderValue: totalCustomers > 0 ? totalSalesValue / totalCustomers : 0,
    };
  }
}
