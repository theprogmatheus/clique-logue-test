import { Attachment } from "@/modules/attachment/models/Attachment.js";
import type { AttachmentRepository } from "@/modules/attachment/repositories/AttachmentRepository.js";
import type { InvoiceRepository } from "@/modules/invoice/repositories/InvoiceRepository.js";
import fs from "fs";
import path from "path";

export class AttachmentService {

    attachmentRepository: AttachmentRepository;
    invoiceRepository: InvoiceRepository;

    constructor(attachmentRepository: AttachmentRepository, invoiceRepository: InvoiceRepository) {
        this.attachmentRepository = attachmentRepository;
        this.invoiceRepository = invoiceRepository;
    }

    async getAttachment(attachmentId: string): Promise<Attachment | null> {
        const attachment = await this.attachmentRepository.findById(attachmentId);
        return attachment;
    }

    async getAttachmentsByInvoiceId(invoiceId: string): Promise<Attachment[]> {
        const result = await this.attachmentRepository.findByInvoiceId(invoiceId);
        return result;
    }

    async upload(file: any, invoiceId: string): Promise<Attachment | string> {
        try {
            const invoice = await this.invoiceRepository.exists(invoiceId);
            if (!invoice)
                return "Invoice not found.";

            const uploadDir = path.resolve("uploads");
            const fileName = `${Date.now()}-${file.filename}`;
            const filePath = path.join(uploadDir, fileName);

            const attachment = await this.attachmentRepository.save({
                invoiceId,
                name: file.filename,
                path: filePath,
                size: file.file.bytesRead,
            });

            await fs.promises.writeFile(filePath, await file.toBuffer());

            return attachment;
        } catch (err: any) {
            return err.message;
        }
    }

    async delete(attachmentId: string): Promise<boolean> {
        try {
            const attachment = await this.attachmentRepository.findById(attachmentId);
            if (!attachment)
                return false;

            const result = await this.attachmentRepository.delete(attachmentId);
            if (!result)
                return false;

            await fs.promises.unlink(attachment.path!);
            return true;
        } catch (err: any) {
            return false;
        }
    }


}