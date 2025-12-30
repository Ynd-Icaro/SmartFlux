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
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const client_1 = require("@prisma/client");
let DocumentsService = class DocumentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(tenantId, createDocumentDto) {
        try {
            const { customerId, deviceId, saleId, serviceOrderId, documentType, ...data } = createDocumentDto;
            const document = await this.prisma.documentFile.create({
                data: {
                    ...data,
                    documentType: documentType,
                    tenant: {
                        connect: { id: tenantId },
                    },
                    ...(customerId && {
                        customer: { connect: { id: customerId } },
                    }),
                    ...(deviceId && {
                        device: { connect: { id: deviceId } },
                    }),
                    ...(saleId && {
                        sale: { connect: { id: saleId } },
                    }),
                    ...(serviceOrderId && {
                        serviceOrder: { connect: { id: serviceOrderId } },
                    }),
                },
            });
            return document;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                throw new common_1.BadRequestException('Erro ao criar documento');
            }
            throw error;
        }
    }
    async findAll(tenantId, filters) {
        const where = { tenantId };
        if (filters?.documentType) {
            where.documentType = filters.documentType;
        }
        if (filters?.customerId) {
            where.customerId = filters.customerId;
        }
        if (filters?.deviceId) {
            where.deviceId = filters.deviceId;
        }
        if (filters?.saleId) {
            where.saleId = filters.saleId;
        }
        if (filters?.serviceOrderId) {
            where.serviceOrderId = filters.serviceOrderId;
        }
        return this.prisma.documentFile.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: filters?.take || 50,
            skip: filters?.skip || 0,
        });
    }
    async findById(tenantId, id) {
        const document = await this.prisma.documentFile.findFirst({
            where: { id, tenantId },
        });
        if (!document) {
            throw new common_1.NotFoundException('Documento não encontrado');
        }
        return document;
    }
    async findByCustomerId(tenantId, customerId) {
        return this.prisma.documentFile.findMany({
            where: { tenantId, customerId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByDeviceId(tenantId, deviceId) {
        return this.prisma.documentFile.findMany({
            where: { tenantId, deviceId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findBySaleId(tenantId, saleId) {
        return this.prisma.documentFile.findMany({
            where: { tenantId, saleId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByServiceOrderId(tenantId, serviceOrderId) {
        return this.prisma.documentFile.findMany({
            where: { tenantId, serviceOrderId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async update(tenantId, id, updateDocumentDto) {
        const document = await this.findById(tenantId, id);
        return this.prisma.documentFile.update({
            where: { id },
            data: updateDocumentDto,
        });
    }
    async delete(tenantId, id) {
        const document = await this.findById(tenantId, id);
        await this.prisma.documentFile.delete({
            where: { id },
        });
        return { message: 'Documento deletado com sucesso' };
    }
    async count(tenantId, filters) {
        const where = { tenantId };
        if (filters?.documentType) {
            where.documentType = filters.documentType;
        }
        return this.prisma.documentFile.count({ where });
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map