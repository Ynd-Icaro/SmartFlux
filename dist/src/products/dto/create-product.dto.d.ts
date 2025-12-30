import { ProductCategory, ProductOrigin, ImportType } from '@prisma/client';
export declare class CreateProductVariantDto {
    color: string;
    storage: string;
    price: number;
    cost: number;
    quantity: number;
    sku?: string;
}
export declare class CreateProductDto {
    name: string;
    description?: string;
    brand?: string;
    category?: ProductCategory;
    basePrice: number;
    baseCost: number;
    taxRate?: number;
    stock?: number;
    minStock?: number;
    location?: string;
    ncm?: string;
    cest?: string;
    taxProfile?: string;
    origin?: ProductOrigin;
    importType?: ImportType;
    importTax?: number;
    freightCost?: number;
    images?: string[];
    isActive?: boolean;
    hasVariants?: boolean;
    hasImei?: boolean;
    isMainProduct?: boolean;
    isLinkableProduct?: boolean;
    importName?: string;
    mainProductId?: string;
    sku?: string;
    model?: string;
    variants?: CreateProductVariantDto[];
}
