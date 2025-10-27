import type { Invoice } from "@/modules/invoice/models/Invoice.js";

export interface InvoiceRepository {

    save(invoice: Invoice): Promise<Invoice>;
    delete(id: string): Promise<boolean>;
    findByContractId(contractId: string): Promise<Invoice[]>;
    findById(id: string): Promise<Invoice | null>;
    exists(id: string): Promise<boolean>;

}