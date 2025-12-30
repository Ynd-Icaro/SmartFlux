import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  fileName: string;

  @IsString()
  fileType: string;

  @IsString()
  fileUrl: string;

  @IsString()
  documentType: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  customerId?: string;

  @IsOptional()
  @IsString()
  deviceId?: string;

  @IsOptional()
  @IsString()
  saleId?: string;

  @IsOptional()
  @IsString()
  serviceOrderId?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  fileSize: number;

  @IsString()
  uploadedBy: string;
}

export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
