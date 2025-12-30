import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateServiceOrderDto, UpdateServiceOrderDto } from './dto/create-service-order.dto';
import { ServiceOrderStatus } from '@prisma/client';

@Injectable()
export class ServiceOrdersService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, createServiceOrderDto: CreateServiceOrderDto, userId: string) {
    const { services, ...osData } = createServiceOrderDto;

    const totalCost = services.reduce((sum, s) => sum + s.laborCost, 0);

    const code = `OS-${Date.now()}`;

    const serviceOrder = await this.prisma.serviceOrder.create({
      data: {
        code,
        customerId: osData.customerId,
        deviceBrand: osData.deviceInfo?.split('-')[0] || 'Unknown',
        reportedIssue: osData.problem,
        laborCost: totalCost,
        total: totalCost,
        status: ServiceOrderStatus.OPEN,
        tenantId,
        notes: osData.notes,
      },
      include: {
        parts: true,
        customer: true,
      },
    });

    return serviceOrder;
  }

  async findAll(tenantId: string, skip = 0, take = 20) {
    const [orders, total] = await Promise.all([
      this.prisma.serviceOrder.findMany({
        where: { tenantId },
        skip,
        take,
        include: { customer: true, parts: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.serviceOrder.count({ where: { tenantId } }),
    ]);

    return { data: orders, total, skip, take };
  }

  async findOne(tenantId: string, id: string) {
    return this.prisma.serviceOrder.findUnique({
      where: { id },
      include: {
        customer: true,
        parts: true,
        timeline: true,
      },
    });
  }

  async update(tenantId: string, id: string, updateServiceOrderDto: UpdateServiceOrderDto) {
    const serviceOrder = await this.prisma.serviceOrder.update({
      where: { id },
      data: {
        ...updateServiceOrderDto,
      },
      include: {
        customer: true,
        parts: true,
        timeline: true,
      },
    });

    return serviceOrder;
  }

  async getByStatus(tenantId: string, status: ServiceOrderStatus) {
    return this.prisma.serviceOrder.findMany({
      where: { tenantId, status },
      include: { customer: true, parts: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getStats(tenantId: string) {
    const [received, inProgress, completed, cancelled] = await Promise.all([
      this.prisma.serviceOrder.count({
        where: { tenantId, status: ServiceOrderStatus.OPEN },
      }),
      this.prisma.serviceOrder.count({
        where: { tenantId, status: ServiceOrderStatus.IN_REPAIR },
      }),
      this.prisma.serviceOrder.count({
        where: { tenantId, status: ServiceOrderStatus.COMPLETED },
      }),
      this.prisma.serviceOrder.count({
        where: { tenantId, status: ServiceOrderStatus.CANCELED },
      }),
    ]);

    return {
      received,
      inProgress,
      completed,
      cancelled,
      total: received + inProgress + completed + cancelled,
    };
  }
}
