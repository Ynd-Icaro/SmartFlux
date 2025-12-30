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
exports.PurchasesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const client_1 = require("@prisma/client");
let PurchasesService = class PurchasesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSupplier(tenantId, createSupplierDto) {
        const data = {
            name: createSupplierDto.name,
            document: createSupplierDto.document,
            email: createSupplierDto.email,
            tenantId,
            type: 'NORMAL',
        };
        return this.prisma.supplier.create({ data });
    }
    async getSuppliers(tenantId, skip = 0, take = 20) {
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
    async getSupplier(tenantId, id) {
        return this.prisma.supplier.findUnique({
            where: { id },
            include: { purchases: { include: { items: true } } },
        });
    }
    async updateSupplier(tenantId, id, updateSupplierDto) {
        return this.prisma.supplier.update({
            where: { id },
            data: updateSupplierDto,
        });
    }
    async deleteSupplier(tenantId, id) {
        return this.prisma.supplier.delete({
            where: { id },
        });
    }
    async searchSuppliers(tenantId, query) {
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
    async createPurchase(tenantId, createPurchaseDto, userId) {
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
                status: client_1.PurchaseStatus.PENDING,
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
    async getPurchases(tenantId, skip = 0, take = 20) {
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
    async getPurchase(tenantId, id) {
        return this.prisma.purchase.findUnique({
            where: { id },
            include: {
                items: true,
                supplier: true,
            },
        });
    }
    async updatePurchase(tenantId, id, updatePurchaseDto) {
        return this.prisma.purchase.update({
            where: { id },
            data: updatePurchaseDto,
            include: { items: true, supplier: true },
        });
    }
    async getPurchaseStats(tenantId) {
        const [pending, received, cancelled] = await Promise.all([
            this.prisma.purchase.aggregate({
                where: { tenantId, status: client_1.PurchaseStatus.PENDING },
                _sum: { total: true },
            }),
            this.prisma.purchase.aggregate({
                where: { tenantId, status: client_1.PurchaseStatus.RECEIVED },
                _sum: { total: true },
            }),
            this.prisma.purchase.aggregate({
                where: { tenantId, status: client_1.PurchaseStatus.CANCELED },
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
    async getTaxReport(tenantId, startDate, endDate) {
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
};
exports.PurchasesService = PurchasesService;
exports.PurchasesService = PurchasesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PurchasesService);
//# sourceMappingURL=purchases.service.js.map