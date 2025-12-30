import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto, UpdateDocumentDto } from './dto/create-document.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CurrentTenant } from '../auth/decorators/current-tenant.decorator';

@UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  create(
    @CurrentTenant() tenantId: string,
    @Body() createDocumentDto: CreateDocumentDto,
  ) {
    return this.documentsService.create(tenantId, createDocumentDto);
  }

  @Get()
  findAll(
    @CurrentTenant() tenantId: string,
    @Query('documentType') documentType?: string,
    @Query('customerId') customerId?: string,
    @Query('deviceId') deviceId?: string,
    @Query('saleId') saleId?: string,
    @Query('serviceOrderId') serviceOrderId?: string,
    @Query('take') take?: string,
    @Query('skip') skip?: string,
  ) {
    const filters = {
      documentType,
      customerId,
      deviceId,
      saleId,
      serviceOrderId,
      take: take ? parseInt(take) : 50,
      skip: skip ? parseInt(skip) : 0,
    };

    return this.documentsService.findAll(tenantId, filters);
  }

  @Get('customer/:customerId')
  findByCustomerId(
    @CurrentTenant() tenantId: string,
    @Param('customerId') customerId: string,
  ) {
    return this.documentsService.findByCustomerId(tenantId, customerId);
  }

  @Get('device/:deviceId')
  findByDeviceId(
    @CurrentTenant() tenantId: string,
    @Param('deviceId') deviceId: string,
  ) {
    return this.documentsService.findByDeviceId(tenantId, deviceId);
  }

  @Get('sale/:saleId')
  findBySaleId(
    @CurrentTenant() tenantId: string,
    @Param('saleId') saleId: string,
  ) {
    return this.documentsService.findBySaleId(tenantId, saleId);
  }

  @Get('service-order/:serviceOrderId')
  findByServiceOrderId(
    @CurrentTenant() tenantId: string,
    @Param('serviceOrderId') serviceOrderId: string,
  ) {
    return this.documentsService.findByServiceOrderId(
      tenantId,
      serviceOrderId,
    );
  }

  @Get(':id')
  findOne(
    @CurrentTenant() tenantId: string,
    @Param('id') id: string,
  ) {
    return this.documentsService.findById(tenantId, id);
  }

  @Patch(':id')
  update(
    @CurrentTenant() tenantId: string,
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(tenantId, id, updateDocumentDto);
  }

  @Delete(':id')
  remove(
    @CurrentTenant() tenantId: string,
    @Param('id') id: string,
  ) {
    return this.documentsService.delete(tenantId, id);
  }
}
