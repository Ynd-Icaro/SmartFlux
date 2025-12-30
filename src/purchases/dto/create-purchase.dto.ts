import { IsString, IsNumber, IsOptional, IsArray, ValidateNested, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { PurchaseStatus } from '@prisma/client';

export class PurchaseItemDto {
  @IsString()
  productVariantId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unitCost: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsNumber()
  tax?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreatePurchaseDto {
  @IsString()
  supplierId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemDto)
  items: PurchaseItemDto[];

  @IsDate()
  @Type(() => Date)
  deliveryDate: Date;

  @IsOptional()
  @IsNumber()
  freight?: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  invoiceNumber?: string;
}

export class UpdatePurchaseDto {
  @IsOptional()
  @IsEnum(PurchaseStatus)
  status?: PurchaseStatus;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  receivedDate?: Date;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumber()
  totalPaid?: number;
}

export class CreateSupplierDto {
  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsNumber()
  defaultTax?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateSupplierDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsNumber()
  defaultTax?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
