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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(tenantId, createProductDto) {
        const costPrice = this.parseDecimal(createProductDto.baseCost);
        const salePrice = this.parseDecimal(createProductDto.basePrice);
        if (costPrice === null || salePrice === null) {
            throw new Error('Valores de preço ou custo inválidos');
        }
        const profitMargin = salePrice > 0 ? ((salePrice - costPrice) / salePrice) * 100 : 0;
        const data = {
            name: createProductDto.name,
            sku: createProductDto.sku || `SKU-${Date.now()}`,
            brand: createProductDto.brand || 'Unknown',
            model: createProductDto.model || 'Model',
            category: createProductDto.category || 'SMARTPHONE',
            origin: createProductDto.origin || 'NATIONAL',
            costPrice,
            salePrice,
            profitMargin,
            stockQuantity: createProductDto.stock || 0,
            minStock: createProductDto.minStock || 5,
            location: createProductDto.location,
            ncm: createProductDto.ncm,
            cest: createProductDto.cest,
            taxProfile: createProductDto.taxProfile,
            importType: createProductDto.importType,
            importTax: createProductDto.importTax ? this.parseDecimal(createProductDto.importTax) : null,
            freightCost: createProductDto.freightCost ? this.parseDecimal(createProductDto.freightCost) : null,
            images: createProductDto.images || [],
            isActive: createProductDto.isActive !== false,
            hasVariants: createProductDto.hasVariants || false,
            hasImei: createProductDto.hasImei || false,
            isMainProduct: createProductDto.isMainProduct || false,
            isLinkableProduct: createProductDto.isLinkableProduct || false,
            importName: createProductDto.importName,
            mainProductId: createProductDto.mainProductId,
            linkedAt: createProductDto.mainProductId ? new Date() : null,
            tenantId,
        };
        const product = await this.prisma.product.create({
            data,
            include: {
                variants: true,
                mainProduct: {
                    select: {
                        id: true,
                        name: true,
                        sku: true,
                        brand: true,
                        category: true,
                    },
                },
                linkedProducts: {
                    where: { deletedAt: null },
                    select: {
                        id: true,
                        name: true,
                        sku: true,
                        importName: true,
                        salePrice: true,
                        linkedAt: true,
                    },
                },
            },
        });
        return this.transformProduct(product);
    }
    async findAll(tenantId, skip = 0, take = 20) {
        const where = {
            tenantId,
            deletedAt: null,
        };
        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip,
                take,
                include: {
                    variants: true,
                    mainProduct: {
                        select: {
                            id: true,
                            name: true,
                            sku: true,
                        },
                    },
                    linkedProducts: {
                        where: { deletedAt: null },
                        select: {
                            id: true,
                            name: true,
                            sku: true,
                            importName: true,
                            salePrice: true,
                            linkedAt: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.product.count({ where }),
        ]);
        return {
            data: products.map(product => this.transformProduct(product)),
            total,
            skip,
            take
        };
    }
    async findOne(tenantId, id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                variants: true,
                imeis: true,
                mainProduct: {
                    select: {
                        id: true,
                        name: true,
                        sku: true,
                        brand: true,
                        category: true,
                    },
                },
                linkedProducts: {
                    where: { deletedAt: null },
                    include: {
                        variants: true,
                    },
                },
            },
        });
        return product ? this.transformProduct(product) : null;
    }
    async update(tenantId, id, updateProductDto) {
        const { variants, ...productData } = updateProductDto;
        if (productData.baseCost !== undefined) {
            productData.costPrice = this.parseDecimal(productData.baseCost);
            delete productData.baseCost;
        }
        if (productData.basePrice !== undefined) {
            productData.salePrice = this.parseDecimal(productData.basePrice);
            delete productData.basePrice;
        }
        if (productData.importTax !== undefined) {
            productData.importTax = this.parseDecimal(productData.importTax);
        }
        if (productData.freightCost !== undefined) {
            productData.freightCost = this.parseDecimal(productData.freightCost);
        }
        if (productData.costPrice !== undefined && productData.salePrice !== undefined) {
            productData.profitMargin = productData.salePrice > 0 ? ((productData.salePrice - productData.costPrice) / productData.salePrice) * 100 : 0;
        }
        if (productData.mainProductId && productData.isLinkableProduct) {
            productData.linkedAt = new Date();
        }
        if (!productData.isLinkableProduct || !productData.mainProductId) {
            productData.linkedAt = null;
        }
        const updatedProduct = await this.prisma.product.update({
            where: { id },
            data: productData,
            include: {
                variants: true,
                mainProduct: {
                    select: {
                        id: true,
                        name: true,
                        sku: true,
                    },
                },
                linkedProducts: {
                    where: { deletedAt: null },
                    select: {
                        id: true,
                        name: true,
                        sku: true,
                        importName: true,
                        salePrice: true,
                        linkedAt: true,
                    },
                },
            },
        });
        return this.transformProduct(updatedProduct);
    }
    async remove(tenantId, id) {
        return this.prisma.product.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
            include: {
                variants: true,
                linkedProducts: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }
    async search(tenantId, query) {
        return this.prisma.product.findMany({
            where: {
                tenantId,
                deletedAt: null,
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { brand: { contains: query, mode: 'insensitive' } },
                    { sku: { contains: query, mode: 'insensitive' } },
                ],
            },
            include: {
                variants: true,
                linkedProducts: {
                    where: { deletedAt: null },
                    select: {
                        id: true,
                        name: true,
                        importName: true,
                    },
                },
            },
            take: 10,
        });
    }
    async getStats(tenantId) {
        const totalProducts = await this.prisma.product.count({
            where: {
                tenantId,
                deletedAt: null,
            },
        });
        const mainProducts = await this.prisma.product.count({
            where: {
                tenantId,
                deletedAt: null,
                isMainProduct: true,
            },
        });
        const linkedProducts = await this.prisma.product.count({
            where: {
                tenantId,
                deletedAt: null,
                isLinkableProduct: true,
            },
        });
        return {
            totalProducts,
            mainProducts,
            linkedProducts,
            totalVariants: 0,
            totalInventory: 0,
        };
    }
    parseDecimal(value) {
        if (value === null || value === undefined || value === '') {
            return null;
        }
        if (typeof value === 'number') {
            return isNaN(value) ? null : value;
        }
        if (typeof value === 'string') {
            const cleaned = value.replace(/[R$\s]/g, '').replace(',', '.');
            const parts = cleaned.split('.');
            if (parts.length > 2) {
                const integerPart = parts.slice(0, -1).join('');
                const decimalPart = parts[parts.length - 1];
                const parsed = parseFloat(`${integerPart}.${decimalPart}`);
                return isNaN(parsed) ? null : parsed;
            }
            const parsed = parseFloat(cleaned);
            return isNaN(parsed) ? null : parsed;
        }
        return null;
    }
    transformProduct(product) {
        return {
            id: product.id,
            sku: product.sku,
            name: product.name,
            description: product.description,
            brand: product.brand,
            category: product.category,
            price: product.salePrice ? Number(product.salePrice) : 0,
            cost: product.costPrice ? Number(product.costPrice) : 0,
            stock: product.stockQuantity || 0,
            status: product.isActive ? 'ACTIVE' : 'INACTIVE',
            isMainProduct: product.isMainProduct,
            isLinkableProduct: product.isLinkableProduct,
            importName: product.importName,
            mainProductId: product.mainProductId,
            mainProduct: product.mainProduct,
            linkedProducts: product.linkedProducts?.map(lp => ({
                ...lp,
                price: lp.salePrice ? Number(lp.salePrice) : 0,
            })) || [],
            linkedAt: product.linkedAt,
            deletedAt: product.deletedAt,
            tenantId: product.tenantId,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            model: product.model,
            origin: product.origin,
            minStock: product.minStock,
            location: product.location,
            ncm: product.ncm,
            cest: product.cest,
            taxProfile: product.taxProfile,
            importType: product.importType,
            importTax: product.importTax ? Number(product.importTax) : null,
            freightCost: product.freightCost ? Number(product.freightCost) : null,
            images: product.images || [],
            hasVariants: product.hasVariants,
            hasImei: product.hasImei,
            profitMargin: product.profitMargin ? Number(product.profitMargin) : 0,
            variants: product.variants || [],
            imeis: product.imeis || [],
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map