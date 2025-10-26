export class Contract {

    public id?: string;
    public companyId?: string;
    public name?: string;
    public code?: string;
    public technicalRetention?: number;

    constructor(contract: Contract) {
        Object.assign(this, contract);
    }
}