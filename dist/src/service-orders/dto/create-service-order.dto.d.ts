import { ServiceOrderStatus } from '@prisma/client';
export declare class ServiceItemDto {
    description: string;
    laborCost: number;
    notes?: string;
    usedParts?: string[];
}
export declare class CreateServiceOrderDto {
    customerId: string;
    deviceInfo: string;
    problem: string;
    services: ServiceItemDto[];
    estimatedCost?: number;
    notes?: string;
}
export declare class UpdateServiceOrderDto {
    status?: ServiceOrderStatus;
    notes?: string;
    finalCost?: number;
}
