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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let ReportsService = class ReportsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSalesReport(tenantId, startDate, endDate) {
        const sales = await this.prisma.sale.findMany({
            where: {
                tenantId,
                createdAt: { gte: startDate, lte: endDate },
            },
            include: { customer: true, items: true },
        });
        const totalSales = sales.length;
        const totalRevenue = sales.reduce((sum, s) => {
            const total = typeof s.total === 'number' ? s.total : parseFloat(s.total.toString());
            return sum + total;
        }, 0);
        const averageTicket = totalRevenue / (totalSales || 1);
        const byPaymentMethod = {};
        sales.forEach(s => {
            if (!byPaymentMethod[s.paymentMethod]) {
                byPaymentMethod[s.paymentMethod] = { count: 0, total: 0 };
            }
            byPaymentMethod[s.paymentMethod].count++;
            const total = typeof s.total === 'number' ? s.total : parseFloat(s.total.toString());
            byPaymentMethod[s.paymentMethod].total += total;
        });
        return {
            period: { startDate, endDate },
            totalSales,
            totalRevenue,
            averageTicket,
            byPaymentMethod,
            sales,
        };
    }
    async getInventoryReport(tenantId) {
        const products = await this.prisma.product.findMany({
            where: { tenantId },
            include: { variants: true },
        });
        const total = products.length;
        return {
            total,
            lowStock: 0,
            outOfStock: 0,
            items: products,
        };
    }
    async getProductPerformance(tenantId) {
        const products = await this.prisma.product.findMany({
            where: { tenantId },
            include: {
                variants: true,
                _count: { select: { saleItems: true } },
            },
        });
        return products.map(p => ({
            id: p.id,
            name: p.name,
            brand: p.brand,
            category: p.category,
            totalSold: p._count.saleItems || 0,
            totalRevenue: 0,
            variants: p.variants.length,
        }));
    }
    async getCustomerAnalysis(tenantId) {
        const customers = await this.prisma.customer.findMany({
            where: { tenantId },
            include: {
                sales: { select: { total: true } },
            },
        });
        const analysis = customers.map(c => {
            const totalValue = c.sales.reduce((sum, s) => {
                const total = typeof s.total === 'number' ? s.total : parseFloat(s.total.toString());
                return sum + total;
            }, 0);
            return {
                id: c.id,
                name: c.name,
                email: c.email,
                totalPurchases: c.sales.length,
                totalValue,
                averagePurchase: c.sales.length > 0 ? totalValue / c.sales.length : 0,
            };
        });
        return analysis.sort((a, b) => b.totalValue - a.totalValue);
    }
    async getServiceOrderStats(tenantId) {
        const [total, completed, pending, cancelled] = await Promise.all([
            this.prisma.serviceOrder.count({ where: { tenantId } }),
            this.prisma.serviceOrder.count({ where: { tenantId, status: 'COMPLETED' } }),
            this.prisma.serviceOrder.count({ where: { tenantId, status: 'OPEN' } }),
            this.prisma.serviceOrder.count({ where: { tenantId, status: 'CANCELED' } }),
        ]);
        const orders = await this.prisma.serviceOrder.findMany({
            where: { tenantId },
            include: { parts: true },
        });
        const totalRevenue = orders.reduce((sum, o) => {
            const total = typeof o.total === 'number' ? o.total : parseFloat(o.total.toString());
            return sum + total;
        }, 0);
        return {
            total,
            completed,
            pending,
            cancelled,
            totalRevenue,
            averageValue: total > 0 ? totalRevenue / total : 0,
        };
    }
    async getTaxReport(tenantId, startDate, endDate) {
        const sales = await this.prisma.sale.findMany({
            where: {
                tenantId,
                createdAt: { gte: startDate, lte: endDate },
            },
        });
        const totalTax = sales.reduce((sum, s) => {
            const taxTotal = s.taxTotal ? (typeof s.taxTotal === 'number' ? s.taxTotal : parseFloat(s.taxTotal.toString())) : 0;
            return sum + taxTotal;
        }, 0);
        const totalRevenue = sales.reduce((sum, s) => {
            const total = typeof s.total === 'number' ? s.total : parseFloat(s.total.toString());
            return sum + total;
        }, 0);
        return {
            period: { startDate, endDate },
            totalRevenue,
            totalTax,
            effectiveTaxRate: totalRevenue > 0 ? (totalTax / totalRevenue) * 100 : 0,
            sales,
        };
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map