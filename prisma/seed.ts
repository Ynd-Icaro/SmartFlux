import { PrismaClient } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

// Dados brasileiros realistas
const brazilianNames = [
  'João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Lima',
  'Juliana Souza', 'Ricardo Alves', 'Fernanda Ribeiro', 'Paulo Pereira', 'Camila Ferreira',
  'Lucas Rodrigues', 'Beatriz Martins', 'Gabriel Araújo', 'Larissa Carvalho', 'Felipe Dias',
  'Amanda Barbosa', 'Bruno Castro', 'Mariana Gomes', 'Thiago Rocha', 'Isabela Pinto',
  'Rafael Monteiro', 'Patrícia Cardoso', 'Diego Correia', 'Letícia Melo', 'Rodrigo Teixeira',
  'Aline Barros', 'Marcelo Ramos', 'Vanessa Nunes', 'André Freitas', 'Carolina Moura',
  'Leonardo Cunha', 'Natália Castro', 'Gustavo Azevedo', 'Priscila Vieira', 'Vinicius Campos',
  'Tatiana Sousa', 'Eduardo Silva', 'Renata Lima', 'Fábio Santos', 'Cristina Rodrigues',
  'Daniel Fernandes', 'Jéssica Martins', 'Roberto Almeida', 'Sandra Costa', 'Alexandre Pires'
];

const cities = [
  { city: 'São Paulo', state: 'SP' },
  { city: 'Rio de Janeiro', state: 'RJ' },
  { city: 'Belo Horizonte', state: 'MG' },
  { city: 'Curitiba', state: 'PR' },
  { city: 'Porto Alegre', state: 'RS' },
  { city: 'Salvador', state: 'BA' },
  { city: 'Brasília', state: 'DF' },
  { city: 'Fortaleza', state: 'CE' },
  { city: 'Recife', state: 'PE' },
  { city: 'Manaus', state: 'AM' },
];

const smartphones = [
  { name: 'iPhone 15 Pro Max', brand: 'Apple', cost: 6500, price: 8999, stock: 8 },
  { name: 'iPhone 15 Pro', brand: 'Apple', cost: 5800, price: 7999, stock: 12 },
  { name: 'iPhone 15', brand: 'Apple', cost: 4200, price: 5999, stock: 15 },
  { name: 'iPhone 14 Pro Max', brand: 'Apple', cost: 5000, price: 6999, stock: 10 },
  { name: 'iPhone 14 Pro', brand: 'Apple', cost: 4500, price: 6299, stock: 8 },
  { name: 'iPhone 14', brand: 'Apple', cost: 3500, price: 4999, stock: 18 },
  { name: 'Galaxy S24 Ultra', brand: 'Samsung', cost: 5500, price: 7499, stock: 10 },
  { name: 'Galaxy S24+', brand: 'Samsung', cost: 4200, price: 5999, stock: 12 },
  { name: 'Galaxy S24', brand: 'Samsung', cost: 3500, price: 4999, stock: 15 },
  { name: 'Galaxy S23 Ultra', brand: 'Samsung', cost: 4500, price: 6299, stock: 8 },
  { name: 'Galaxy S23+', brand: 'Samsung', cost: 3200, price: 4699, stock: 10 },
  { name: 'Galaxy S23', brand: 'Samsung', cost: 2800, price: 3999, stock: 14 },
  { name: 'Xiaomi 14', brand: 'Xiaomi', cost: 2800, price: 3999, stock: 20 },
  { name: 'Xiaomi 13T Pro', brand: 'Xiaomi', cost: 2200, price: 3299, stock: 18 },
  { name: 'Xiaomi 13T', brand: 'Xiaomi', cost: 1800, price: 2799, stock: 22 },
  { name: 'Redmi Note 13 Pro+', brand: 'Xiaomi', cost: 1400, price: 2199, stock: 25 },
  { name: 'Redmi Note 13 Pro', brand: 'Xiaomi', cost: 1100, price: 1799, stock: 30 },
  { name: 'Motorola Edge 40 Pro', brand: 'Motorola', cost: 2500, price: 3699, stock: 12 },
  { name: 'Motorola Edge 40', brand: 'Motorola', cost: 1800, price: 2799, stock: 15 },
  { name: 'Moto G84', brand: 'Motorola', cost: 1200, price: 1899, stock: 20 },
];

const accessories = [
  { name: 'Capinha Silicone Premium', category: 'ACCESSORY_CASE', cost: 15, price: 49.9, stock: 150 },
  { name: 'Capinha Transparente', category: 'ACCESSORY_CASE', cost: 12, price: 39.9, stock: 200 },
  { name: 'Película 3D Curva', category: 'ACCESSORY_SCREEN_PROTECTOR', cost: 8, price: 39.9, stock: 180 },
  { name: 'Película Hidrogel', category: 'ACCESSORY_SCREEN_PROTECTOR', cost: 6, price: 29.9, stock: 220 },
  { name: 'Carregador Turbo 65W', category: 'ACCESSORY_CHARGER', cost: 25, price: 89.9, stock: 80 },
  { name: 'Carregador 20W USB-C', category: 'ACCESSORY_CHARGER', cost: 18, price: 59.9, stock: 100 },
  { name: 'Cabo USB-C 2m', category: 'ACCESSORY_CABLE', cost: 10, price: 34.9, stock: 150 },
  { name: 'Cabo Lightning 1m', category: 'ACCESSORY_CABLE', cost: 12, price: 39.9, stock: 120 },
  { name: 'Fone Bluetooth TWS', category: 'ACCESSORY_EARPHONE', cost: 45, price: 149.9, stock: 60 },
  { name: 'Fone Bluetooth Sport', category: 'ACCESSORY_EARPHONE', cost: 35, price: 119.9, stock: 50 },
  { name: 'Suporte Veicular', category: 'ACCESSORY_OTHER', cost: 15, price: 49.9, stock: 80 },
  { name: 'Power Bank 10000mAh', category: 'ACCESSORY_OTHER', cost: 40, price: 129.9, stock: 45 },
];

const parts = [
  { name: 'Tela iPhone 14', category: 'PART_SCREEN', cost: 280, price: 599, stock: 15 },
  { name: 'Tela iPhone 13', category: 'PART_SCREEN', cost: 220, price: 499, stock: 18 },
  { name: 'Tela Galaxy S23', category: 'PART_SCREEN', cost: 250, price: 549, stock: 12 },
  { name: 'Bateria iPhone 14', category: 'PART_BATTERY', cost: 60, price: 149, stock: 40 },
  { name: 'Bateria iPhone 13', category: 'PART_BATTERY', cost: 55, price: 139, stock: 45 },
  { name: 'Bateria Galaxy S23', category: 'PART_BATTERY', cost: 50, price: 129, stock: 35 },
  { name: 'Câmera Traseira iPhone 14', category: 'PART_CAMERA', cost: 120, price: 299, stock: 10 },
  { name: 'Alto-falante iPhone', category: 'PART_OTHER', cost: 25, price: 79, stock: 30 },
];

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // 1. Criar tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'smartflux-default' },
    update: {},
    create: {
      name: 'SmartFlux Default',
      slug: 'smartflux-default',
      plan: 'PROFESSIONAL',
      status: 'ACTIVE',
      maxUsers: 10,
      fiscalRegime: 'SIMPLES_NACIONAL',
      cnpj: '12345678000195',
    },
  });

  console.log('✅ Tenant criado:', tenant.id);

  // 2. Criar usuário admin
  const adminPassword = await bcryptjs.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@smartflux.com' },
    update: {},
    create: {
      email: 'admin@smartflux.com',
      name: 'Admin',
      role: 'ADMIN',
      status: 'ACTIVE',
      passwordHash: adminPassword,
      tenantId: tenant.id,
    },
  });

  console.log('✅ Usuário admin criado:', admin.email);

  // 3. Criar usuário vendedor
  const sellerPassword = await bcryptjs.hash('seller123', 10);
  const seller = await prisma.user.upsert({
    where: { email: 'seller@smartflux.com' },
    update: {},
    create: {
      email: 'seller@smartflux.com',
      name: 'João Vendedor',
      role: 'SELLER',
      status: 'ACTIVE',
      passwordHash: sellerPassword,
      tenantId: tenant.id,
    },
  });

  console.log('✅ Usuário vendedor criado:', seller.email);

  // 4. Criar usuário técnico
  const techPassword = await bcryptjs.hash('tech123', 10);
  const technician = await prisma.user.upsert({
    where: { email: 'tech@smartflux.com' },
    update: {},
    create: {
      email: 'tech@smartflux.com',
      name: 'Carlos Técnico',
      role: 'TECHNICIAN',
      status: 'ACTIVE',
      passwordHash: techPassword,
      tenantId: tenant.id,
    },
  });

  console.log('✅ Usuário técnico criado:', technician.email);

  // 5. Criar clientes (45 clientes)
  console.log('📝 Criando clientes...');
  const customers = [];
  const segments = ['LEAD', 'PROSPECT', 'REGULAR', 'VIP'];
  
  for (let i = 0; i < 45; i++) {
    const location = cities[i % cities.length];
    const cpf = String(10000000000 + i).padStart(11, '0');
    const name = brazilianNames[i % brazilianNames.length];
    const email = name.toLowerCase().replace(/ /g, '.') + i + '@email.com';
    const phone = `119${String(10000000 + i).slice(0, 8)}`;
    
    const customer = await prisma.customer.create({
      data: {
        name,
        document: cpf,
        email,
        phone,
        whatsapp: phone,
        city: location.city,
        state: location.state,
        segment: segments[i % segments.length] as any,
        tenantId: tenant.id,
        totalPurchases: Math.floor(Math.random() * 10),
        lastPurchaseAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
      },
    });
    customers.push(customer);
  }

  console.log(`✅ ${customers.length} clientes criados`);

  // 6. Criar produtos (90+ produtos)
  console.log('📱 Criando produtos...');
  const products = [];
  let skuCounter = 1000;

  // Criar smartphones
  for (const phone of smartphones) {
    const margin = ((phone.price - phone.cost) / phone.cost) * 100;
    const product = await prisma.product.create({
      data: {
        name: phone.name,
        sku: `SMART${skuCounter++}`,
        brand: phone.brand,
        model: phone.name.split(' ').pop() || 'Standard',
        category: 'SMARTPHONE',
        costPrice: phone.cost.toString(),
        salePrice: phone.price.toString(),
        profitMargin: margin.toFixed(2),
        stockQuantity: phone.stock,
        minStock: 3,
        origin: 'IMPORTED',
        isActive: true,
        tenantId: tenant.id,
      },
    });
    products.push(product);
  }

  // Criar acessórios
  for (const accessory of accessories) {
    const margin = ((accessory.price - accessory.cost) / accessory.cost) * 100;
    const product = await prisma.product.create({
      data: {
        name: accessory.name,
        sku: `ACC${skuCounter++}`,
        brand: 'Genérico',
        model: 'Universal',
        category: accessory.category as any,
        costPrice: accessory.cost.toString(),
        salePrice: accessory.price.toString(),
        profitMargin: margin.toFixed(2),
        stockQuantity: accessory.stock,
        minStock: 20,
        origin: 'IMPORTED',
        isActive: true,
        tenantId: tenant.id,
      },
    });
    products.push(product);
  }

  // Criar peças
  for (const part of parts) {
    const margin = ((part.price - part.cost) / part.cost) * 100;
    const product = await prisma.product.create({
      data: {
        name: part.name,
        sku: `PART${skuCounter++}`,
        brand: part.name.includes('iPhone') ? 'Apple' : part.name.includes('Galaxy') ? 'Samsung' : 'Genérico',
        model: 'Reposição',
        category: part.category as any,
        costPrice: part.cost.toString(),
        salePrice: part.price.toString(),
        profitMargin: margin.toFixed(2),
        stockQuantity: part.stock,
        minStock: 10,
        origin: 'IMPORTED',
        isActive: true,
        tenantId: tenant.id,
      },
    });
    products.push(product);
  }

  console.log(`✅ ${products.length} produtos criados`);

  // 6.5. Criar produtos principais com variações vinculadas
  console.log('🔗 Criando produtos principais e vinculações...');
  const mainProducts = [];

  // iPhone 15 Pro Max - Produto Principal
  const iphone15ProMaxMain = await prisma.product.create({
    data: {
      name: 'iPhone 15 Pro Max',
      sku: `MAIN${skuCounter++}`,
      brand: 'Apple',
      model: '15 Pro Max',
      category: 'SMARTPHONE',
      costPrice: '0',
      salePrice: '8999.00',
      profitMargin: '0',
      stockQuantity: 0,
      minStock: 0,
      origin: 'IMPORTED',
      isActive: true,
      isMainProduct: true,
      tenantId: tenant.id,
    },
  });
  mainProducts.push(iphone15ProMaxMain);

  // Variações do iPhone 15 Pro Max
  const iphone15Variations = [
    { importName: '256GB Titânio Natural', cost: 6800, price: 9499, stock: 3 },
    { importName: '512GB Titânio Natural', cost: 7500, price: 10499, stock: 2 },
    { importName: '1TB Titânio Natural', cost: 8200, price: 11499, stock: 1 },
    { importName: '256GB Titânio Azul', cost: 6800, price: 9499, stock: 4 },
    { importName: '512GB Titânio Azul', cost: 7500, price: 10499, stock: 2 },
    { importName: '256GB Titânio Branco', cost: 6800, price: 9499, stock: 3 },
  ];

  for (const variation of iphone15Variations) {
    await prisma.product.create({
      data: {
        name: iphone15ProMaxMain.name,
        sku: `VAR${skuCounter++}`,
        brand: iphone15ProMaxMain.brand,
        model: iphone15ProMaxMain.model,
        category: 'SMARTPHONE',
        costPrice: variation.cost.toString(),
        salePrice: variation.price.toString(),
        profitMargin: (((variation.price - variation.cost) / variation.cost) * 100).toFixed(2),
        stockQuantity: variation.stock,
        minStock: 1,
        origin: 'IMPORTED',
        isActive: true,
        isLinkableProduct: true,
        importName: variation.importName,
        mainProductId: iphone15ProMaxMain.id,
        linkedAt: new Date(),
        tenantId: tenant.id,
      },
    });
  }

  // Galaxy S24 Ultra - Produto Principal
  const galaxyS24UltraMain = await prisma.product.create({
    data: {
      name: 'Galaxy S24 Ultra',
      sku: `MAIN${skuCounter++}`,
      brand: 'Samsung',
      model: 'S24 Ultra',
      category: 'SMARTPHONE',
      costPrice: '0',
      salePrice: '7999.00',
      profitMargin: '0',
      stockQuantity: 0,
      minStock: 0,
      origin: 'IMPORTED',
      isActive: true,
      isMainProduct: true,
      tenantId: tenant.id,
    },
  });
  mainProducts.push(galaxyS24UltraMain);

  // Variações do Galaxy S24 Ultra
  const galaxyS24Variations = [
    { importName: '256GB Titânio Cinza', cost: 5800, price: 7999, stock: 5 },
    { importName: '512GB Titânio Cinza', cost: 6500, price: 8999, stock: 3 },
    { importName: '1TB Titânio Cinza', cost: 7200, price: 9999, stock: 2 },
    { importName: '256GB Titânio Violeta', cost: 5800, price: 7999, stock: 4 },
    { importName: '512GB Titânio Violeta', cost: 6500, price: 8999, stock: 2 },
  ];

  for (const variation of galaxyS24Variations) {
    await prisma.product.create({
      data: {
        name: galaxyS24UltraMain.name,
        sku: `VAR${skuCounter++}`,
        brand: galaxyS24UltraMain.brand,
        model: galaxyS24UltraMain.model,
        category: 'SMARTPHONE',
        costPrice: variation.cost.toString(),
        salePrice: variation.price.toString(),
        profitMargin: (((variation.price - variation.cost) / variation.cost) * 100).toFixed(2),
        stockQuantity: variation.stock,
        minStock: 1,
        origin: 'IMPORTED',
        isActive: true,
        isLinkableProduct: true,
        importName: variation.importName,
        mainProductId: galaxyS24UltraMain.id,
        linkedAt: new Date(),
        tenantId: tenant.id,
      },
    });
  }

  // Xiaomi 14 - Produto Principal
  const xiaomi14Main = await prisma.product.create({
    data: {
      name: 'Xiaomi 14',
      sku: `MAIN${skuCounter++}`,
      brand: 'Xiaomi',
      model: '14',
      category: 'SMARTPHONE',
      costPrice: '0',
      salePrice: '4499.00',
      profitMargin: '0',
      stockQuantity: 0,
      minStock: 0,
      origin: 'IMPORTED',
      isActive: true,
      isMainProduct: true,
      tenantId: tenant.id,
    },
  });
  mainProducts.push(xiaomi14Main);

  // Variações do Xiaomi 14
  const xiaomi14Variations = [
    { importName: '256GB Preto', cost: 2900, price: 4299, stock: 8 },
    { importName: '512GB Preto', cost: 3200, price: 4799, stock: 5 },
    { importName: '256GB Jade Verde', cost: 2900, price: 4299, stock: 6 },
    { importName: '512GB Jade Verde', cost: 3200, price: 4799, stock: 4 },
  ];

  for (const variation of xiaomi14Variations) {
    await prisma.product.create({
      data: {
        name: xiaomi14Main.name,
        sku: `VAR${skuCounter++}`,
        brand: xiaomi14Main.brand,
        model: xiaomi14Main.model,
        category: 'SMARTPHONE',
        costPrice: variation.cost.toString(),
        salePrice: variation.price.toString(),
        profitMargin: (((variation.price - variation.cost) / variation.cost) * 100).toFixed(2),
        stockQuantity: variation.stock,
        minStock: 1,
        origin: 'IMPORTED',
        isActive: true,
        isLinkableProduct: true,
        importName: variation.importName,
        mainProductId: xiaomi14Main.id,
        linkedAt: new Date(),
        tenantId: tenant.id,
      },
    });
  }

  // Motorola Edge 40 Pro - Produto Principal SEM variações (para teste)
  const motoEdgeMain = await prisma.product.create({
    data: {
      name: 'Motorola Edge 40 Pro',
      sku: `MAIN${skuCounter++}`,
      brand: 'Motorola',
      model: 'Edge 40 Pro',
      category: 'SMARTPHONE',
      costPrice: '0',
      salePrice: '3999.00',
      profitMargin: '0',
      stockQuantity: 0,
      minStock: 0,
      origin: 'NATIONAL',
      isActive: true,
      isMainProduct: true,
      tenantId: tenant.id,
    },
  });
  mainProducts.push(motoEdgeMain);

  // iPhone 14 - Produto Principal
  const iphone14Main = await prisma.product.create({
    data: {
      name: 'iPhone 14',
      sku: `MAIN${skuCounter++}`,
      brand: 'Apple',
      model: '14',
      category: 'SMARTPHONE',
      costPrice: '0',
      salePrice: '5499.00',
      profitMargin: '0',
      stockQuantity: 0,
      minStock: 0,
      origin: 'IMPORTED',
      isActive: true,
      isMainProduct: true,
      tenantId: tenant.id,
    },
  });
  mainProducts.push(iphone14Main);

  // Variações do iPhone 14
  const iphone14Variations = [
    { importName: '128GB Azul', cost: 3600, price: 5299, stock: 6 },
    { importName: '256GB Azul', cost: 4000, price: 5799, stock: 4 },
    { importName: '128GB Preto', cost: 3600, price: 5299, stock: 7 },
    { importName: '256GB Preto', cost: 4000, price: 5799, stock: 5 },
    { importName: '128GB Roxo', cost: 3600, price: 5299, stock: 3 },
  ];

  for (const variation of iphone14Variations) {
    await prisma.product.create({
      data: {
        name: iphone14Main.name,
        sku: `VAR${skuCounter++}`,
        brand: iphone14Main.brand,
        model: iphone14Main.model,
        category: 'SMARTPHONE',
        costPrice: variation.cost.toString(),
        salePrice: variation.price.toString(),
        profitMargin: (((variation.price - variation.cost) / variation.cost) * 100).toFixed(2),
        stockQuantity: variation.stock,
        minStock: 1,
        origin: 'IMPORTED',
        isActive: true,
        isLinkableProduct: true,
        importName: variation.importName,
        mainProductId: iphone14Main.id,
        linkedAt: new Date(),
        tenantId: tenant.id,
      },
    });
  }

  console.log(`✅ ${mainProducts.length} produtos principais criados com variações vinculadas`);

  // 7. Criar fornecedores
  const supplier = await prisma.supplier.create({
    data: {
      name: 'Tech Distribuidor LTDA',
      type: 'NATIONAL_DISTRIBUTOR',
      document: '12345678000195',
      email: 'contato@techdist.com.br',
      phone: '1133334444',
      city: 'São Paulo',
      state: 'SP',
      isActive: true,
      tenantId: tenant.id,
    },
  });

  console.log('✅ Fornecedor criado:', supplier.id);

  // 8. Criar dispositivos para clientes (30 dispositivos)
  console.log('📱 Criando dispositivos de clientes...');
  const devices = [];
  const deviceModels = [
    { brand: 'Apple', model: 'iPhone 12', storage: '128GB' },
    { brand: 'Apple', model: 'iPhone 13', storage: '256GB' },
    { brand: 'Samsung', model: 'Galaxy S21', storage: '128GB' },
    { brand: 'Samsung', model: 'Galaxy S22', storage: '256GB' },
    { brand: 'Xiaomi', model: 'Redmi Note 11', storage: '128GB' },
  ];

  for (let i = 0; i < 30; i++) {
    const deviceModel = deviceModels[i % deviceModels.length];
    const customer = customers[i % customers.length];
    const device = await prisma.customerDevice.create({
      data: {
        customerId: customer.id,
        brand: deviceModel.brand,
        model: deviceModel.model,
        imei: `35702408945${String(6000 + i).padStart(4, '0')}`,
        color: ['Preto', 'Branco', 'Azul', 'Verde'][i % 4],
        storage: deviceModel.storage,
        purchaseDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
        warrantyUntil: new Date(Date.now() + Math.random() * 180 * 24 * 60 * 60 * 1000),
        warrantyType: 'MANUFACTURER',
      },
    });
    devices.push(device);
  }

  console.log(`✅ ${devices.length} dispositivos criados`);

  // 9. Criar ordens de serviço (15 OS)
  console.log('🔧 Criando ordens de serviço...');
  const serviceOrderStatuses = ['OPEN', 'DIAGNOSING', 'IN_REPAIR', 'COMPLETED', 'READY_FOR_PICKUP'];
  const issues = [
    'Tela quebrada',
    'Não liga',
    'Bateria viciada',
    'Problema na câmera',
    'Não carrega',
    'Problemas de software',
    'Botão não funciona',
    'Alto-falante não funciona',
  ];

  for (let i = 0; i < 15; i++) {
    const device = devices[i];
    const customer = customers[i];
    const partProduct = products.find(p => p.category === 'PART_BATTERY') || products[0];
    
    const laborCost = 80 + Math.random() * 170;
    const partsCost = i % 3 === 0 ? parseFloat(partProduct.salePrice) : 0;
    const total = laborCost + partsCost;

    await prisma.serviceOrder.create({
      data: {
        code: `OS-${String(1000 + i).padStart(5, '0')}`,
        customerId: customer.id,
        deviceId: device.id,
        technicianId: technician.id,
        deviceBrand: device.brand,
        deviceModel: device.model,
        deviceColor: device.color,
        reportedIssue: issues[i % issues.length],
        diagnosis: i % 2 === 0 ? 'Diagnóstico completo realizado' : null,
        solution: i % 3 === 0 ? 'Peça substituída com sucesso' : null,
        laborCost: laborCost.toFixed(2),
        partsCost: partsCost.toFixed(2),
        total: total.toFixed(2),
        status: serviceOrderStatuses[i % serviceOrderStatuses.length] as any,
        priority: i % 5 === 0 ? 'HIGH' : 'NORMAL',
        notes: 'Atendimento conforme solicitado',
        tenantId: tenant.id,
      },
    });
  }

  console.log('✅ 15 ordens de serviço criadas');

  // 10. Criar vendas (80 vendas)
  console.log('💰 Criando vendas...');
  const paymentMethods = ['PIX', 'DEBIT_CARD', 'CREDIT_CARD', 'CASH', 'BANK_TRANSFER'];
  const channels = ['STORE', 'WHATSAPP', 'ONLINE'];

  for (let i = 0; i < 80; i++) {
    const customer = customers[i % customers.length];
    const randomProducts = products
      .filter(p => p.category === 'SMARTPHONE' || p.category.includes('ACCESSORY'))
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);

    const items = randomProducts.map(product => ({
      productId: product.id,
      quantity: 1,
      unitPrice: product.salePrice,
      unitCost: product.costPrice,
      discount: '0.00',
      subtotal: product.salePrice,
      total: product.salePrice,
    }));

    const subtotal = items.reduce((sum, item) => sum + parseFloat(item.total), 0);
    const totalCost = items.reduce((sum, item) => sum + parseFloat(item.unitCost), 0);
    const grossProfit = subtotal - totalCost;
    const profitMargin = ((grossProfit / totalCost) * 100).toFixed(2);

    await prisma.sale.create({
      data: {
        code: `V-${String(10000 + i).padStart(6, '0')}`,
        customerId: customer.id,
        userId: seller.id,
        saleDate: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
        subtotal: subtotal.toFixed(2),
        discount: '0.00',
        discountType: 'AMOUNT',
        taxTotal: '0.00',
        total: subtotal.toFixed(2),
        totalCost: totalCost.toFixed(2),
        grossProfit: grossProfit.toFixed(2),
        profitMargin,
        netProfit: grossProfit.toFixed(2),
        paymentMethod: paymentMethods[i % paymentMethods.length] as any,
        installments: 1,
        status: 'COMPLETED',
        channel: channels[i % channels.length] as any,
        tenantId: tenant.id,
        items: {
          create: items,
        },
      },
    });
  }

  console.log('✅ 80 vendas criadas');

  // 11. Criar compras (20 compras)
  console.log('📦 Criando compras...');
  const purchaseStatuses = ['RECEIVED', 'PENDING', 'IN_TRANSIT'];

  for (let i = 0; i < 20; i++) {
    const randomProducts = products
      .filter(p => p.category === 'SMARTPHONE')
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 2) + 1);

    const items = randomProducts.map(product => ({
      productId: product.id,
      quantity: Math.floor(Math.random() * 5) + 1,
      unitCost: product.costPrice,
      totalCost: (parseFloat(product.costPrice) * (Math.floor(Math.random() * 5) + 1)).toFixed(2),
      subtotal: (parseFloat(product.costPrice) * (Math.floor(Math.random() * 5) + 1)).toFixed(2),
    }));

    const subtotal = items.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);

    await prisma.purchase.create({
      data: {
        code: `C-${String(5000 + i).padStart(6, '0')}`,
        supplierId: supplier.id,
        orderDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
        deliveryDate: i % 3 === 0 ? new Date(Date.now() + Math.random() * 15 * 24 * 60 * 60 * 1000) : null,
        subtotal: subtotal.toFixed(2),
        taxTotal: '0.00',
        freightCost: (Math.random() * 200).toFixed(2),
        otherCosts: '0.00',
        total: (subtotal + Math.random() * 200).toFixed(2),
        paymentMethod: 'BANK_TRANSFER',
        installments: 1,
        status: purchaseStatuses[i % purchaseStatuses.length] as any,
        tenantId: tenant.id,
        items: {
          create: items,
        },
      },
    });
  }

  console.log('✅ 20 compras criadas');

  // 12. Criar contas financeiras
  console.log('💳 Criando contas...');
  const accounts = [];

  const checkingAccount = await prisma.account.create({
    data: {
      name: 'Conta Corrente Principal',
      type: 'CHECKING',
      bankName: 'Banco do Brasil',
      accountNumber: '123456-7',
      agency: '0001',
      initialBalance: '50000.00',
      currentBalance: '75000.00',
      isActive: true,
      tenantId: tenant.id,
    },
  });
  accounts.push(checkingAccount);

  const cashAccount = await prisma.account.create({
    data: {
      name: 'Caixa da Loja',
      type: 'CASH',
      initialBalance: '5000.00',
      currentBalance: '12000.00',
      isActive: true,
      tenantId: tenant.id,
    },
  });
  accounts.push(cashAccount);

  console.log(`✅ ${accounts.length} contas criadas`);

  // 13. Criar despesas (30 despesas)
  console.log('📉 Criando despesas...');
  const expenseCategories = ['RENT', 'UTILITIES', 'SALARIES', 'MARKETING', 'SUPPLIES', 'MAINTENANCE'];
  
  for (let i = 0; i < 30; i++) {
    const amount = 500 + Math.random() * 4500;
    const dueDate = new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000);
    const isPaid = i % 3 !== 0;

    await prisma.expense.create({
      data: {
        description: `Despesa ${expenseCategories[i % expenseCategories.length]} - ${String(i + 1).padStart(3, '0')}`,
        category: expenseCategories[i % expenseCategories.length] as any,
        amount: amount.toFixed(2),
        dueDate,
        paymentDate: isPaid ? new Date(dueDate.getTime() + Math.random() * 5 * 24 * 60 * 60 * 1000) : null,
        paymentMethod: isPaid ? 'BANK_TRANSFER' : null,
        isPaid,
        supplierId: i % 5 === 0 ? supplier.id : null,
        tenantId: tenant.id,
      },
    });
  }

  console.log('✅ 30 despesas criadas');

  // 14. Criar recebíveis (50 recebíveis)
  console.log('📈 Criando recebíveis...');
  
  for (let i = 0; i < 50; i++) {
    const amount = 100 + Math.random() * 5000;
    const dueDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    const isPaid = i % 4 !== 0;

    await prisma.receivable.create({
      data: {
        description: `Recebível ${String(i + 1).padStart(3, '0')}`,
        amount: amount.toFixed(2),
        dueDate,
        paymentDate: isPaid ? new Date(dueDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000) : null,
        paymentMethod: isPaid ? ['PIX', 'BANK_TRANSFER', 'DEBIT_CARD'][i % 3] as any : null,
        isPaid,
        customerId: customers[i % customers.length].id,
        tenantId: tenant.id,
      },
    });
  }

  console.log('✅ 50 recebíveis criados');

  console.log('\n🎉 Seed completado com sucesso!');
  console.log('\n📊 Resumo:');
  console.log(`   ✅ 1 Tenant`);
  console.log(`   ✅ 3 Usuários`);
  console.log(`   ✅ 45 Clientes`);
  console.log(`   ✅ ${products.length} Produtos (normais)`);
  console.log(`   ✅ ${mainProducts.length} Produtos Principais`);
  console.log(`   ✅ 25 Variações Vinculadas`);
  console.log(`   ✅ 1 Fornecedor`);
  console.log(`   ✅ 30 Dispositivos`);
  console.log(`   ✅ 15 Ordens de Serviço`);
  console.log(`   ✅ 80 Vendas`);
  console.log(`   ✅ 20 Compras`);
  console.log(`   ✅ 2 Contas`);
  console.log(`   ✅ 30 Despesas`);
  console.log(`   ✅ 50 Recebíveis`);
  console.log('\n📝 Usuários criados:');
  console.log(`   Admin: admin@smartflux.com / admin123`);
  console.log(`   Vendedor: seller@smartflux.com / seller123`);
  console.log(`   Técnico: tech@smartflux.com / tech123`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Erro ao executar seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
