import type { ContractRepository } from "@/modules/contract/repositories/ContractRepository.js";
import type { Invoice } from "@/modules/invoice/models/Invoice.js";
import type { InvoiceRepository } from "@/modules/invoice/repositories/InvoiceRepository.js";

export class InvoiceService {

    invoiceRepository: InvoiceRepository;
    contractRepository: ContractRepository;

    constructor(invoiceRepository: InvoiceRepository, contractRepository: ContractRepository) {
        this.invoiceRepository = invoiceRepository;
        this.contractRepository = contractRepository;
    }

    async createInvoice(invoice: Invoice): Promise<Invoice | string> {
        try {
            if (!invoice.contractId)
                return "You need to provide a contract to create an invoice.";

            const existsContract = await this.contractRepository.exists(invoice.contractId);
            if (!existsContract)
                return "Contract not found.";

            const result = await this.invoiceRepository.save(invoice);
            return result;
        } catch (err: any) {
            return err.message;
        }
    }

    async updateInvoice(invoice: Invoice): Promise<Invoice | string> {
        try {
            if (!invoice.id)
                return "You need to specify the invoice you want to update.";

            const existsInvoice = await this.invoiceRepository.exists(invoice.id);
            if (!existsInvoice)
                return "Invoice not found.";

            const result = await this.invoiceRepository.save(invoice);
            return result;
        } catch (err: any) {
            return err.message;
        }
    }

    async getInvoice(invoiceId: string): Promise<Invoice | null> {
        const result = await this.invoiceRepository.findById(invoiceId);
        return result;
    }

    async getInvoicesByContract(contractId: string): Promise<Invoice[]> {
        const result = await this.invoiceRepository.findByContractId(contractId);
        return result;
    }

    async deleteInvoice(invoiceId: string): Promise<boolean> {
        const result = await this.invoiceRepository.delete(invoiceId);
        return result;
    }


}