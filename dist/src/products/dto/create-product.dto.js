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
exports.CreateProductDto = exports.CreateProductVariantDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
class CreateProductVariantDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { color: { required: true, type: () => String }, storage: { required: true, type: () => String }, price: { required: true, type: () => Number }, cost: { required: true, type: () => Number }, quantity: { required: true, type: () => Number }, sku: { required: false, type: () => String } };
    }
}
exports.CreateProductVariantDto = CreateProductVariantDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductVariantDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductVariantDto.prototype, "storage", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? parseFloat(value.replace(/[R$\s,]/g, '').replace(',', '.')) || 0 : Number(value) || 0),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductVariantDto.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? parseFloat(value.replace(/[R$\s,]/g, '').replace(',', '.')) || 0 : Number(value) || 0),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductVariantDto.prototype, "cost", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? parseInt(value) || 0 : Number(value) || 0),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductVariantDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductVariantDto.prototype, "sku", void 0);
class CreateProductDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, brand: { required: false, type: () => String }, category: { required: false, type: () => Object }, basePrice: { required: true, type: () => Number }, baseCost: { required: true, type: () => Number }, taxRate: { required: false, type: () => Number }, stock: { required: false, type: () => Number }, minStock: { required: false, type: () => Number }, location: { required: false, type: () => String }, ncm: { required: false, type: () => String }, cest: { required: false, type: () => String }, taxProfile: { required: false, type: () => String }, origin: { required: false, type: () => Object }, importType: { required: false, type: () => Object }, importTax: { required: false, type: () => Number }, freightCost: { required: false, type: () => Number }, images: { required: false, type: () => [String] }, isActive: { required: false, type: () => Boolean }, hasVariants: { required: false, type: () => Boolean }, hasImei: { required: false, type: () => Boolean }, isMainProduct: { required: false, type: () => Boolean }, isLinkableProduct: { required: false, type: () => Boolean }, importName: { required: false, type: () => String }, mainProductId: { required: false, type: () => String }, sku: { required: false, type: () => String }, model: { required: false, type: () => String }, variants: { required: false, type: async () => [require("./create-product.dto").CreateProductVariantDto] } };
    }
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "brand", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.ProductCategory),
    __metadata("design:type", String)
], CreateProductDto.prototype, "category", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? parseFloat(value.replace(/[R$\s,]/g, '').replace(',', '.')) || 0 : Number(value) || 0),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "basePrice", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? parseFloat(value.replace(/[R$\s,]/g, '').replace(',', '.')) || 0 : Number(value) || 0),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "baseCost", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? parseFloat(value.replace(/[R$\s,]/g, '').replace(',', '.')) || 0 : Number(value) || 0),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "taxRate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? parseInt(value) || 0 : Number(value) || 0),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? parseInt(value) || 5 : Number(value) || 5),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "minStock", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "ncm", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "cest", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "taxProfile", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.ProductOrigin),
    __metadata("design:type", String)
], CreateProductDto.prototype, "origin", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.ImportType),
    __metadata("design:type", String)
], CreateProductDto.prototype, "importType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? parseFloat(value.replace(/[R$\s,]/g, '').replace(',', '.')) || 0 : Number(value) || 0),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "importTax", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? parseFloat(value.replace(/[R$\s,]/g, '').replace(',', '.')) || 0 : Number(value) || 0),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "freightCost", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "images", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "hasVariants", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "hasImei", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "isMainProduct", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "isLinkableProduct", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "importName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "mainProductId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "sku", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateProductVariantDto),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "variants", void 0);
//# sourceMappingURL=create-product.dto.js.map