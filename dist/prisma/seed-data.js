"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const customerNames = [
    'João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Souza',
    'Juliana Lima', 'Fernando Alves', 'Camila Rodrigues', 'Rafael Pereira', 'Beatriz Ferreira',
    'Lucas Martins', 'Mariana Ribeiro', 'Thiago Carvalho', 'Amanda Gomes', 'Bruno Nascimento',
    'Larissa Dias', 'Gustavo Freitas', 'Isabela Castro', 'Diego Monteiro', 'Letícia Barbosa',
    'Rodrigo Cardoso', 'Fernanda Araújo', 'Vinícius Pinto', 'Patrícia Mendes', 'Marcelo Ramos',
    'Aline Correia', 'Fábio Teixeira', 'Vanessa Nunes', 'Gabriel Soares', 'Daniela Moura',
    'André Barros', 'Carla Duarte', 'Paulo Batista', 'Renata Cunha', 'Ricardo Lopes',
    'Tatiana Rocha', 'Márcio Azevedo', 'Jéssica Campos', 'Leonardo Melo', 'Bianca Fonseca',
    'Felipe Santana', 'Priscila Vieira', 'Henrique Castro', 'Natália Moreira', 'Alexandre Fernandes'
];
const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Brasília', 'Curitiba', 'Porto Alegre', 'Salvador', 'Fortaleza', 'Recife', 'Manaus'];
const states = ['SP', 'RJ', 'MG', 'DF', 'PR', 'RS', 'BA', 'CE', 'PE', 'AM'];
const smartphones = [
    { brand: 'Apple', models: ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro', 'iPhone 14', 'iPhone 13', 'iPhone SE'] },
    { brand: 'Samsung', models: ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S23 FE', 'Galaxy A54', 'Galaxy A34', 'Galaxy Z Fold 5', 'Galaxy Z Flip 5'] },
    { brand: 'Xiaomi', models: ['Redmi Note 13 Pro', 'Redmi Note 13', 'Poco X6 Pro', 'Poco F5', 'Xiaomi 13T', 'Xiaomi 13'] },
    { brand: 'Motorola', models: ['Moto G84', 'Moto G54', 'Edge 40 Neo', 'Edge 40', 'Razr 40'] },
    { brand: 'Realme', models: ['Realme 11 Pro+', 'Realme 11', 'Realme C55', 'Realme GT 2'] },
    { brand: 'OnePlus', models: ['OnePlus 12', 'OnePlus 11', 'OnePlus Nord 3'] },
];
const accessories = [
    'Capinha Transparente', 'Capinha Anti-Impacto', 'Película de Vidro', 'Película Hidrogel',
    'Carregador Turbo 33W', 'Carregador Wireless', 'Cabo USB-C', 'Fone Bluetooth',
    'Pop Socket', 'Suporte Veicular', 'Power Bank 10000mAh', 'Película de Privacidade'
];
const parts = [
    'Tela Display LCD', 'Bateria Original', 'Câmera Traseira', 'Câmera Frontal',
    'Flex Carga', 'Alto Falante', 'Microfone', 'Conector de Carga', 'Botão Power',
    'Bandeja Chip', 'Vidro Traseiro'
];
function generateCPF() {
    const random = () => Math.floor(Math.random() * 10);
    return `${random()}${random()}${random()}.${random()}${random()}${random()}.${random()}${random()}${random()}-${random()}${random()}`;
}
function generatePhone() {
    return `(11) 9${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
}
async function main() {
    console.log('🌱 Iniciando seed do banco de dados...');
    let tenant = await prisma.tenant.findFirst();
    if (!tenant) {
        tenant = await prisma.tenant.create({
            data: {
                name: 'SmartFlux Store',
                slug: 'smartflux',
                plan: 'PROFESSIONAL',
                status: 'ACTIVE',
                cnpj: '12.345.678/0001-90',
                fiscalRegime: 'SIMPLES_NACIONAL',
            },
        });
        console.log('✅ Tenant criado');
    }
    let user = await prisma.user.findFirst({ where: { email: 'admin@smartflux.com' } });
    if (!user) {
        user = await prisma.user.create({
            data: {
                email: 'admin@smartflux.com',
                name: 'Administrador',
                passwordHash: '$2b$10$YourHashedPasswordHere',
                role: 'ADMIN',
                status: 'ACTIVE',
                tenantId: tenant.id,
            },
        });
        console.log('✅ Usuário admin criado');
    }
    console.log('👥 Criando clientes...');
    const customers = [];
    for (let i = 0; i < 45; i++) {
        const cityIndex = Math.floor(Math.random() * cities.length);
        const customer = await prisma.customer.create({
            data: {
                name: customerNames[i] || `Cliente ${i + 1}`,
                document: generateCPF(),
                email: `cliente${i + 1}@email.com`,
                phone: generatePhone(),
                whatsapp: generatePhone(),
                city: cities[cityIndex],
                state: states[cityIndex],
                segment: ['LEAD', 'PROSPECT', 'REGULAR', 'VIP'][Math.floor(Math.random() * 4)],
                tenantId: tenant.id,
            },
        });
        customers.push(customer);
    }
    console.log(`✅ ${customers.length} clientes criados`);
    console.log('📱 Criando produtos...');
    const products = [];
    let skuCounter = 1000;
    for (const brand of smartphones) {
        for (const model of brand.models) {
            const costPrice = Math.floor(Math.random() * 2000) + 700;
            const salePrice = costPrice * 1.4;
            const product = await prisma.product.create({
                data: {
                    sku: `SMT-${skuCounter++}`,
                    name: `${brand.brand} ${model}`,
                    brand: brand.brand,
                    model: model,
                    category: 'SMARTPHONE',
                    costPrice,
                    salePrice,
                    profitMargin: 40,
                    stockQuantity: Math.floor(Math.random() * 20) + 5,
                    minStock: 3,
                    origin: 'NATIONAL',
                    tenantId: tenant.id,
                },
            });
            products.push(product);
        }
    }
    for (const accessory of accessories) {
        const costPrice = Math.floor(Math.random() * 60) + 15;
        const salePrice = costPrice * 1.7;
        const product = await prisma.product.create({
            data: {
                sku: `ACC-${skuCounter++}`,
                name: accessory,
                brand: 'Genérico',
                model: 'Universal',
                category: ['ACCESSORY_CASE', 'ACCESSORY_CHARGER', 'ACCESSORY_SCREEN_PROTECTOR'][Math.floor(Math.random() * 3)],
                costPrice,
                salePrice,
                profitMargin: 70,
                stockQuantity: Math.floor(Math.random() * 50) + 20,
                minStock: 10,
                origin: 'IMPORTED',
                tenantId: tenant.id,
            },
        });
        products.push(product);
    }
    for (const part of parts) {
        const costPrice = Math.floor(Math.random() * 200) + 30;
        const salePrice = costPrice * 1.6;
        const product = await prisma.product.create({
            data: {
                sku: `PRT-${skuCounter++}`,
                name: part,
                brand: 'Original',
                model: 'OEM',
                category: 'PART_SCREEN',
                costPrice,
                salePrice,
                profitMargin: 60,
                stockQuantity: Math.floor(Math.random() * 30) + 10,
                minStock: 5,
                origin: 'NATIONAL',
                tenantId: tenant.id,
            },
        });
        products.push(product);
    }
    console.log(`✅ ${products.length} produtos criados`);
    console.log('🏭 Criando fornecedores...');
    const suppliers = await Promise.all([
        prisma.supplier.create({
            data: {
                name: 'TechDistribuidora LTDA',
                type: 'NATIONAL_DISTRIBUTOR',
                document: '12.345.678/0001-10',
                email: 'contato@techdistribuidora.com',
                phone: '(11) 3000-0001',
                city: 'São Paulo',
                state: 'SP',
                tenantId: tenant.id,
            },
        }),
        prisma.supplier.create({
            data: {
                name: 'SmartParts Importadora',
                type: 'INTERNATIONAL_SUPPLIER',
                document: '98.765.432/0001-20',
                email: 'vendas@smartparts.com',
                phone: '(11) 3000-0002',
                city: 'São Paulo',
                state: 'SP',
                tenantId: tenant.id,
            },
        }),
        prisma.supplier.create({
            data: {
                name: 'Mobile Solutions',
                type: 'MANUFACTURER',
                document: '45.678.912/0001-30',
                email: 'comercial@mobilesolutions.com',
                phone: '(11) 3000-0003',
                city: 'Rio de Janeiro',
                state: 'RJ',
                tenantId: tenant.id,
            },
        }),
    ]);
    console.log(`✅ ${suppliers.length} fornecedores criados`);
    console.log('💰 Criando vendas...');
    for (let i = 0; i < 20; i++) {
        const customer = customers[Math.floor(Math.random() * customers.length)];
        const product = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.floor(Math.random() * 3) + 1;
        const unitPrice = Number(product.salePrice);
        const unitCost = Number(product.costPrice);
        const subtotal = unitPrice * quantity;
        const total = subtotal;
        const totalCost = unitCost * quantity;
        const grossProfit = total - totalCost;
        const profitMargin = (grossProfit / total) * 100;
        await prisma.sale.create({
            data: {
                code: `SALE-${Date.now()}-${i}`,
                customerId: customer.id,
                userId: user.id,
                tenantId: tenant.id,
                subtotal,
                taxTotal: 0,
                discount: 0,
                total,
                totalCost,
                grossProfit,
                profitMargin,
                netProfit: grossProfit,
                paymentMethod: ['CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'PIX'][Math.floor(Math.random() * 4)],
                status: 'COMPLETED',
                channel: 'STORE',
                saleDate: new Date(),
                items: {
                    create: [{
                            productId: product.id,
                            quantity,
                            unitPrice,
                            unitCost,
                            discount: 0,
                            subtotal,
                            total,
                        }],
                },
            },
        });
    }
    console.log('✅ 20 vendas criadas');
    console.log('🎉 Seed concluído com sucesso!');
}
main()
    .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-data.js.map