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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
let SalesService = class SalesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(tenantId, createSaleDto, userId) {
        const { items, ...saleData } = createSaleDto;
        let subtotal = 0;
        let totalTax = 0;
        let totalCost = 0;
        const saleItems = [];
        for (const item of items) {
            const itemTotal = item.quantity * item.unitPrice;
            const itemDiscount = item.discount || 0;
            const itemTax = (itemTotal - itemDiscount) * ((item.taxRate || 0) / 100);
            const itemCost = item.quantity * (item.unitPrice * 0.6);
            subtotal += itemTotal - itemDiscount;
            totalTax += itemTax;
            totalCost += itemCost;
            saleItems.push({
                ...item,
                saleId: '',
                unitCost: item.unitPrice * 0.6,
                subtotal: itemTotal - itemDiscount,
            });
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
                subtotal: new library_1.Decimal(subtotal),
                discount: new library_1.Decimal(totalDiscount),
                taxTotal: new library_1.Decimal(totalTax),
                total: new library_1.Decimal(finalTotal),
                totalCost: new library_1.Decimal(totalCost),
                grossProfit: new library_1.Decimal(grossProfit),
                profitMargin: new library_1.Decimal(profitMargin),
                netProfit: new library_1.Decimal(grossProfit - totalDiscount),
                status: client_1.SaleStatus.COMPLETED,
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
    async findAll(tenantId, skip = 0, take = 20) {
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
    async findOne(tenantId, id) {
        return this.prisma.sale.findUnique({
            where: { id },
            include: {
                customer: true,
                items: { include: { product: true } },
                receivables: true,
            },
        });
    }
    async update(tenantId, id, updateSaleDto) {
        return this.prisma.sale.update({
            where: { id },
            data: updateSaleDto,
            include: { customer: true, items: true },
        });
    }
    async getDailySales(tenantId, date) {
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
    async getPaymentMethodStats(tenantId) {
        const stats = await this.prisma.sale.groupBy({
            by: ['paymentMethod'],
            where: { tenantId },
            _sum: { total: true },
            _count: { id: true },
        });
        return stats;
    }
    async getSalesStats(tenantId, days = 30) {
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
        }, {});
        return Object.entries(groupedByDate).map(([date, data]) => ({
            date,
            ...data,
        }));
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SalesService);
//# sourceMappingURL=sales.service.js.map