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
exports.PurchasesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const purchases_service_1 = require("./purchases.service");
const create_purchase_dto_1 = require("./dto/create-purchase.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const client_1 = require("@prisma/client");
let PurchasesController = class PurchasesController {
    constructor(purchasesService) {
        this.purchasesService = purchasesService;
    }
    async createSupplier(user, createSupplierDto) {
        return this.purchasesService.createSupplier(user.tenantId, createSupplierDto);
    }
    async getSuppliers(user, skip, take) {
        return this.purchasesService.getSuppliers(user.tenantId, parseInt(skip || '0'), parseInt(take || '20'));
    }
    async searchSuppliers(user, query) {
        return this.purchasesService.searchSuppliers(user.tenantId, query);
    }
    async getSupplier(user, id) {
        return this.purchasesService.getSupplier(user.tenantId, id);
    }
    async updateSupplier(user, id, updateSupplierDto) {
        return this.purchasesService.updateSupplier(user.tenantId, id, updateSupplierDto);
    }
    async deleteSupplier(user, id) {
        return this.purchasesService.deleteSupplier(user.tenantId, id);
    }
    async createPurchase(user, createPurchaseDto) {
        return this.purchasesService.createPurchase(user.tenantId, createPurchaseDto, user.id);
    }
    async getPurchases(user, skip, take) {
        return this.purchasesService.getPurchases(user.tenantId, parseInt(skip || '0'), parseInt(take || '20'));
    }
    async getPurchaseStats(user) {
        return this.purchasesService.getPurchaseStats(user.tenantId);
    }
    async getTaxReport(user, startDate, endDate) {
        const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), 0, 1);
        const end = endDate ? new Date(endDate) : new Date();
        return this.purchasesService.getTaxReport(user.tenantId, start, end);
    }
    async getPurchase(user, id) {
        return this.purchasesService.getPurchase(user.tenantId, id);
    }
    async updatePurchase(user, id, updatePurchaseDto) {
        return this.purchasesService.updatePurchase(user.tenantId, id, updatePurchaseDto);
    }
};
exports.PurchasesController = PurchasesController;
__decorate([
    (0, common_1.Post)('suppliers'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_purchase_dto_1.CreateSupplierDto]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "createSupplier", null);
__decorate([
    (0, common_1.Get)('suppliers'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "getSuppliers", null);
__decorate([
    (0, common_1.Get)('suppliers/search/:query'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "searchSuppliers", null);
__decorate([
    (0, common_1.Get)('suppliers/:id'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "getSupplier", null);
__decorate([
    (0, common_1.Patch)('suppliers/:id'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_purchase_dto_1.UpdateSupplierDto]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "updateSupplier", null);
__decorate([
    (0, common_1.Delete)('suppliers/:id'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "deleteSupplier", null);
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_purchase_dto_1.CreatePurchaseDto]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "createPurchase", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "getPurchases", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "getPurchaseStats", null);
__decorate([
    (0, common_1.Get)('taxes'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "getTaxReport", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "getPurchase", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_purchase_dto_1.UpdatePurchaseDto]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "updatePurchase", null);
exports.PurchasesController = PurchasesController = __decorate([
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER),
    (0, common_1.Controller)('purchases'),
    __metadata("design:paramtypes", [purchases_service_1.PurchasesService])
], PurchasesController);
//# sourceMappingURL=purchases.controller.js.map