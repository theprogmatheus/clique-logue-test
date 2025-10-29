import type { Attachment } from "@/types/Attachment";
import type { Company } from "@/types/Company";
import type { Contract } from "@/types/Contract";
import type { Invoice, InvoiceFormSchema } from "@/types/Invoice";

export default function useAPI() {

    const apiUrl = import.meta.env.VITE_API_URL;
    const endPoints = {
        companies: `${apiUrl}/companies`,
        contracts: `${apiUrl}/contracts`,
        invoices: `${apiUrl}/invoices`,
        attachments: `${apiUrl}/attachments`
    };

    //48642645000154
    async function getCompanyByCNPJ(cnpj: string): Promise<Company | null> {
        const response = await fetch(`${endPoints.companies}/cnpj/${cnpj}`);
        if (response.ok) {
            const data = await response.json();
            return data?.body || null;
        }
        return null;
    }

    async function getContractsByCompany(company: Company): Promise<Contract[]> {
        const response = await fetch(`${endPoints.contracts}/cnpj/${company.cnpj}`);
        if (response.ok) {
            const data = await response.json();
            return data?.body || [];
        }
        return [];
    }

    async function createInvoice(contract: Contract, invoiceData: Invoice): Promise<Invoice | null> {
        invoiceData.contractId = contract.id;
        invoiceData.value = invoiceData.value * 100;
        invoiceData.pisTax = (invoiceData.pisTax || 0) * 100;
        invoiceData.csllTax = (invoiceData.csllTax || 0) * 100;
        invoiceData.inssTax = (invoiceData.inssTax || 0) * 100;
        invoiceData.irrfTax = (invoiceData.irrfTax || 0) * 100;
        invoiceData.issqnTax = (invoiceData.issqnTax || 0) * 100;
        invoiceData.cofinsTax = (invoiceData.cofinsTax || 0) * 100;

        const response = await fetch(endPoints.invoices, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(invoiceData)
        });

        if (response.ok) {
            const data = await response.json();
            return data?.body || null;
        }
        return null;
    }

    async function createAttachment(invoice: Invoice, file: File): Promise<Attachment | null> {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${endPoints.attachments}/${invoice.id}`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            return data?.body || null;
        }
        return null;
    }


    async function getInvoicesByContract(contract: Contract): Promise<Invoice[]> {
        const response = await fetch(`${endPoints.invoices}/contract/${contract.id}`);
        if (response.ok) {
            const data = await response.json();
            return data?.body || [];
        }
        return [];
    }

    async function getInvoice(invoiceId: string): Promise<Invoice | null> {
        const response = await fetch(`${endPoints.invoices}/${invoiceId}`);
        if (response.ok) {
            const data = await response.json();
            return data?.body || null;
        }
        return null;
    }

    async function getContract(contractId: string): Promise<Contract | null> {
        const response = await fetch(`${endPoints.contracts}/${contractId}`);
        if (response.ok) {
            const data = await response.json();
            return data?.body || null;
        }
        return null;
    }

    async function getCompany(companyId: string): Promise<Company | null> {
        const response = await fetch(`${endPoints.companies}/${companyId}`);
        if (response.ok) {
            const data = await response.json();
            return data?.body || null;
        }
        return null;
    }




    return {
        getCompanyByCNPJ,
        getContractsByCompany,
        getInvoicesByContract,
        createInvoice,
        createAttachment,
        getInvoice,
        getContract,
        getCompany
    };
}