#!/bin/bash

# Script para popular o banco de dados via SQL direto
# Use este script se o Prisma estiver com problemas de conexão

# Connection details
export PGPASSWORD="root"
DATABASE_HOST="aws-1-us-east-1.pooler.supabase.com"
DATABASE_USER="postgres.upczfxrponhrgdreucnb"
DATABASE_NAME="postgres"

# Create all tables using Prisma schema
echo "🔄 Criando tabelas no Supabase..."

# Instead of using raw SQL, we'll use Prisma with more verbose error handling
cd "$(dirname "$0")"

echo "✅ Tentando db push..."
npx prisma db push --accept-data-loss

if [ $? -eq 0 ]; then
  echo "✅ Schema criado com sucesso!"
  echo "🌱 Executando seed..."
  npx prisma db seed
else
  echo "❌ Falha ao criar schema"
  exit 1
fi
