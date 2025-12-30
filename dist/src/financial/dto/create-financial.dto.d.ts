declare enum ReceivableStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    OVERDUE = "OVERDUE",
    CANCELED = "CANCELED"
}
declare enum PaymentStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}
export declare class CreateReceivableDto {
    saleId: string;
    amount: number;
    dueDate: Date;
    interestRate?: number;
    notes?: string;
}
export declare class CreateExpenseDto {
    description: string;
    amount: number;
    category: string;
    dueDate: Date;
    supplier?: string;
    notes?: string;
}
export declare class UpdateReceivableDto {
    status?: ReceivableStatus;
    paidAmount?: number;
    paidDate?: Date;
    notes?: string;
}
export declare class UpdateExpenseDto {
    status?: PaymentStatus;
    paidAmount?: number;
    paidDate?: Date;
    notes?: string;
}
export {};
