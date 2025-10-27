import type { FastifyInstance } from "fastify";
import { invoiceController } from "@/modules/invoice/configs/container.js";

export async function routes(app: FastifyInstance) {
    app.get("/invoices/contract/:contractId", (req, rep) => invoiceController.getInvoicesByContract(req, rep));
    app.get("/invoices/:id", (req, rep) => invoiceController.getInvoice(req, rep));
    app.post("/invoices", (req, rep) => invoiceController.createInvoice(req, rep));
    app.put("/invoices/:id", (req, rep) => invoiceController.updateInvoice(req, rep));
    app.delete("/invoices/:id", (req, rep) => invoiceController.deleteInvoice(req, rep));
}