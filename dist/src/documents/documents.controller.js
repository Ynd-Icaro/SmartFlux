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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const documents_service_1 = require("./documents.service");
const create_document_dto_1 = require("./dto/create-document.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_tenant_decorator_1 = require("../auth/decorators/current-tenant.decorator");
let DocumentsController = class DocumentsController {
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    create(tenantId, createDocumentDto) {
        return this.documentsService.create(tenantId, createDocumentDto);
    }
    findAll(tenantId, documentType, customerId, deviceId, saleId, serviceOrderId, take, skip) {
        const filters = {
            documentType,
            customerId,
            deviceId,
            saleId,
            serviceOrderId,
            take: take ? parseInt(take) : 50,
            skip: skip ? parseInt(skip) : 0,
        };
        return this.documentsService.findAll(tenantId, filters);
    }
    findByCustomerId(tenantId, customerId) {
        return this.documentsService.findByCustomerId(tenantId, customerId);
    }
    findByDeviceId(tenantId, deviceId) {
        return this.documentsService.findByDeviceId(tenantId, deviceId);
    }
    findBySaleId(tenantId, saleId) {
        return this.documentsService.findBySaleId(tenantId, saleId);
    }
    findByServiceOrderId(tenantId, serviceOrderId) {
        return this.documentsService.findByServiceOrderId(tenantId, serviceOrderId);
    }
    findOne(tenantId, id) {
        return this.documentsService.findById(tenantId, id);
    }
    update(tenantId, id, updateDocumentDto) {
        return this.documentsService.update(tenantId, id, updateDocumentDto);
    }
    remove(tenantId, id) {
        return this.documentsService.delete(tenantId, id);
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, current_tenant_decorator_1.CurrentTenant)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_document_dto_1.CreateDocumentDto]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_tenant_decorator_1.CurrentTenant)()),
    __param(1, (0, common_1.Query)('documentType')),
    __param(2, (0, common_1.Query)('customerId')),
    __param(3, (0, common_1.Query)('deviceId')),
    __param(4, (0, common_1.Query)('saleId')),
    __param(5, (0, common_1.Query)('serviceOrderId')),
    __param(6, (0, common_1.Query)('take')),
    __param(7, (0, common_1.Query)('skip')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('customer/:customerId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_tenant_decorator_1.CurrentTenant)()),
    __param(1, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "findByCustomerId", null);
__decorate([
    (0, common_1.Get)('device/:deviceId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_tenant_decorator_1.CurrentTenant)()),
    __param(1, (0, common_1.Param)('deviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "findByDeviceId", null);
__decorate([
    (0, common_1.Get)('sale/:saleId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_tenant_decorator_1.CurrentTenant)()),
    __param(1, (0, common_1.Param)('saleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "findBySaleId", null);
__decorate([
    (0, common_1.Get)('service-order/:serviceOrderId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_tenant_decorator_1.CurrentTenant)()),
    __param(1, (0, common_1.Param)('serviceOrderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "findByServiceOrderId", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_tenant_decorator_1.CurrentTenant)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_tenant_decorator_1.CurrentTenant)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_document_dto_1.UpdateDocumentDto]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_tenant_decorator_1.CurrentTenant)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "remove", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('documents'),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService])
], DocumentsController);
//# sourceMappingURL=documents.controller.js.map