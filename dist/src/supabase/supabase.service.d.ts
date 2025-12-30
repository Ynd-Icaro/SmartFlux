import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
export declare class SupabaseService {
    private configService;
    private supabase;
    constructor(configService: ConfigService);
    getClient(): SupabaseClient;
    uploadFile(bucket: string, path: string, file: Buffer | File, options?: any): Promise<{
        id: string;
        path: string;
        fullPath: string;
    }>;
    downloadFile(bucket: string, path: string): Promise<Blob>;
    deleteFile(bucket: string, path: string): Promise<import("@supabase/storage-js").FileObject[]>;
    getPublicUrl(bucket: string, path: string): string;
    verifyToken(token: string): Promise<import("@supabase/supabase-js").AuthUser>;
    createUser(email: string, password: string): Promise<import("@supabase/supabase-js").AuthUser>;
    deleteUser(userId: string): Promise<{
        success: boolean;
    }>;
    resetPassword(email: string): Promise<{
        message: string;
    }>;
    executeQuery(query: string, params?: any[]): Promise<any>;
}
