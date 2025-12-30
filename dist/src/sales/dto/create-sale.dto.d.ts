import { PaymentMethod, SaleStatus } from '@prisma/client';
export declare class SaleItemDto {
    productVariantId: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
    taxRate?: number;
}
export declare class CreateSaleDto {
    customerId: string;
    items: SaleItemDto[];
    paymentMethod: PaymentMethod;
    discount?: number;
    notes?: string;
    receivableId?: string;
    invoiceNumber?: string;
    invoiceKey?: string;
}
export declare class UpdateSaleDto {
    status?: SaleStatus;
    notes?: string;
    invoiceNumber?: string;
    invoiceKey?: string;
}
