import type { Company } from "@/modules/company/models/Company.js";
import type { CompanyRepository } from "@/modules/company/repositories/CompanyRepository.js";
import { cleanCNPJ, validateCNPJ } from "@/shared/utils/CNPJUtils.js";

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
        cnpj = cleanCNPJ(cnpj);
        const result = await this.companyRepository.findByCNPJ(cnpj);
        return result;
    }

    async registerCompany(body: Partial<Company>): Promise<Company | string> {
        if (body.id)
            return "The ID field must be empty to register the company.";

        if (!body.cnpj)
            return "You need to provide a CNPJ number to register the company.";

        if (!body.name)
            return "You need to provide a name to register the company.";

        if (!body.comercialName)
            return "You need to provide a comercial name to register the company";

        body.cnpj = cleanCNPJ(body.cnpj);

        if (!validateCNPJ(body.cnpj))
            return "Invalid CNPJ! To register a company, you need a valid CNPJ.";

        const alreadyRegistered = await this.companyRepository.existsByCNPJ(body.cnpj);

        if (alreadyRegistered)
            return "There is already a company registered with this CNPJ.";

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