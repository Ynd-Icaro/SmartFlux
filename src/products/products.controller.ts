import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async create(@CurrentUser() user: any, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(user.tenantId, createProductDto);
  }

  @Get()
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.SELLER)
  async findAll(@CurrentUser() user: any, @Query('skip') skip?: string, @Query('take') take?: string) {
    return this.productsService.findAll(user.tenantId, parseInt(skip || '0'), parseInt(take || '20'));
  }

  @Get('search/:query')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.SELLER)
  async search(@CurrentUser() user: any, @Param('query') query: string) {
    return this.productsService.search(user.tenantId, query);
  }

  @Get('stats')
  @Auth(Role.OWNER, Role.ADMIN)
  async getStats(@CurrentUser() user: any) {
    return this.productsService.getStats(user.tenantId);
  }

  @Get(':id')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.SELLER)
  async findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.productsService.findOne(user.tenantId, id);
  }

  @Patch(':id')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async update(@CurrentUser() user: any, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(user.tenantId, id, updateProductDto);
  }

  @Delete(':id')
  @Auth(Role.OWNER, Role.ADMIN)
  async remove(@CurrentUser() user: any, @Param('id') id: string) {
    return this.productsService.remove(user.tenantId, id);
  }
}
