import type { Company } from "@/modules/company/models/Company.js";
import type { CompanyRepository } from "@/modules/company/repositories/CompanyRepository.js";

export class CompanyService {

    companyRepository: CompanyRepository;

    constructor(companyRepository: CompanyRepository) {
        this.companyRepository = companyRepository;
    }

    async getCompanyById(id: string): Promise<Company | null> {
        const result = await this.companyRepository.findById(id);
        return result;
    }

    async getCompanyByCNPJ(cnpj: string): Promise<Company | null> {
        const result = await this.companyRepository.findByCNPJ(cnpj);
        return result;
    }

    async registerCompany(body: Partial<Company>): Promise<Company | string> {
        if (body.id)
            return "The ID field must be empty to register the company.";

        try {
            const result = await this.companyRepository.save(body);
            return result;
        } catch (err: any) {
            return err.message;
        }
    }

    async updateCompany(body: Partial<Company>): Promise<Company | null> {
        if (!body.id)
            return null;

        const result = await this.companyRepository.save(body);
        return result;
    }

    async deleteCompany(companyId: string): Promise<boolean> {
        const result = await this.companyRepository.delete(companyId);
        return result;
    }

}