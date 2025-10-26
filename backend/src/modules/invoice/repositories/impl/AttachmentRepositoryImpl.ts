import type { Attachment } from "@/modules/invoice/models/Attachment.js";
import type { AttachmentRepository } from "@/modules/invoice/repositories/AttachmentRepository.js";
import { prismaClient } from "@/shared/prisma/prisma.client.js";

export class AttachmentRepositoryImpl implements AttachmentRepository {

    async save(attachment: Attachment): Promise<Attachment> {
        if (attachment.id) {
            const result = await prismaClient.attachment.update({ where: { id: attachment.id }, data: attachment });
            return result;
        }

        if (!(attachment.invoiceId && attachment.name
            && attachment.path && attachment.size !== undefined))
            throw new Error("");

        const result = await prismaClient.attachment.create({
            data: {
                invoiceId: attachment.invoiceId,
                name: attachment.name,
                path: attachment.path,
                size: attachment.size
            }
        });
        return result;
    }

    async delete(id: string): Promise<boolean> {
        const attachments = await prismaClient.attachment.count({ where: { id } });
        if (attachments <= 0)
            return false;
        await prismaClient.attachment.delete({ where: { id } });
        return true;
    }

    async findById(id: string): Promise<Attachment | null> {
        const result = await prismaClient.attachment.findFirst({ where: { id } });
        return result;
    }

    async findByInvoiceId(invoiceId: string): Promise<Attachment[]> {
        const result = await prismaClient.attachment.findMany({ where: { invoiceId } });
        return result;
    }

}