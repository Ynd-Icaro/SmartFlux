import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>(
      'SUPABASE_SERVICE_ROLE_KEY'
    );

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL or key not configured');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * Get Supabase client instance
   */
  getClient(): SupabaseClient {
    return this.supabase;
  }

  /**
   * Upload file to Supabase Storage
   */
  async uploadFile(
    bucket: string,
    path: string,
    file: Buffer | File,
    options?: any
  ) {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .upload(path, file, options);

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  /**
   * Download file from Supabase Storage
   */
  async downloadFile(bucket: string, path: string) {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .download(path);

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Download failed: ${error.message}`);
    }
  }

  /**
   * Delete file from Supabase Storage
   */
  async deleteFile(bucket: string, path: string) {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Delete failed: ${error.message}`);
    }
  }

  /**
   * Get public URL for file
   */
  getPublicUrl(bucket: string, path: string): string {
    const { data } = this.supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  /**
   * Verify Supabase JWT token
   */
  async verifyToken(token: string) {
    try {
      const { data, error } = await this.supabase.auth.getUser(token);

      if (error) throw error;
      return data.user;
    } catch (error) {
      throw new Error(`Token verification failed: ${error.message}`);
    }
  }

  /**
   * Create Supabase user
   */
  async createUser(email: string, password: string) {
    try {
      const { data, error } = await this.supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

      if (error) throw error;
      return data.user;
    } catch (error) {
      throw new Error(`User creation failed: ${error.message}`);
    }
  }

  /**
   * Delete Supabase user
   */
  async deleteUser(userId: string) {
    try {
      const { error } = await this.supabase.auth.admin.deleteUser(userId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      throw new Error(`User deletion failed: ${error.message}`);
    }
  }

  /**
   * Reset password
   */
  async resetPassword(email: string) {
    try {
      const { error } = await this.supabase.auth.resetPasswordForEmail(email);

      if (error) throw error;
      return { message: 'Password reset email sent' };
    } catch (error) {
      throw new Error(`Reset failed: ${error.message}`);
    }
  }

  /**
   * Execute SQL query (use with caution)
   */
  async executeQuery(query: string, params?: any[]) {
    try {
      const { data, error } = await this.supabase.rpc('execute_sql', {
        sql: query,
        params,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Query execution failed: ${error.message}`);
    }
  }
}
