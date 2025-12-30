import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/create-customer.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.SELLER)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.SELLER)
  async create(@CurrentUser() user: any, @Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(user.tenantId, createCustomerDto);
  }

  @Get()
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.SELLER)
  async findAll(@CurrentUser() user: any, @Query('skip') skip?: string, @Query('take') take?: string) {
    return this.customersService.findAll(user.tenantId, parseInt(skip || '0'), parseInt(take || '20'));
  }

  @Get('search/:query')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.SELLER)
  async search(@CurrentUser() user: any, @Param('query') query: string) {
    return this.customersService.search(user.tenantId, query);
  }

  @Get('stats')
  @Auth(Role.OWNER, Role.ADMIN)
  async getStats(@CurrentUser() user: any) {
    return this.customersService.getStats(user.tenantId);
  }

  @Get(':id')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.SELLER)
  async findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.customersService.findOne(user.tenantId, id);
  }

  @Patch(':id')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.SELLER)
  async update(@CurrentUser() user: any, @Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(user.tenantId, id, updateCustomerDto);
  }

  @Delete(':id')
  @Auth(Role.OWNER, Role.ADMIN)
  async remove(@CurrentUser() user: any, @Param('id') id: string) {
    return this.customersService.remove(user.tenantId, id);
  }
}
