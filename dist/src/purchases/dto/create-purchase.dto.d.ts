import { PurchaseStatus } from '@prisma/client';
export declare class PurchaseItemDto {
    productVariantId: string;
    quantity: number;
    unitCost: number;
    discount?: number;
    tax?: number;
    notes?: string;
}
export declare class CreatePurchaseDto {
    supplierId: string;
    items: PurchaseItemDto[];
    deliveryDate: Date;
    freight?: number;
    discount?: number;
    notes?: string;
    invoiceNumber?: string;
}
export declare class UpdatePurchaseDto {
    status?: PurchaseStatus;
    receivedDate?: Date;
    notes?: string;
    totalPaid?: number;
}
export declare class CreateSupplierDto {
    name: string;
    document: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    defaultTax?: number;
    notes?: string;
}
export declare class UpdateSupplierDto {
    name?: string;
    email?: string;
    phone?: string;
    defaultTax?: number;
    notes?: string;
}
