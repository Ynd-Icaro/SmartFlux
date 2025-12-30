import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('sales')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async getSalesReport(
    @CurrentUser() user: any,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), 0, 1);
    const end = endDate ? new Date(endDate) : new Date();
    return this.reportsService.getSalesReport(user.tenantId, start, end);
  }

  @Get('inventory')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async getInventoryReport(@CurrentUser() user: any) {
    return this.reportsService.getInventoryReport(user.tenantId);
  }

  @Get('products')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async getProductPerformance(@CurrentUser() user: any) {
    return this.reportsService.getProductPerformance(user.tenantId);
  }

  @Get('customers')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async getCustomerAnalysis(@CurrentUser() user: any) {
    return this.reportsService.getCustomerAnalysis(user.tenantId);
  }

  @Get('service-orders')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async getServiceOrderStats(@CurrentUser() user: any) {
    return this.reportsService.getServiceOrderStats(user.tenantId);
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
    return this.reportsService.getTaxReport(user.tenantId, start, end);
  }
}
