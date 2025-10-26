import type { Attachment } from "@/modules/invoice/models/Attachment.js";
import type { AttachmentRepository } from "@/modules/invoice/repositories/AttachmentRepository.js";
import { prismaClient } from "@/shared/prisma/prisma.client.js";

export class AttachmentRepositoryImpl implements AttachmentRepository {
    save(attachment: Attachment): Promise<Attachment> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Attachment | null> {
        throw new Error("Method not implemented.");
    }
    findByInvoiceId(invoiceId: string): Promise<Attachment[]> {
        throw new Error("Method not implemented.");
    }

}