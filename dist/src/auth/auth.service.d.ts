import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: string;
        name: string;
        status: import(".prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        avatar: string | null;
        role: import(".prisma/client").$Enums.Role;
        passwordHash: string | null;
        twoFactorEnabled: boolean;
        twoFactorSecret: string | null;
        tenantId: string;
        lastLoginAt: Date | null;
    }>;
    login(user: any): Promise<{
        token: string;
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
            avatar: any;
        };
    }>;
    register(email: string, password: string, name: string, tenantId?: string): Promise<{
        token: string;
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
            avatar: any;
        };
    }>;
    verifyToken(token: string): any;
}
