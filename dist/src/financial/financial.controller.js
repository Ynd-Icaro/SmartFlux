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
exports.FinancialController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const financial_service_1 = require("./financial.service");
const create_financial_dto_1 = require("./dto/create-financial.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const client_1 = require("@prisma/client");
let FinancialController = class FinancialController {
    constructor(financialService) {
        this.financialService = financialService;
    }
    async createReceivable(user, createReceivableDto) {
        return this.financialService.createReceivable(user.tenantId, createReceivableDto);
    }
    async getReceivables(user, skip, take) {
        return this.financialService.getReceivables(user.tenantId, parseInt(skip || '0'), parseInt(take || '20'));
    }
    async getReceivableStats(user) {
        return this.financialService.getReceivableStats(user.tenantId);
    }
    async updateReceivable(user, id, updateReceivableDto) {
        return this.financialService.updateReceivable(user.tenantId, id, updateReceivableDto);
    }
    async createExpense(user, createExpenseDto) {
        return this.financialService.createExpense(user.tenantId, createExpenseDto);
    }
    async getExpenses(user, skip, take) {
        return this.financialService.getExpenses(user.tenantId, parseInt(skip || '0'), parseInt(take || '20'));
    }
    async getExpenseStats(user) {
        return this.financialService.getExpenseStats(user.tenantId);
    }
    async updateExpense(user, id, updateExpenseDto) {
        return this.financialService.updateExpense(user.tenantId, id, updateExpenseDto);
    }
    async getCashFlow(user, days) {
        return this.financialService.getCashFlow(user.tenantId, parseInt(days || '30'));
    }
    async getDRE(user, startDate, endDate) {
        const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), 0, 1);
        const end = endDate ? new Date(endDate) : new Date();
        return this.financialService.getDRE(user.tenantId, start, end);
    }
};
exports.FinancialController = FinancialController;
__decorate([
    (0, common_1.Post)('receivables'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.ACCOUNTANT),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_financial_dto_1.CreateReceivableDto]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "createReceivable", null);
__decorate([
    (0, common_1.Get)('receivables'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.ACCOUNTANT),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "getReceivables", null);
__decorate([
    (0, common_1.Get)('receivables/stats'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "getReceivableStats", null);
__decorate([
    (0, common_1.Patch)('receivables/:id'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.ACCOUNTANT),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_financial_dto_1.UpdateReceivableDto]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "updateReceivable", null);
__decorate([
    (0, common_1.Post)('expenses'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.ACCOUNTANT),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_financial_dto_1.CreateExpenseDto]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "createExpense", null);
__decorate([
    (0, common_1.Get)('expenses'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.ACCOUNTANT),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "getExpenses", null);
__decorate([
    (0, common_1.Get)('expenses/stats'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "getExpenseStats", null);
__decorate([
    (0, common_1.Patch)('expenses/:id'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.ACCOUNTANT),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_financial_dto_1.UpdateExpenseDto]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "updateExpense", null);
__decorate([
    (0, common_1.Get)('cash-flow'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.ACCOUNTANT),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "getCashFlow", null);
__decorate([
    (0, common_1.Get)('dre'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], FinancialController.prototype, "getDRE", null);
exports.FinancialController = FinancialController = __decorate([
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.ACCOUNTANT),
    (0, common_1.Controller)('financial'),
    __metadata("design:paramtypes", [financial_service_1.FinancialService])
], FinancialController);
//# sourceMappingURL=financial.controller.js.map