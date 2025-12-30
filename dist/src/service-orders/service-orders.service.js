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
exports.ServiceOrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const client_1 = require("@prisma/client");
let ServiceOrdersService = class ServiceOrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(tenantId, createServiceOrderDto, userId) {
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
                status: client_1.ServiceOrderStatus.OPEN,
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
    async findAll(tenantId, skip = 0, take = 20) {
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
    async findOne(tenantId, id) {
        return this.prisma.serviceOrder.findUnique({
            where: { id },
            include: {
                customer: true,
                parts: true,
                timeline: true,
            },
        });
    }
    async update(tenantId, id, updateServiceOrderDto) {
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
    async getByStatus(tenantId, status) {
        return this.prisma.serviceOrder.findMany({
            where: { tenantId, status },
            include: { customer: true, parts: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getStats(tenantId) {
        const [received, inProgress, completed, cancelled] = await Promise.all([
            this.prisma.serviceOrder.count({
                where: { tenantId, status: client_1.ServiceOrderStatus.OPEN },
            }),
            this.prisma.serviceOrder.count({
                where: { tenantId, status: client_1.ServiceOrderStatus.IN_REPAIR },
            }),
            this.prisma.serviceOrder.count({
                where: { tenantId, status: client_1.ServiceOrderStatus.COMPLETED },
            }),
            this.prisma.serviceOrder.count({
                where: { tenantId, status: client_1.ServiceOrderStatus.CANCELED },
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
};
exports.ServiceOrdersService = ServiceOrdersService;
exports.ServiceOrdersService = ServiceOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServiceOrdersService);
//# sourceMappingURL=service-orders.service.js.map