"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const supabase_js_1 = require("@supabase/supabase-js");
let SupabaseService = class SupabaseService {
    constructor(configService) {
        this.configService = configService;
        const supabaseUrl = this.configService.get('SUPABASE_URL');
        const supabaseKey = this.configService.get('SUPABASE_SERVICE_ROLE_KEY');
        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase URL or key not configured');
        }
        this.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
    }
    getClient() {
        return this.supabase;
    }
    async uploadFile(bucket, path, file, options) {
        try {
            const { data, error } = await this.supabase.storage
                .from(bucket)
                .upload(path, file, options);
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            throw new Error(`Upload failed: ${error.message}`);
        }
    }
    async downloadFile(bucket, path) {
        try {
            const { data, error } = await this.supabase.storage
                .from(bucket)
                .download(path);
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            throw new Error(`Download failed: ${error.message}`);
        }
    }
    async deleteFile(bucket, path) {
        try {
            const { data, error } = await this.supabase.storage
                .from(bucket)
                .remove([path]);
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            throw new Error(`Delete failed: ${error.message}`);
        }
    }
    getPublicUrl(bucket, path) {
        const { data } = this.supabase.storage.from(bucket).getPublicUrl(path);
        return data.publicUrl;
    }
    async verifyToken(token) {
        try {
            const { data, error } = await this.supabase.auth.getUser(token);
            if (error)
                throw error;
            return data.user;
        }
        catch (error) {
            throw new Error(`Token verification failed: ${error.message}`);
        }
    }
    async createUser(email, password) {
        try {
            const { data, error } = await this.supabase.auth.admin.createUser({
                email,
                password,
                email_confirm: true,
            });
            if (error)
                throw error;
            return data.user;
        }
        catch (error) {
            throw new Error(`User creation failed: ${error.message}`);
        }
    }
    async deleteUser(userId) {
        try {
            const { error } = await this.supabase.auth.admin.deleteUser(userId);
            if (error)
                throw error;
            return { success: true };
        }
        catch (error) {
            throw new Error(`User deletion failed: ${error.message}`);
        }
    }
    async resetPassword(email) {
        try {
            const { error } = await this.supabase.auth.resetPasswordForEmail(email);
            if (error)
                throw error;
            return { message: 'Password reset email sent' };
        }
        catch (error) {
            throw new Error(`Reset failed: ${error.message}`);
        }
    }
    async executeQuery(query, params) {
        try {
            const { data, error } = await this.supabase.rpc('execute_sql', {
                sql: query,
                params,
            });
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            throw new Error(`Query execution failed: ${error.message}`);
        }
    }
};
exports.SupabaseService = SupabaseService;
exports.SupabaseService = SupabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SupabaseService);
//# sourceMappingURL=supabase.service.js.map