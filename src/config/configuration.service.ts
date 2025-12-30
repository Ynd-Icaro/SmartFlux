import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  get databaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  get jwtExpiration(): number {
    return this.configService.get<number>('JWT_EXPIRATION', 3600);
  }

  get supabaseUrl(): string {
    return this.configService.get<string>('SUPABASE_URL');
  }

  get supabaseKey(): string {
    return this.configService.get<string>('SUPABASE_KEY');
  }

  get redisHost(): string {
    return this.configService.get<string>('REDIS_HOST', 'localhost');
  }

  get redisPort(): number {
    return this.configService.get<number>('REDIS_PORT', 6379);
  }

  get apiPort(): number {
    return this.configService.get<number>('API_PORT', 3001);
  }

  get apiUrl(): string {
    return this.configService.get<string>('API_URL', 'http://localhost:3001');
  }

  get frontendUrl(): string {
    return this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000');
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV', 'development');
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }
}
