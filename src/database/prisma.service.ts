import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅ Database connected successfully');
    } catch (error) {
      this.logger.warn('⚠️  Database connection failed - Running in MOCK MODE');
      this.logger.warn('Frontend will use mock data from lib/mock-data.ts');
      // Não lançar erro - permitir que o backend inicie sem DB
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } catch (error) {
      // Silenciar erros de desconexão
    }
  }
}
