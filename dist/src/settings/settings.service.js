"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const bcryptjs_1 = require("bcryptjs");
let SettingsService = class SettingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getTenant(tenantId) {
        return this.prisma.tenant.findUnique({
            where: { id: tenantId },
            include: { users: true },
        });
    }
    async updateTenant(tenantId, updateTenantDto) {
        const { settings, ...data } = updateTenantDto;
        return this.prisma.tenant.update({
            where: { id: tenantId },
            data,
        });
    }
    async getUsers(tenantId) {
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
    async getUser(tenantId, userId) {
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
    async createUser(tenantId, createUserDto) {
        const hashedPassword = await (0, bcryptjs_1.hash)(createUserDto.password, 10);
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
    async updateUser(tenantId, userId, updateUserDto) {
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
    async deleteUser(tenantId, userId) {
        return this.prisma.user.delete({
            where: { id: userId },
        });
    }
    async getAuditLogs(tenantId, skip = 0, take = 50) {
        const logs = await this.prisma.auditLog.findMany({
            where: { tenantId },
            skip,
            take,
            orderBy: { createdAt: 'desc' },
        });
        return logs;
    }
    async exportData(tenantId) {
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
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SettingsService);
//# sourceMappingURL=settings.service.js.map