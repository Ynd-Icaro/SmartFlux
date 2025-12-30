declare enum CustomerType {
    INDIVIDUAL = "INDIVIDUAL",
    CORPORATE = "CORPORATE",
    PARTNER = "PARTNER"
}
export declare class CreateCustomerDto {
    name: string;
    email: string;
    phone: string;
    document?: string;
    type: CustomerType;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    notes?: string;
    tags?: string;
}
export declare class UpdateCustomerDto {
    name?: string;
    email?: string;
    phone?: string;
    notes?: string;
    tags?: string;
}
export {};
