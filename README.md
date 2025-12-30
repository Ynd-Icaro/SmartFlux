# SmartFlux ERP Backend

Enterprise-grade REST API built with NestJS, Prisma, PostgreSQL, and TypeScript.

## 🎯 Features

- **Authentication**: JWT-based auth with Passport
- **Authorization**: RBAC with 6 roles
- **Database**: Prisma ORM with PostgreSQL
- **API Documentation**: Swagger/OpenAPI
- **Validation**: class-validator and Zod
- **Async Jobs**: Bull/Redis queue support
- **Security**: Helmet, CORS, input validation

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run Prisma migrations
npx prisma migrate dev --name init

# Start development server
npm run start:dev

# Open http://localhost:3001/api/docs
```

## 📁 Project Structure

```
├── src/
│   ├── main.ts              # Entry point
│   ├── app.module.ts        # Root module
│   ├── auth/                # Authentication
│   ├── products/            # Products module
│   ├── sales/               # Sales module
│   ├── customers/           # Customers module
│   ├── financial/           # Financial module
│   ├── database/            # Prisma service
│   └── config/              # Configuration
├── prisma/
│   ├── schema.prisma        # Data model
│   └── migrations/          # Database migrations
└── test/                    # Test files
```

## 🏗️ Architecture

### Modules

Each feature is a self-contained NestJS module:

```
module/
├── module.controller.ts     # HTTP endpoints
├── module.service.ts        # Business logic
├── module.module.ts         # Module definition
├── dto/                     # Data Transfer Objects
└── entities/                # Database entities
```

## 🔐 Authentication

JWT-based authentication with roles:

```typescript
@UseGuards(JwtAuthGuard)
@Roles('ADMIN')
@Get('protected')
getProtected(@CurrentUser() user) {
  // ...
}
```

## 📚 API Endpoints

See Swagger docs at `/api/docs`

### Example: Products

- `GET /products` - List products
- `POST /products` - Create product
- `GET /products/:id` - Get product
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product

## 🗄️ Database Schema

See `prisma/schema.prisma` for complete data model including:

- Users & Tenants (Multi-tenant)
- Products & Inventory
- Customers & CRM
- Sales & Service Orders
- Financial (Expenses, Receivables, Accounts)
- Reports & Audit Logs

## 📦 Dependencies

- **NestJS**: Framework
- **Prisma**: ORM
- **PostgreSQL**: Database
- **JWT**: Authentication
- **Passport**: Strategy library
- **Validator**: Input validation
- **Swagger**: API docs

## 🔧 Development

```bash
# Format code
npm run format

# Lint
npm run lint

# Tests
npm run test
npm run test:cov

# Prisma Studio
npx prisma studio
```

## ⚙️ Environment Variables

```
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key
JWT_EXPIRATION=3600
SUPABASE_URL=...
SUPABASE_KEY=...
API_PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 🚀 Deployment

```bash
# Build
npm run build

# Production
npm run start:prod
```

## 📚 Documentation

See [main README](../README.md) for complete documentation.

## 📄 License

MIT
