export class Invoice {

    id?: string;
    contractId?: string;
    code?: string;
    issueDate?: Date;
    dueDate?: Date;
    value?: number;
    withholdingTaxes?: boolean;
    issqnTax?: number;
    irrfTax?: number;
    csllTax?: number;
    cofinsTax?: number;
    inssTax?: number;
    pisTax?: number;
    technicalRetention?: boolean;
    technicalRetentionPercent?: number;

    constructor(invoice: Invoice) {
        Object.assign(this, invoice);
    }

}