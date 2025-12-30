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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let CustomersService = class CustomersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(tenantId, createCustomerDto) {
        return this.prisma.customer.create({
            data: {
                ...createCustomerDto,
                tenantId,
                tags: createCustomerDto.tags ? createCustomerDto.tags.split(',') : [],
            },
        });
    }
    async findAll(tenantId, skip = 0, take = 20) {
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
    async findOne(tenantId, id) {
        return this.prisma.customer.findUnique({
            where: { id },
            include: {
                sales: { orderBy: { createdAt: 'desc' } },
                serviceOrders: { orderBy: { createdAt: 'desc' } },
                receivables: { orderBy: { createdAt: 'desc' } },
            },
        });
    }
    async update(tenantId, id, updateCustomerDto) {
        return this.prisma.customer.update({
            where: { id },
            data: {
                ...updateCustomerDto,
                tags: updateCustomerDto.tags ? updateCustomerDto.tags.split(',') : undefined,
            },
        });
    }
    async remove(tenantId, id) {
        return this.prisma.customer.delete({
            where: { id },
        });
    }
    async search(tenantId, query) {
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
    async getStats(tenantId) {
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
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map