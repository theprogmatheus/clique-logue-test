export class Invoice {

    id?: string;
    contractId?: string;
    code?: string;
    issueDate?: Date
    dueDate?: Date
    value?: number;
    withholdingTaxes?: boolean;
    issqnTax: number | null = null;
    irrfTax: number | null = null;
    csllTax: number | null = null;
    cofinsTax: number | null = null;
    inssTax: number | null = null;
    pisTax: number | null = null;
    technicalRetention?: boolean;
    technicalRetentionPercent: number | null = null;

    constructor(invoice: Invoice) {
        Object.assign(this, invoice);
    }

}