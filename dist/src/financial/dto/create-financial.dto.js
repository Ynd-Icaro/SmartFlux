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
exports.UpdateExpenseDto = exports.UpdateReceivableDto = exports.CreateExpenseDto = exports.CreateReceivableDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var ReceivableStatus;
(function (ReceivableStatus) {
    ReceivableStatus["PENDING"] = "PENDING";
    ReceivableStatus["PAID"] = "PAID";
    ReceivableStatus["OVERDUE"] = "OVERDUE";
    ReceivableStatus["CANCELED"] = "CANCELED";
})(ReceivableStatus || (ReceivableStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["COMPLETED"] = "COMPLETED";
    PaymentStatus["FAILED"] = "FAILED";
})(PaymentStatus || (PaymentStatus = {}));
class CreateReceivableDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { saleId: { required: true, type: () => String }, amount: { required: true, type: () => Number }, dueDate: { required: true, type: () => Date }, interestRate: { required: false, type: () => Number }, notes: { required: false, type: () => String } };
    }
}
exports.CreateReceivableDto = CreateReceivableDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReceivableDto.prototype, "saleId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateReceivableDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateReceivableDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateReceivableDto.prototype, "interestRate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReceivableDto.prototype, "notes", void 0);
class CreateExpenseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { description: { required: true, type: () => String }, amount: { required: true, type: () => Number }, category: { required: true, type: () => String }, dueDate: { required: true, type: () => Date }, supplier: { required: false, type: () => String }, notes: { required: false, type: () => String } };
    }
}
exports.CreateExpenseDto = CreateExpenseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateExpenseDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateExpenseDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "supplier", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "notes", void 0);
class UpdateReceivableDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: false, enum: ReceivableStatus }, paidAmount: { required: false, type: () => Number }, paidDate: { required: false, type: () => Date }, notes: { required: false, type: () => String } };
    }
}
exports.UpdateReceivableDto = UpdateReceivableDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ReceivableStatus),
    __metadata("design:type", String)
], UpdateReceivableDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateReceivableDto.prototype, "paidAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], UpdateReceivableDto.prototype, "paidDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReceivableDto.prototype, "notes", void 0);
class UpdateExpenseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: false, enum: PaymentStatus }, paidAmount: { required: false, type: () => Number }, paidDate: { required: false, type: () => Date }, notes: { required: false, type: () => String } };
    }
}
exports.UpdateExpenseDto = UpdateExpenseDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(PaymentStatus),
    __metadata("design:type", String)
], UpdateExpenseDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateExpenseDto.prototype, "paidAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], UpdateExpenseDto.prototype, "paidDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateExpenseDto.prototype, "notes", void 0);
//# sourceMappingURL=create-financial.dto.js.map