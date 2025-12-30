"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const database_module_1 = require("./database/database.module");
const auth_module_1 = require("./auth/auth.module");
const supabase_module_1 = require("./supabase/supabase.module");
const users_module_1 = require("./users/users.module");
const products_module_1 = require("./products/products.module");
const inventory_module_1 = require("./inventory/inventory.module");
const purchases_module_1 = require("./purchases/purchases.module");
const sales_module_1 = require("./sales/sales.module");
const service_orders_module_1 = require("./service-orders/service-orders.module");
const customers_module_1 = require("./customers/customers.module");
const financial_module_1 = require("./financial/financial.module");
const reports_module_1 = require("./reports/reports.module");
const tenants_module_1 = require("./tenants/tenants.module");
const documents_module_1 = require("./documents/documents.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            passport_1.PassportModule,
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            supabase_module_1.SupabaseModule,
            users_module_1.UsersModule,
            tenants_module_1.TenantsModule,
            products_module_1.ProductsModule,
            inventory_module_1.InventoryModule,
            purchases_module_1.PurchasesModule,
            sales_module_1.SalesModule,
            service_orders_module_1.ServiceOrdersModule,
            customers_module_1.CustomersModule,
            financial_module_1.FinancialModule,
            reports_module_1.ReportsModule,
            documents_module_1.DocumentsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map