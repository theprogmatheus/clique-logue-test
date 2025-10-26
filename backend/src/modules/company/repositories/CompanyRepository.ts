import type { Company } from "@/modules/company/models/Company.js";

export interface CompanyRepository {

    findById(id: string): Promise<Company | null>;
    findByCNPJ(cnpj: string): Promise<Company | null>;
    save(company: Company): Promise<Company>;
    delete(companyId: string): Promise<boolean>;
    
}