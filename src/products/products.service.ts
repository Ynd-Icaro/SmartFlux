import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, createProductDto: CreateProductDto) {
    // Transformar e validar campos numéricos
    const costPrice = this.parseDecimal(createProductDto.baseCost);
    const salePrice = this.parseDecimal(createProductDto.basePrice);

    if (costPrice === null || salePrice === null) {
      throw new Error('Valores de preço ou custo inválidos');
    }

    const profitMargin = salePrice > 0 ? ((salePrice - costPrice) / salePrice) * 100 : 0;

    const data: any = {
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

    // Transformar resposta para corresponder às expectativas do frontend
    return this.transformProduct(product);
  }

  async findAll(tenantId: string, skip = 0, take = 20) {
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

  async findOne(tenantId: string, id: string) {
    // tenantId usado para validação de contexto multi-tenant
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

  async update(tenantId: string, id: string, updateProductDto: UpdateProductDto) {
    const { variants, ...productData } = updateProductDto as any;

    // Transformar e validar campos numéricos
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

    // Calcular margem de lucro se os preços forem fornecidos
    if (productData.costPrice !== undefined && productData.salePrice !== undefined) {
      productData.profitMargin = productData.salePrice > 0 ? ((productData.salePrice - productData.costPrice) / productData.salePrice) * 100 : 0;
    }

    // Se está vinculando a um produto principal, atualiza linkedAt
    if (productData.mainProductId && productData.isLinkableProduct) {
      productData.linkedAt = new Date();
    }

    // Se desvinculou, remove linkedAt
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

  async remove(tenantId: string, id: string) {
    // Soft delete: apenas marca como deletado ao invés de remover do banco
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

  async search(tenantId: string, query: string) {
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

  async getStats(tenantId: string) {
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

  // Método auxiliar para analisar valores decimais com segurança
  private parseDecimal(value: any): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    // Se já é um número, retorna ele
    if (typeof value === 'number') {
      return isNaN(value) ? null : value;
    }

    // Se é uma string, tenta analisar
    if (typeof value === 'string') {
      // Remove símbolos de moeda e espaços
      const cleaned = value.replace(/[R$\s]/g, '').replace(',', '.');

      // Trata múltiplos separadores decimais
      const parts = cleaned.split('.');
      if (parts.length > 2) {
        // Se há múltiplos pontos, mantém apenas o último como separador decimal
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

  /**
   * Transforma produto do Prisma para formato compatível com o frontend
   * Converte valores numéricos para strings e garante consistência de dados
   */
  // Transformar produto do Prisma para formato compatível com o frontend
  private transformProduct(product: any): any {
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
      // Campos adicionais para flexibilidade
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
}
