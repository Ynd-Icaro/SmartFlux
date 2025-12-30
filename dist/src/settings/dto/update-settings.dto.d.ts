import { Role } from '@prisma/client';
export declare class UpdateTenantDto {
    name?: string;
    document?: string;
    address?: string;
    phone?: string;
    logo?: string;
    settings?: string;
}
export declare class UpdateUserDto {
    name?: string;
    email?: string;
    role?: Role;
    phone?: string;
}
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: Role;
    phone?: string;
}
