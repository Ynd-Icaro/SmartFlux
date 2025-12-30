import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
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
    register(body: {
        email: string;
        password: string;
        name: string;
    }): Promise<{
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
    getProfile(user: any): any;
}
