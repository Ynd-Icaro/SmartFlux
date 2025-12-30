import { IsString, IsNumber, IsOptional, IsEnum, IsDate } from 'class-validator';

enum ReceivableStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELED = 'CANCELED',
}

enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export class CreateReceivableDto {
  @IsString()
  saleId: string;

  @IsNumber()
  amount: number;

  @IsDate()
  dueDate: Date;

  @IsOptional()
  @IsNumber()
  interestRate?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateExpenseDto {
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsString()
  category: string;

  @IsDate()
  dueDate: Date;

  @IsOptional()
  @IsString()
  supplier?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateReceivableDto {
  @IsOptional()
  @IsEnum(ReceivableStatus)
  status?: ReceivableStatus;

  @IsOptional()
  @IsNumber()
  paidAmount?: number;

  @IsOptional()
  @IsDate()
  paidDate?: Date;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateExpenseDto {
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @IsOptional()
  @IsNumber()
  paidAmount?: number;

  @IsOptional()
  @IsDate()
  paidDate?: Date;

  @IsOptional()
  @IsString()
  notes?: string;
}
