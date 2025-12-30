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
exports.ConfigurationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ConfigurationService = class ConfigurationService {
    constructor(configService) {
        this.configService = configService;
    }
    get databaseUrl() {
        return this.configService.get('DATABASE_URL');
    }
    get jwtSecret() {
        return this.configService.get('JWT_SECRET');
    }
    get jwtExpiration() {
        return this.configService.get('JWT_EXPIRATION', 3600);
    }
    get supabaseUrl() {
        return this.configService.get('SUPABASE_URL');
    }
    get supabaseKey() {
        return this.configService.get('SUPABASE_KEY');
    }
    get redisHost() {
        return this.configService.get('REDIS_HOST', 'localhost');
    }
    get redisPort() {
        return this.configService.get('REDIS_PORT', 6379);
    }
    get apiPort() {
        return this.configService.get('API_PORT', 3001);
    }
    get apiUrl() {
        return this.configService.get('API_URL', 'http://localhost:3001');
    }
    get frontendUrl() {
        return this.configService.get('FRONTEND_URL', 'http://localhost:3000');
    }
    get nodeEnv() {
        return this.configService.get('NODE_ENV', 'development');
    }
    get isProduction() {
        return this.nodeEnv === 'production';
    }
};
exports.ConfigurationService = ConfigurationService;
exports.ConfigurationService = ConfigurationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ConfigurationService);
//# sourceMappingURL=configuration.service.js.map