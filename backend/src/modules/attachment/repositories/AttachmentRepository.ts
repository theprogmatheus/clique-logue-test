import type { Attachment } from "@/modules/attachment/models/Attachment.js";

export interface AttachmentRepository {

    save(attachment: Attachment): Promise<Attachment>;
    delete(id: string): Promise<boolean>;
    findById(id: string): Promise<Attachment | null>;
    findByInvoiceId(invoiceId: string): Promise<Attachment[]>;
}