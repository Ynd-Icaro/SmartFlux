import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto, UpdatePurchaseDto, CreateSupplierDto, UpdateSupplierDto } from './dto/create-purchase.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  // SUPPLIERS
  @Post('suppliers')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async createSupplier(@CurrentUser() user: any, @Body() createSupplierDto: CreateSupplierDto) {
    return this.purchasesService.createSupplier(user.tenantId, createSupplierDto);
  }

  @Get('suppliers')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async getSuppliers(@CurrentUser() user: any, @Query('skip') skip?: string, @Query('take') take?: string) {
    return this.purchasesService.getSuppliers(user.tenantId, parseInt(skip || '0'), parseInt(take || '20'));
  }

  @Get('suppliers/search/:query')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async searchSuppliers(@CurrentUser() user: any, @Param('query') query: string) {
    return this.purchasesService.searchSuppliers(user.tenantId, query);
  }

  @Get('suppliers/:id')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async getSupplier(@CurrentUser() user: any, @Param('id') id: string) {
    return this.purchasesService.getSupplier(user.tenantId, id);
  }

  @Patch('suppliers/:id')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async updateSupplier(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.purchasesService.updateSupplier(user.tenantId, id, updateSupplierDto);
  }

  @Delete('suppliers/:id')
  @Auth(Role.OWNER, Role.ADMIN)
  async deleteSupplier(@CurrentUser() user: any, @Param('id') id: string) {
    return this.purchasesService.deleteSupplier(user.tenantId, id);
  }

  // PURCHASES
  @Post()
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async createPurchase(@CurrentUser() user: any, @Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchasesService.createPurchase(user.tenantId, createPurchaseDto, user.id);
  }

  @Get()
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async getPurchases(@CurrentUser() user: any, @Query('skip') skip?: string, @Query('take') take?: string) {
    return this.purchasesService.getPurchases(user.tenantId, parseInt(skip || '0'), parseInt(take || '20'));
  }

  @Get('stats')
  @Auth(Role.OWNER, Role.ADMIN)
  async getPurchaseStats(@CurrentUser() user: any) {
    return this.purchasesService.getPurchaseStats(user.tenantId);
  }

  @Get('taxes')
  @Auth(Role.OWNER, Role.ADMIN)
  async getTaxReport(
    @CurrentUser() user: any,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), 0, 1);
    const end = endDate ? new Date(endDate) : new Date();
    return this.purchasesService.getTaxReport(user.tenantId, start, end);
  }

  @Get(':id')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async getPurchase(@CurrentUser() user: any, @Param('id') id: string) {
    return this.purchasesService.getPurchase(user.tenantId, id);
  }

  @Patch(':id')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async updatePurchase(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchasesService.updatePurchase(user.tenantId, id, updatePurchaseDto);
  }
}
