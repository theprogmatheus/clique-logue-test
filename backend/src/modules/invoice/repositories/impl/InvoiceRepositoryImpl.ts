import { Invoice } from "@/modules/invoice/models/Invoice.js";
import type { InvoiceRepository } from "@/modules/invoice/repositories/InvoiceRepository.js";
import { prismaClient } from "@/shared/prisma/prisma.client.js";

export class InvoiceRepositoryImpl implements InvoiceRepository {


    async exists(id: string): Promise<boolean> {
        const result = await prismaClient.invoice.count({ where: { id } });
        return result > 0;
    }

    async save(invoice: Invoice): Promise<Invoice> {
        if (invoice.id) {
            const result = await prismaClient.invoice.update({ where: { id: invoice.id }, data: invoice });
            return result;
        }

        if (!(invoice.contractId !== undefined &&
            invoice.code !== undefined && invoice.issueDate !== undefined
            && invoice.dueDate !== undefined && invoice.value !== undefined
            && invoice.withholdingTaxes !== undefined && invoice.technicalRetention !== undefined)) {
            throw new Error("The data available to create a invoice is insufficient.");
        }

        const result = await prismaClient.invoice.create({
            data: {
                contractId: invoice.contractId,
                code: invoice.code,
                issueDate: invoice.issueDate,
                dueDate: invoice.dueDate,
                value: invoice.value,
                withholdingTaxes: invoice.withholdingTaxes,
                issqnTax: invoice.issqnTax,
                irrfTax: invoice.irrfTax,
                csllTax: invoice.csllTax,
                cofinsTax: invoice.cofinsTax,
                inssTax: invoice.inssTax,
                pisTax: invoice.pisTax,
                technicalRetention: invoice.technicalRetention,
                technicalRetentionPercent: invoice.technicalRetentionPercent,
            }
        });

        return result;
    }


    async delete(id: string): Promise<boolean> {
        const invoices = await prismaClient.invoice.count({ where: { id } });
        if (invoices <= 0)
            return false;

        await prismaClient.invoice.delete({ where: { id } });
        return true;
    }

    async findByContractId(contractId: string): Promise<Invoice[]> {
        const result = await prismaClient.invoice.findMany({ where: { contractId } });
        return result;
    }

    async findById(id: string): Promise<Invoice | null> {
        const result = await prismaClient.invoice.findFirst({ where: { id } });
        return result;
    }


}