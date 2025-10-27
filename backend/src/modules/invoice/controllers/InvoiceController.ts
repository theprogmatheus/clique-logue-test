import type { InvoiceService } from "@/modules/invoice/services/InvoiceService.js";
import { ResponseEntity } from "@/shared/ResponseEntity.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { Invoice } from "@/modules/invoice/models/Invoice.js";

export class InvoiceController {

    invoiceService: InvoiceService;

    constructor(invoiceService: InvoiceService) {
        this.invoiceService = invoiceService;
    }

    // invoices/:id
    async getInvoice(req: FastifyRequest, rep: FastifyReply) {
        const { id } = req.params as { id: string };
        const result = await this.invoiceService.getInvoice(id);
        if (result)
            return new ResponseEntity({ status: 200, body: result }).send(rep);
        return new ResponseEntity({ status: 404, message: "Invoice not found.", body: {} }).send(rep);
    }

    // invoices/contract/:contractId
    async getInvoicesByContract(req: FastifyRequest, rep: FastifyReply) {
        const { contractId } = req.params as { contractId: string };
        const result = await this.invoiceService.getInvoicesByContract(contractId);
        return new ResponseEntity({ status: 200, body: result });
    }

    // invoices/ - POST
    async createInvoice(req: FastifyRequest, rep: FastifyReply) {
        if (!req.body)
            return new ResponseEntity({ status: 400, message: "The request body is empty.", body: {} }).send(rep);

        const result = await this.invoiceService.createInvoice(req.body as Invoice);

        if (typeof result === "string")
            return new ResponseEntity({ status: 400, message: result, body: {} }).send(rep);

        return new ResponseEntity({ status: 201, body: result }).send(rep);
    }

    // invoices/:id - PUT
    async updateInvoice(req: FastifyRequest, rep: FastifyReply) {
        if (!req.body)
            return new ResponseEntity({ status: 400, message: "Request body is empty.", body: {} }).send(rep);

        const invoice = req.body as Invoice;
        if (invoice.id)
            return new ResponseEntity({ status: 400, message: "The ID cannot be passed in the request body.", body: {} }).send(rep);

        const { id } = req.params as { id: string };
        invoice.id = id;

        const result = await this.invoiceService.updateInvoice(invoice);
        if (typeof result === "string")
            return new ResponseEntity({ status: 400, message: result, body: {} }).send(rep);

        return new ResponseEntity({ status: 200, body: result }).send(rep);
    }

    // invoices/:id - DELETE
    async deleteInvoice(req: FastifyRequest, rep: FastifyReply) {
        const { id } = req.params as { id: string };
        const result = await this.invoiceService.deleteInvoice(id);
        if (result)
            return new ResponseEntity({ status: 200, message: "Invoice deleted successfuly.", body: {} }).send(rep);

        return new ResponseEntity({ status: 204, body: {} });
    }
}