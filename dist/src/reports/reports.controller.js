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
exports.ReportsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const reports_service_1 = require("./reports.service");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const client_1 = require("@prisma/client");
let ReportsController = class ReportsController {
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    async getSalesReport(user, startDate, endDate) {
        const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), 0, 1);
        const end = endDate ? new Date(endDate) : new Date();
        return this.reportsService.getSalesReport(user.tenantId, start, end);
    }
    async getInventoryReport(user) {
        return this.reportsService.getInventoryReport(user.tenantId);
    }
    async getProductPerformance(user) {
        return this.reportsService.getProductPerformance(user.tenantId);
    }
    async getCustomerAnalysis(user) {
        return this.reportsService.getCustomerAnalysis(user.tenantId);
    }
    async getServiceOrderStats(user) {
        return this.reportsService.getServiceOrderStats(user.tenantId);
    }
    async getTaxReport(user, startDate, endDate) {
        const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), 0, 1);
        const end = endDate ? new Date(endDate) : new Date();
        return this.reportsService.getTaxReport(user.tenantId, start, end);
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('sales'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getSalesReport", null);
__decorate([
    (0, common_1.Get)('inventory'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getInventoryReport", null);
__decorate([
    (0, common_1.Get)('products'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getProductPerformance", null);
__decorate([
    (0, common_1.Get)('customers'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getCustomerAnalysis", null);
__decorate([
    (0, common_1.Get)('service-orders'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getServiceOrderStats", null);
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
], ReportsController.prototype, "getTaxReport", null);
exports.ReportsController = ReportsController = __decorate([
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER),
    (0, common_1.Controller)('reports'),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map