import { IsString, IsNumber, IsOptional, IsArray, ValidateNested, IsBoolean, IsEnum } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ProductCategory, ProductOrigin, ImportType } from '@prisma/client';

export class CreateProductVariantDto {
  @IsString()
  color: string;

  @IsString()
  storage: string;

  @Transform(({ value }) => typeof value === 'string' ? parseFloat(value.replace(/[R$\s,]/g, '').replace(',', '.')) || 0 : Number(value) || 0)
  @IsNumber()
  price: number;

  @Transform(({ value }) => typeof value === 'string' ? parseFloat(value.replace(/[R$\s,]/g, '').replace(',', '.')) || 0 : Number(value) || 0)
  @IsNumber()
  cost: number;

  @Transform(({ value }) => typeof value === 'string' ? parseInt(value) || 0 : Number(value) || 0)
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  sku?: string;
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsEnum(ProductCategory)
  category?: ProductCategory;

  @Transform(({ value }) => typeof value === 'string' ? parseFloat(value.replace(/[R$\s,]/g, '').replace(',', '.')) || 0 : Number(value) || 0)
  @IsNumber()
  basePrice: number;

  @Transform(({ value }) => typeof value === 'string' ? parseFloat(value.replace(/[R$\s,]/g, '').replace(',', '.')) || 0 : Number(value) || 0)
  @IsNumber()
  baseCost: number;

  @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? parseFloat(value.replace(/[R$\s,]/g, '').replace(',', '.')) || 0 : Number(value) || 0)
  @IsNumber()
  taxRate?: number;

  @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? parseInt(value) || 0 : Number(value) || 0)
  @IsNumber()
  stock?: number;

  @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? parseInt(value) || 5 : Number(value) || 5)
  @IsNumber()
  minStock?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  ncm?: string;

  @IsOptional()
  @IsString()
  cest?: string;

  @IsOptional()
  @IsString()
  taxProfile?: string;

  @IsOptional()
  @IsEnum(ProductOrigin)
  origin?: ProductOrigin;

  @IsOptional()
  @IsEnum(ImportType)
  importType?: ImportType;

  @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? parseFloat(value.replace(/[R$\s,]/g, '').replace(',', '.')) || 0 : Number(value) || 0)
  @IsNumber()
  importTax?: number;

  @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? parseFloat(value.replace(/[R$\s,]/g, '').replace(',', '.')) || 0 : Number(value) || 0)
  @IsNumber()
  freightCost?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  hasVariants?: boolean;

  @IsOptional()
  @IsBoolean()
  hasImei?: boolean;

  @IsOptional()
  @IsBoolean()
  isMainProduct?: boolean;

  @IsOptional()
  @IsBoolean()
  isLinkableProduct?: boolean;

  @IsOptional()
  @IsString()
  importName?: string;

  @IsOptional()
  @IsString()
  mainProductId?: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  variants?: CreateProductVariantDto[];
}
