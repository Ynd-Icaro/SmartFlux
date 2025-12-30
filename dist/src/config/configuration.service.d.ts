import { ConfigService } from '@nestjs/config';
export declare class ConfigurationService {
    private configService;
    constructor(configService: ConfigService);
    get databaseUrl(): string;
    get jwtSecret(): string;
    get jwtExpiration(): number;
    get supabaseUrl(): string;
    get supabaseKey(): string;
    get redisHost(): string;
    get redisPort(): number;
    get apiPort(): number;
    get apiUrl(): string;
    get frontendUrl(): string;
    get nodeEnv(): string;
    get isProduction(): boolean;
}
