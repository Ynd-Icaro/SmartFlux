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
exports.ServiceOrdersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const service_orders_service_1 = require("./service-orders.service");
const create_service_order_dto_1 = require("./dto/create-service-order.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const client_1 = require("@prisma/client");
let ServiceOrdersController = class ServiceOrdersController {
    constructor(serviceOrdersService) {
        this.serviceOrdersService = serviceOrdersService;
    }
    async create(user, createServiceOrderDto) {
        return this.serviceOrdersService.create(user.tenantId, createServiceOrderDto, user.id);
    }
    async findAll(user, skip, take) {
        return this.serviceOrdersService.findAll(user.tenantId, parseInt(skip || '0'), parseInt(take || '20'));
    }
    async getStats(user) {
        return this.serviceOrdersService.getStats(user.tenantId);
    }
    async getByStatus(user, status) {
        return this.serviceOrdersService.getByStatus(user.tenantId, status);
    }
    async findOne(user, id) {
        return this.serviceOrdersService.findOne(user.tenantId, id);
    }
    async update(user, id, updateServiceOrderDto) {
        return this.serviceOrdersService.update(user.tenantId, id, updateServiceOrderDto);
    }
};
exports.ServiceOrdersController = ServiceOrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER, client_1.Role.TECHNICIAN),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_service_order_dto_1.CreateServiceOrderDto]),
    __metadata("design:returntype", Promise)
], ServiceOrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER, client_1.Role.TECHNICIAN),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ServiceOrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServiceOrdersController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('by-status/:status'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER, client_1.Role.TECHNICIAN),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ServiceOrdersController.prototype, "getByStatus", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER, client_1.Role.TECHNICIAN),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ServiceOrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER, client_1.Role.TECHNICIAN),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_service_order_dto_1.UpdateServiceOrderDto]),
    __metadata("design:returntype", Promise)
], ServiceOrdersController.prototype, "update", null);
exports.ServiceOrdersController = ServiceOrdersController = __decorate([
    (0, auth_decorator_1.Auth)(client_1.Role.OWNER, client_1.Role.ADMIN, client_1.Role.MANAGER, client_1.Role.TECHNICIAN),
    (0, common_1.Controller)('service-orders'),
    __metadata("design:paramtypes", [service_orders_service_1.ServiceOrdersService])
], ServiceOrdersController);
//# sourceMappingURL=service-orders.controller.js.map