export class Invoice {

    public id?: string;
    public contractId?: string;
    public code?: string;
    public issueDate?: Date
    public dueDate?: Date
    public value?: number;
    public withholdingTaxes?: boolean;
    public issqnTax: number | null = null;
    public irrfTax: number | null = null;
    public csllTax: number | null = null;
    public cofinsTax: number | null = null;
    public inssTax: number | null = null;
    public pisTax: number | null = null;
    public technicalRetention?: boolean;
    public technicalRetentionPercent: number | null = null;

    constructor(invoice: Invoice) {
        Object.assign(this, invoice);
    }

}