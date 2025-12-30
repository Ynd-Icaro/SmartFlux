import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { SupabaseModule } from './supabase/supabase.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { PurchasesModule } from './purchases/purchases.module';
import { SalesModule } from './sales/sales.module';
import { ServiceOrdersModule } from './service-orders/service-orders.module';
import { CustomersModule } from './customers/customers.module';
import { FinancialModule } from './financial/financial.module';
import { ReportsModule } from './reports/reports.module';
import { TenantsModule } from './tenants/tenants.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PassportModule,
    DatabaseModule,
    AuthModule,
    SupabaseModule,
    UsersModule,
    TenantsModule,
    ProductsModule,
    InventoryModule,
    PurchasesModule,
    SalesModule,
    ServiceOrdersModule,
    CustomersModule,
    FinancialModule,
    ReportsModule,
    DocumentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
