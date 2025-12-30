import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateDocumentDto, UpdateDocumentDto } from './dto/create-document.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, createDocumentDto: CreateDocumentDto) {
    try {
      const { customerId, deviceId, saleId, serviceOrderId, documentType, ...data } = createDocumentDto;
      const document = await this.prisma.documentFile.create({
        data: {
          ...data,
          documentType: documentType as any,
          tenant: {
            connect: { id: tenantId },
          },
          ...(customerId && {
            customer: { connect: { id: customerId } },
          }),
          ...(deviceId && {
            device: { connect: { id: deviceId } },
          }),
          ...(saleId && {
            sale: { connect: { id: saleId } },
          }),
          ...(serviceOrderId && {
            serviceOrder: { connect: { id: serviceOrderId } },
          }),
        },
      });
      return document;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Erro ao criar documento');
      }
      throw error;
    }
  }

  async findAll(tenantId: string, filters?: any) {
    const where: any = { tenantId };

    if (filters?.documentType) {
      where.documentType = filters.documentType;
    }

    if (filters?.customerId) {
      where.customerId = filters.customerId;
    }

    if (filters?.deviceId) {
      where.deviceId = filters.deviceId;
    }

    if (filters?.saleId) {
      where.saleId = filters.saleId;
    }

    if (filters?.serviceOrderId) {
      where.serviceOrderId = filters.serviceOrderId;
    }

    return this.prisma.documentFile.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: filters?.take || 50,
      skip: filters?.skip || 0,
    });
  }

  async findById(tenantId: string, id: string) {
    const document = await this.prisma.documentFile.findFirst({
      where: { id, tenantId },
    });

    if (!document) {
      throw new NotFoundException('Documento não encontrado');
    }

    return document;
  }

  async findByCustomerId(tenantId: string, customerId: string) {
    return this.prisma.documentFile.findMany({
      where: { tenantId, customerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByDeviceId(tenantId: string, deviceId: string) {
    return this.prisma.documentFile.findMany({
      where: { tenantId, deviceId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySaleId(tenantId: string, saleId: string) {
    return this.prisma.documentFile.findMany({
      where: { tenantId, saleId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByServiceOrderId(tenantId: string, serviceOrderId: string) {
    return this.prisma.documentFile.findMany({
      where: { tenantId, serviceOrderId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(
    tenantId: string,
    id: string,
    updateDocumentDto: UpdateDocumentDto,
  ) {
    const document = await this.findById(tenantId, id);

    return this.prisma.documentFile.update({
      where: { id },
      data: updateDocumentDto,
    });
  }

  async delete(tenantId: string, id: string) {
    const document = await this.findById(tenantId, id);

    await this.prisma.documentFile.delete({
      where: { id },
    });

    return { message: 'Documento deletado com sucesso' };
  }

  async count(tenantId: string, filters?: any) {
    const where: any = { tenantId };

    if (filters?.documentType) {
      where.documentType = filters.documentType;
    }

    return this.prisma.documentFile.count({ where });
  }
}
