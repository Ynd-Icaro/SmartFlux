import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateTenantDto, UpdateUserDto, CreateUserDto } from './dto/update-settings.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Auth(Role.OWNER, Role.ADMIN)
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  // TENANT
  @Get('tenant')
  @Auth(Role.OWNER, Role.ADMIN)
  async getTenant(@CurrentUser() user: any) {
    return this.settingsService.getTenant(user.tenantId);
  }

  @Patch('tenant')
  @Auth(Role.OWNER)
  async updateTenant(@CurrentUser() user: any, @Body() updateTenantDto: UpdateTenantDto) {
    return this.settingsService.updateTenant(user.tenantId, updateTenantDto);
  }

  // USERS
  @Get('users')
  @Auth(Role.OWNER, Role.ADMIN)
  async getUsers(@CurrentUser() user: any) {
    return this.settingsService.getUsers(user.tenantId);
  }

  @Get('users/:userId')
  @Auth(Role.OWNER, Role.ADMIN)
  async getUser(@CurrentUser() user: any, @Param('userId') userId: string) {
    return this.settingsService.getUser(user.tenantId, userId);
  }

  @Post('users')
  @Auth(Role.OWNER, Role.ADMIN)
  async createUser(@CurrentUser() user: any, @Body() createUserDto: CreateUserDto) {
    return this.settingsService.createUser(user.tenantId, createUserDto);
  }

  @Patch('users/:userId')
  @Auth(Role.OWNER, Role.ADMIN)
  async updateUser(
    @CurrentUser() user: any,
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.settingsService.updateUser(user.tenantId, userId, updateUserDto);
  }

  @Delete('users/:userId')
  @Auth(Role.OWNER)
  async deleteUser(@CurrentUser() user: any, @Param('userId') userId: string) {
    return this.settingsService.deleteUser(user.tenantId, userId);
  }

  // AUDIT LOGS
  @Get('audit-logs')
  @Auth(Role.OWNER, Role.ADMIN)
  async getAuditLogs(@CurrentUser() user: any) {
    return this.settingsService.getAuditLogs(user.tenantId);
  }

  // EXPORT
  @Get('export')
  @Auth(Role.OWNER, Role.ADMIN)
  async exportData(@CurrentUser() user: any) {
    return this.settingsService.exportData(user.tenantId);
  }
}
