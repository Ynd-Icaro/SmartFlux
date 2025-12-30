import { IsString, IsNumber, IsOptional, IsArray, ValidateNested, IsEnum, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod, SaleStatus } from '@prisma/client';

export class SaleItemDto {
  @IsString()
  productVariantId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  discount?: number;

  @IsNumber()
  taxRate?: number;
}

export class CreateSaleDto {
  @IsString()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleItemDto)
  items: SaleItemDto[];

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  receivableId?: string;

  @IsOptional()
  @IsString()
  invoiceNumber?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{44}$/, { message: 'Chave de acesso deve ter exatamente 44 dígitos numéricos' })
  invoiceKey?: string;
}

export class UpdateSaleDto {
  @IsOptional()
  @IsEnum(SaleStatus)
  status?: SaleStatus;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  invoiceNumber?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{44}$/, { message: 'Chave de acesso deve ter exatamente 44 dígitos numéricos' })
  invoiceKey?: string;
}
