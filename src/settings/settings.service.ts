import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UpdateTenantDto, UpdateUserDto, CreateUserDto } from './dto/update-settings.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  // TENANT MANAGEMENT
  async getTenant(tenantId: string) {
    return this.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { users: true },
    });
  }

  async updateTenant(tenantId: string, updateTenantDto: UpdateTenantDto) {
    const { settings, ...data } = updateTenantDto as any;
    return this.prisma.tenant.update({
      where: { id: tenantId },
      data,
    });
  }

  // USER MANAGEMENT
  async getUsers(tenantId: string) {
    return this.prisma.user.findMany({
      where: { tenantId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getUser(tenantId: string, userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        tenantId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async createUser(tenantId: string, createUserDto: CreateUserDto) {
    const hashedPassword = await hash(createUserDto.password, 10);
    
    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        role: createUserDto.role,
        tenantId,
        passwordHash: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async updateUser(tenantId: string, userId: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        role: updateUserDto.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async deleteUser(tenantId: string, userId: string) {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }

  // AUDIT LOG
  async getAuditLogs(tenantId: string, skip = 0, take = 50) {
    const logs = await this.prisma.auditLog.findMany({
      where: { tenantId },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });

    return logs;
  }

  // BACKUP & EXPORT
  async exportData(tenantId: string) {
    const [products, sales, customers, orders, receivables] = await Promise.all([
      this.prisma.product.findMany({ where: { tenantId } }),
      this.prisma.sale.findMany({ where: { tenantId }, include: { items: true } }),
      this.prisma.customer.findMany({ where: { tenantId } }),
      this.prisma.serviceOrder.findMany({ where: { tenantId }, include: { parts: true } }),
      this.prisma.receivable.findMany({ where: { tenantId } }),
    ]);

    return {
      exportDate: new Date(),
      tenant: tenantId,
      data: {
        products,
        sales,
        customers,
        serviceOrders: orders,
        receivables,
      },
    };
  }
}
