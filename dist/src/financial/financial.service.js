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
exports.FinancialService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let FinancialService = class FinancialService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createReceivable(tenantId, createReceivableDto) {
        return this.prisma.receivable.create({
            data: {
                description: createReceivableDto.amount?.toString() || 'Payment',
                amount: createReceivableDto.amount,
                dueDate: createReceivableDto.dueDate,
                tenantId,
                isPaid: false,
                notes: createReceivableDto.notes,
            },
            include: { sale: true, customer: true },
        });
    }
    async getReceivables(tenantId, skip = 0, take = 20) {
        const [receivables, total] = await Promise.all([
            this.prisma.receivable.findMany({
                where: { tenantId },
                skip,
                take,
                include: { sale: true, customer: true },
                orderBy: { dueDate: 'asc' },
            }),
            this.prisma.receivable.count({ where: { tenantId } }),
        ]);
        return { data: receivables, total };
    }
    async getReceivableStats(tenantId) {
        const pending = await this.prisma.receivable.aggregate({
            where: { tenantId, isPaid: false },
            _sum: { amount: true },
        });
        const paid = await this.prisma.receivable.aggregate({
            where: { tenantId, isPaid: true },
            _sum: { amount: true },
        });
        const overdue = await this.prisma.receivable.aggregate({
            where: {
                tenantId,
                isPaid: false,
                dueDate: { lt: new Date() },
            },
            _sum: { amount: true },
        });
        const pendingAmount = pending._sum.amount ? parseFloat(pending._sum.amount.toString()) : 0;
        const paidAmount = paid._sum.amount ? parseFloat(paid._sum.amount.toString()) : 0;
        const overdueAmount = overdue._sum.amount ? parseFloat(overdue._sum.amount.toString()) : 0;
        return {
            pending: pendingAmount,
            paid: paidAmount,
            overdue: overdueAmount,
            total: pendingAmount + paidAmount,
        };
    }
    async updateReceivable(tenantId, id, updateReceivableDto) {
        return this.prisma.receivable.update({
            where: { id },
            data: updateReceivableDto,
            include: { sale: true, customer: true },
        });
    }
    async createExpense(tenantId, createExpenseDto) {
        return this.prisma.expense.create({
            data: {
                description: createExpenseDto.description,
                amount: createExpenseDto.amount,
                category: 'OTHER',
                dueDate: createExpenseDto.dueDate,
                tenantId,
                isPaid: false,
                notes: createExpenseDto.notes,
            },
        });
    }
    async getExpenses(tenantId, skip = 0, take = 20) {
        const [expenses, total] = await Promise.all([
            this.prisma.expense.findMany({
                where: { tenantId },
                skip,
                take,
                orderBy: { dueDate: 'asc' },
            }),
            this.prisma.expense.count({ where: { tenantId } }),
        ]);
        return { data: expenses, total };
    }
    async getExpenseStats(tenantId) {
        const pending = await this.prisma.expense.aggregate({
            where: { tenantId, isPaid: false },
            _sum: { amount: true },
        });
        const paid = await this.prisma.expense.aggregate({
            where: { tenantId, isPaid: true },
            _sum: { amount: true },
        });
        const overdue = await this.prisma.expense.aggregate({
            where: {
                tenantId,
                isPaid: false,
                dueDate: { lt: new Date() },
            },
            _sum: { amount: true },
        });
        const pendingAmount = pending._sum.amount ? parseFloat(pending._sum.amount.toString()) : 0;
        const paidAmount = paid._sum.amount ? parseFloat(paid._sum.amount.toString()) : 0;
        const overdueAmount = overdue._sum.amount ? parseFloat(overdue._sum.amount.toString()) : 0;
        return {
            pending: pendingAmount,
            paid: paidAmount,
            overdue: overdueAmount,
            total: pendingAmount + paidAmount,
        };
    }
    async updateExpense(tenantId, id, updateExpenseDto) {
        return this.prisma.expense.update({
            where: { id },
            data: updateExpenseDto,
        });
    }
    async getCashFlow(tenantId, days = 30) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        const [receivables, expenses] = await Promise.all([
            this.prisma.receivable.findMany({
                where: { tenantId, createdAt: { gte: startDate } },
            }),
            this.prisma.expense.findMany({
                where: { tenantId, createdAt: { gte: startDate } },
            }),
        ]);
        const cashFlow = {};
        const dateRange = Array.from({ length: days }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - days + i);
            return date.toISOString().split('T')[0];
        });
        dateRange.forEach(date => {
            cashFlow[date] = { income: 0, expenses: 0 };
        });
        receivables.forEach(r => {
            const date = r.createdAt.toISOString().split('T')[0];
            if (cashFlow[date]) {
                const amount = typeof r.amount === 'number' ? r.amount : parseFloat(r.amount.toString());
                cashFlow[date].income += amount;
            }
        });
        expenses.forEach(e => {
            const date = e.createdAt.toISOString().split('T')[0];
            if (cashFlow[date]) {
                const amount = typeof e.amount === 'number' ? e.amount : parseFloat(e.amount.toString());
                cashFlow[date].expenses += amount;
            }
        });
        return Object.entries(cashFlow).map(([date, data]) => ({
            date,
            income: data.income,
            expenses: data.expenses,
            balance: data.income - data.expenses,
        }));
    }
    async getDRE(tenantId, startDate, endDate) {
        const [sales, expenses, taxData] = await Promise.all([
            this.prisma.sale.aggregate({
                where: { tenantId, createdAt: { gte: startDate, lte: endDate } },
                _sum: { total: true },
            }),
            this.prisma.expense.aggregate({
                where: { tenantId, createdAt: { gte: startDate, lte: endDate } },
                _sum: { amount: true },
            }),
            this.prisma.sale.aggregate({
                where: { tenantId, createdAt: { gte: startDate, lte: endDate } },
                _sum: { taxTotal: true },
            }),
        ]);
        const revenue = sales._sum.total ? parseFloat(sales._sum.total.toString()) : 0;
        const totalExpenses = expenses._sum.amount ? parseFloat(expenses._sum.amount.toString()) : 0;
        const totalTax = taxData._sum.taxTotal ? parseFloat(taxData._sum.taxTotal.toString()) : 0;
        const grossProfit = revenue - totalExpenses;
        const netProfit = grossProfit - totalTax;
        return {
            revenue,
            totalExpenses,
            grossProfit,
            totalTax,
            netProfit,
            margin: revenue > 0 ? (netProfit / revenue) * 100 : 0,
        };
    }
};
exports.FinancialService = FinancialService;
exports.FinancialService = FinancialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FinancialService);
//# sourceMappingURL=financial.service.js.map