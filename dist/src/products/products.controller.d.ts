import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(user: any, createProductDto: CreateProductDto): Promise<any>;
    findAll(user: any, skip?: string, take?: string): Promise<{
        data: any[];
        total: number;
        skip: number;
        take: number;
    }>;
    search(user: any, query: string): Promise<({
        linkedProducts: {
            id: string;
            name: string;
            importName: string;
        }[];
        variants: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            sku: string;
            costPrice: import("@prisma/client/runtime/library").Decimal;
            salePrice: import("@prisma/client/runtime/library").Decimal;
            stockQuantity: number;
            productId: string;
            color: string | null;
            storage: string | null;
            condition: import(".prisma/client").$Enums.ProductCondition;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        isActive: boolean;
        sku: string;
        brand: string;
        model: string;
        category: import(".prisma/client").$Enums.ProductCategory;
        costPrice: import("@prisma/client/runtime/library").Decimal;
        salePrice: import("@prisma/client/runtime/library").Decimal;
        profitMargin: import("@prisma/client/runtime/library").Decimal;
        stockQuantity: number;
        minStock: number;
        location: string | null;
        ncm: string | null;
        cest: string | null;
        origin: import(".prisma/client").$Enums.ProductOrigin;
        taxProfile: string | null;
        importType: import(".prisma/client").$Enums.ImportType | null;
        importTax: import("@prisma/client/runtime/library").Decimal | null;
        freightCost: import("@prisma/client/runtime/library").Decimal | null;
        images: string[];
        hasVariants: boolean;
        hasImei: boolean;
        isMainProduct: boolean;
        isLinkableProduct: boolean;
        importName: string | null;
        linkedAt: Date | null;
        deletedAt: Date | null;
        mainProductId: string | null;
    })[]>;
    getStats(user: any): Promise<{
        totalProducts: number;
        mainProducts: number;
        linkedProducts: number;
        totalVariants: number;
        totalInventory: number;
    }>;
    findOne(user: any, id: string): Promise<any>;
    update(user: any, id: string, updateProductDto: UpdateProductDto): Promise<any>;
    remove(user: any, id: string): Promise<{
        linkedProducts: {
            id: string;
            name: string;
        }[];
        variants: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            sku: string;
            costPrice: import("@prisma/client/runtime/library").Decimal;
            salePrice: import("@prisma/client/runtime/library").Decimal;
            stockQuantity: number;
            productId: string;
            color: string | null;
            storage: string | null;
            condition: import(".prisma/client").$Enums.ProductCondition;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        isActive: boolean;
        sku: string;
        brand: string;
        model: string;
        category: import(".prisma/client").$Enums.ProductCategory;
        costPrice: import("@prisma/client/runtime/library").Decimal;
        salePrice: import("@prisma/client/runtime/library").Decimal;
        profitMargin: import("@prisma/client/runtime/library").Decimal;
        stockQuantity: number;
        minStock: number;
        location: string | null;
        ncm: string | null;
        cest: string | null;
        origin: import(".prisma/client").$Enums.ProductOrigin;
        taxProfile: string | null;
        importType: import(".prisma/client").$Enums.ImportType | null;
        importTax: import("@prisma/client/runtime/library").Decimal | null;
        freightCost: import("@prisma/client/runtime/library").Decimal | null;
        images: string[];
        hasVariants: boolean;
        hasImei: boolean;
        isMainProduct: boolean;
        isLinkableProduct: boolean;
        importName: string | null;
        linkedAt: Date | null;
        deletedAt: Date | null;
        mainProductId: string | null;
    }>;
}
