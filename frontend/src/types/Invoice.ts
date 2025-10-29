export interface Invoice {
    id: string;
    contractId: string;
    code: string;
    issueDate: Date
    dueDate: Date
    value: number;
    withholdingTaxes: boolean;
    issqnTax: number | null;
    irrfTax: number | null;
    csllTax: number | null;
    cofinsTax: number | null;
    inssTax: number | null;
    pisTax: number | null;
    technicalRetention: boolean;
    technicalRetentionPercent: number | null;
}

export interface InvoiceFormSchema extends Invoice {
    attachment: File[];
}