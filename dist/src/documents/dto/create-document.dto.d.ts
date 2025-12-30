export declare class CreateDocumentDto {
    fileName: string;
    fileType: string;
    fileUrl: string;
    documentType: string;
    category?: string;
    customerId?: string;
    deviceId?: string;
    saleId?: string;
    serviceOrderId?: string;
    description?: string;
    fileSize: number;
    uploadedBy: string;
}
export declare class UpdateDocumentDto {
    description?: string;
    category?: string;
}
