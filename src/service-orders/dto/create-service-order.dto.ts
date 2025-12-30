import { IsString, IsNumber, IsOptional, IsArray, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ServiceOrderStatus } from '@prisma/client';

export class ServiceItemDto {
  @IsString()
  description: string;

  @IsNumber()
  laborCost: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsArray()
  usedParts?: string[];
}

export class CreateServiceOrderDto {
  @IsString()
  customerId: string;

  @IsString()
  deviceInfo: string;

  @IsString()
  problem: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceItemDto)
  services: ServiceItemDto[];

  @IsOptional()
  @IsNumber()
  estimatedCost?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateServiceOrderDto {
  @IsOptional()
  @IsEnum(ServiceOrderStatus)
  status?: ServiceOrderStatus;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumber()
  finalCost?: number;
}
