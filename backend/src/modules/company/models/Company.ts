export class Company {

    public id?: string;
    public cnpj?: string;
    public name?: string;
    public comercialName?: string;

    constructor(comapny: Partial<Company>) {
        Object.assign(this, comapny);
    }
}