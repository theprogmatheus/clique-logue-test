import { Company } from "@/modules/company/models/Company.js";
import type { CompanyRepository } from "@/modules/company/repositories/CompanyRepository.js";
import { prismaClient } from "@/shared/prisma/prisma.client.js";

export class CompanyRepositoryImpl implements CompanyRepository {

    async existsById(id: string): Promise<boolean> {
        const count = await prismaClient.company.count({ where: { id } });
        return count > 0;
    }

    async existsByCNPJ(cnpj: string): Promise<boolean> {
        const count = await prismaClient.company.count({ where: { cnpj } });
        return count > 0;
    }

    async findById(id: string): Promise<Company | null> {
        const result = await prismaClient.company.findFirst({ where: { id } });
        if (!result) return null;
        return new Company(result);
    }


    async findByCNPJ(cnpj: string): Promise<Company | null> {
        const result = await prismaClient.company.findFirst({ where: { cnpj } });
        if (!result) return null;
        return new Company(result);
    }


    async save(company: Company): Promise<Company> {

        if (company.id) {
            const result = await prismaClient.company.update({ where: { id: company.id }, data: company });
            return new Company(result);
        }

        if (!(company.cnpj && company.name && company.comercialName))
            throw new Error("The data available to create a company is insufficient.");

        const result = await prismaClient.company.create(
            {
                data: {
                    cnpj: company.cnpj,
                    name: company.name,
                    comercialName: company.comercialName
                }
            }
        );

        return new Company(result);
    }


    async delete(companyId: string): Promise<boolean> {
        const count = await prismaClient.company.count({ where: { id: companyId } });
        if (count <= 0)
            return false;

        await prismaClient.company.delete({ where: { id: companyId } });
        return true;
    }


}