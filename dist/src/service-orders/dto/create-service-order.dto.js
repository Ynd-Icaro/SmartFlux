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
exports.UpdateServiceOrderDto = exports.CreateServiceOrderDto = exports.ServiceItemDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
class ServiceItemDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { description: { required: true, type: () => String }, laborCost: { required: true, type: () => Number }, notes: { required: false, type: () => String }, usedParts: { required: false, type: () => [String] } };
    }
}
exports.ServiceItemDto = ServiceItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServiceItemDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ServiceItemDto.prototype, "laborCost", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServiceItemDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ServiceItemDto.prototype, "usedParts", void 0);
class CreateServiceOrderDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { customerId: { required: true, type: () => String }, deviceInfo: { required: true, type: () => String }, problem: { required: true, type: () => String }, services: { required: true, type: () => [require("./create-service-order.dto").ServiceItemDto] }, estimatedCost: { required: false, type: () => Number }, notes: { required: false, type: () => String } };
    }
}
exports.CreateServiceOrderDto = CreateServiceOrderDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateServiceOrderDto.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateServiceOrderDto.prototype, "deviceInfo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateServiceOrderDto.prototype, "problem", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ServiceItemDto),
    __metadata("design:type", Array)
], CreateServiceOrderDto.prototype, "services", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateServiceOrderDto.prototype, "estimatedCost", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateServiceOrderDto.prototype, "notes", void 0);
class UpdateServiceOrderDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: false, type: () => Object }, notes: { required: false, type: () => String }, finalCost: { required: false, type: () => Number } };
    }
}
exports.UpdateServiceOrderDto = UpdateServiceOrderDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.ServiceOrderStatus),
    __metadata("design:type", String)
], UpdateServiceOrderDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateServiceOrderDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateServiceOrderDto.prototype, "finalCost", void 0);
//# sourceMappingURL=create-service-order.dto.js.map