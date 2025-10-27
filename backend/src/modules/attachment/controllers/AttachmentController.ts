import type { AttachmentService } from "@/modules/attachment/services/AttachmentService.js";
import { ResponseEntity } from "@/shared/ResponseEntity.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";

export class AttachmentController {

    attachmentService: AttachmentService;
    constructor(attachmentService: AttachmentService) {
        this.attachmentService = attachmentService;
    }

    // /attachments/:id
    async getAttachment(req: FastifyRequest, rep: FastifyReply) {
        const { id } = req.params as { id: string };

        const attachment = await this.attachmentService.getAttachment(id);
        if (!attachment)
            return new ResponseEntity({ status: 404, message: "Attachment not found.", body: {} }).send(rep);

        rep.header("Content-Disposition", `attachment; filename=${attachment.name}`);
        return rep.send(fs.createReadStream(attachment.path!));
    }

    // /attachments/invoice/:invoiceId
    async getInvoiceAttachments(req: FastifyRequest, rep: FastifyReply) {
        const { invoiceId } = req.params as { invoiceId: string };
        const attachments = await this.attachmentService.getAttachmentsByInvoiceId(invoiceId);
        return new ResponseEntity({ status: 200, body: attachments }).send(rep);
    }

    // /attachments/:invoiceId - POST
    async createAttachment(req: FastifyRequest, rep: FastifyReply) {
        const data = await req.file();
        const { invoiceId } = req.params as { invoiceId: string };

        const result = await this.attachmentService.upload(data, invoiceId);

        if (typeof result === "string")
            return new ResponseEntity({ status: 400, message: result, body: {} }).send(rep);

        return new ResponseEntity({ status: 201, body: result }).send(rep);
    }

    // /attachments/:id - DELETE
    async deleteAttachment(req: FastifyRequest, rep: FastifyReply) {
        const { id } = req.params as { id: string };
        const result = await this.attachmentService.delete(id);
        if (result)
            return new ResponseEntity({ status: 200, message: "Attachment deleted successfully", body: {} }).send(rep);
        return new ResponseEntity({ status: 204, body: {} }).send(rep);
    }


}