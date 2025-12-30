import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { ServiceOrdersService } from './service-orders.service';
import { CreateServiceOrderDto, UpdateServiceOrderDto } from './dto/create-service-order.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role, ServiceOrderStatus } from '@prisma/client';

@Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.TECHNICIAN)
@Controller('service-orders')
export class ServiceOrdersController {
  constructor(private readonly serviceOrdersService: ServiceOrdersService) {}

  @Post()
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.TECHNICIAN)
  async create(@CurrentUser() user: any, @Body() createServiceOrderDto: CreateServiceOrderDto) {
    return this.serviceOrdersService.create(user.tenantId, createServiceOrderDto, user.id);
  }

  @Get()
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.TECHNICIAN)
  async findAll(@CurrentUser() user: any, @Query('skip') skip?: string, @Query('take') take?: string) {
    return this.serviceOrdersService.findAll(
      user.tenantId,
      parseInt(skip || '0'),
      parseInt(take || '20')
    );
  }

  @Get('stats')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER)
  async getStats(@CurrentUser() user: any) {
    return this.serviceOrdersService.getStats(user.tenantId);
  }

  @Get('by-status/:status')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.TECHNICIAN)
  async getByStatus(@CurrentUser() user: any, @Param('status') status: string) {
    return this.serviceOrdersService.getByStatus(user.tenantId, status as ServiceOrderStatus);
  }

  @Get(':id')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.TECHNICIAN)
  async findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.serviceOrdersService.findOne(user.tenantId, id);
  }

  @Patch(':id')
  @Auth(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.TECHNICIAN)
  async update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updateServiceOrderDto: UpdateServiceOrderDto,
  ) {
    return this.serviceOrdersService.update(user.tenantId, id, updateServiceOrderDto);
  }
}
