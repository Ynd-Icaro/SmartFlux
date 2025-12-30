import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { CreateReceivableDto, CreateExpenseDto, UpdateReceivableDto, UpdateExpenseDto } from './dto/create-financial.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Auth(Role.OWNER, Role.ADMIN, Role.ACCOUNTANT)
@Controller('financial')
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  // RECEIVABLES
  @Post('receivables')
  @Auth(Role.OWNER, Role.ADMIN, Role.ACCOUNTANT)
  async createReceivable(@CurrentUser() user: any, @Body() createReceivableDto: CreateReceivableDto) {
    return this.financialService.createReceivable(user.tenantId, createReceivableDto);
  }

  @Get('receivables')
  @Auth(Role.OWNER, Role.ADMIN, Role.ACCOUNTANT)
  async getReceivables(@CurrentUser() user: any, @Query('skip') skip?: string, @Query('take') take?: string) {
    return this.financialService.getReceivables(user.tenantId, parseInt(skip || '0'), parseInt(take || '20'));
  }

  @Get('receivables/stats')
  @Auth(Role.OWNER, Role.ADMIN)
  async getReceivableStats(@CurrentUser() user: any) {
    return this.financialService.getReceivableStats(user.tenantId);
  }

  @Patch('receivables/:id')
  @Auth(Role.OWNER, Role.ADMIN, Role.ACCOUNTANT)
  async updateReceivable(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updateReceivableDto: UpdateReceivableDto,
  ) {
    return this.financialService.updateReceivable(user.tenantId, id, updateReceivableDto);
  }

  // EXPENSES
  @Post('expenses')
  @Auth(Role.OWNER, Role.ADMIN, Role.ACCOUNTANT)
  async createExpense(@CurrentUser() user: any, @Body() createExpenseDto: CreateExpenseDto) {
    return this.financialService.createExpense(user.tenantId, createExpenseDto);
  }

  @Get('expenses')
  @Auth(Role.OWNER, Role.ADMIN, Role.ACCOUNTANT)
  async getExpenses(@CurrentUser() user: any, @Query('skip') skip?: string, @Query('take') take?: string) {
    return this.financialService.getExpenses(user.tenantId, parseInt(skip || '0'), parseInt(take || '20'));
  }

  @Get('expenses/stats')
  @Auth(Role.OWNER, Role.ADMIN)
  async getExpenseStats(@CurrentUser() user: any) {
    return this.financialService.getExpenseStats(user.tenantId);
  }

  @Patch('expenses/:id')
  @Auth(Role.OWNER, Role.ADMIN, Role.ACCOUNTANT)
  async updateExpense(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.financialService.updateExpense(user.tenantId, id, updateExpenseDto);
  }

  // CASH FLOW
  @Get('cash-flow')
  @Auth(Role.OWNER, Role.ADMIN, Role.ACCOUNTANT)
  async getCashFlow(@CurrentUser() user: any, @Query('days') days?: string) {
    return this.financialService.getCashFlow(user.tenantId, parseInt(days || '30'));
  }

  // DRE
  @Get('dre')
  @Auth(Role.OWNER, Role.ADMIN)
  async getDRE(
    @CurrentUser() user: any,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), 0, 1);
    const end = endDate ? new Date(endDate) : new Date();
    return this.financialService.getDRE(user.tenantId, start, end);
  }
}
