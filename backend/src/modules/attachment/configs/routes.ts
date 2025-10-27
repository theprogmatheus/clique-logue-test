import { attachmentController } from "@/modules/attachment/configs/container.js";
import type { FastifyInstance } from "fastify";

export async function routes(app: FastifyInstance) {
    app.get("/attachments/invoice/:invoiceId", (rep, req) => attachmentController.getInvoiceAttachments(rep, req));
    app.get("/attachments/:id", (rep, req) => attachmentController.getAttachment(rep, req));
    app.post("/attachments/:invoiceId", (req, rep) => attachmentController.createAttachment(req, rep));
    app.delete("/attachments/:id", (req, rep) => attachmentController.deleteAttachment(req, rep));
}