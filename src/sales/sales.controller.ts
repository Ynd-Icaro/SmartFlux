import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto, UpdateSaleDto } from './dto/create-sale.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.SELLER)
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.SELLER)
  async create(@CurrentUser() user: any, @Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(user.tenantId, createSaleDto, user.id);
  }

  @Get()
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.SELLER)
  async findAll(@CurrentUser() user: any, @Query('skip') skip?: string, @Query('take') take?: string) {
    return this.salesService.findAll(user.tenantId, parseInt(skip || '0'), parseInt(take || '20'));
  }

  @Get('stats/daily')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async getDailySales(@CurrentUser() user: any, @Query('date') date?: string) {
    const saleDate = date ? new Date(date) : new Date();
    return this.salesService.getDailySales(user.tenantId, saleDate);
  }

  @Get('stats/payment-methods')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async getPaymentMethodStats(@CurrentUser() user: any) {
    return this.salesService.getPaymentMethodStats(user.tenantId);
  }

  @Get('stats/period')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async getSalesStats(@CurrentUser() user: any, @Query('days') days?: string) {
    return this.salesService.getSalesStats(user.tenantId, parseInt(days || '30'));
  }

  @Get(':id')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.SELLER)
  async findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.salesService.findOne(user.tenantId, id);
  }

  @Patch(':id')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updateSaleDto: UpdateSaleDto,
  ) {
    return this.salesService.update(user.tenantId, id, updateSaleDto);
  }
}
