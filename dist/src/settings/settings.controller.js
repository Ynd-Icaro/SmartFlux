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
exports.SettingsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const settings_service_1 = require("./settings.service");
const update_settings_dto_1 = require("./dto/update-settings.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const client_1 = require("@prisma/client");
let SettingsController = class SettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async getTenant(user) {
        return this.settingsService.getTenant(user.tenantId);
    }
    async updateTenant(user, updateTenantDto) {
        return this.settingsService.updateTenant(user.tenantId, updateTenantDto);
    }
    async getUsers(user) {
        return this.settingsService.getUsers(user.tenantId);
    }
    async getUser(user, userId) {
        return this.settingsService.getUser(user.tenantId, userId);
    }
    async createUser(user, createUserDto) {
        return this.settingsService.createUser(user.tenantId, createUserDto);
    }
    async updateUser(user, userId, updateUserDto) {
        return this.settingsService.updateUser(user.tenantId, userId, updateUserDto);
    }
    async deleteUser(user, userId) {
        return this.settingsService.deleteUser(user.tenantId, userId);
    }
    async getAuditLogs(user) {
        return this.settingsService.getAuditLogs(user.tenantId);
    }
    async exportData(user) {
        return this.settingsService.exportData(user.tenantId);
    }
};
exports.SettingsController = SettingsController;
__decorate([
    (0, common_1.Get)('tenant'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getTenant", null);
__decorate([
    (0, common_1.Patch)('tenant'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_settings_dto_1.UpdateTenantDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "updateTenant", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('users/:userId'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)('users'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_settings_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "createUser", null);
__decorate([
    (0, common_1.Patch)('users/:userId'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_settings_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('users/:userId'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('audit-logs'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getAuditLogs", null);
__decorate([
    (0, common_1.Get)('export'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "exportData", null);
exports.SettingsController = SettingsController = __decorate([
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN),
    (0, common_1.Controller)('settings'),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsController);
//# sourceMappingURL=settings.controller.js.map