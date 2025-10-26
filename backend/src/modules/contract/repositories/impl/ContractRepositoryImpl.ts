import type { Contract } from "@/modules/contract/models/Contract.js";
import type { ContractRepository } from "@/modules/contract/repositories/ContractRepository.js";
import { prismaClient } from "@/shared/prisma/prisma.client.js";
import { cleanCNPJ } from "@/shared/utils/CNPJUtils.js";

export class ContractRepositoryImpl implements ContractRepository {

    async save(contract: Contract): Promise<Contract> {
        if (contract.id) {
            const contracts = await prismaClient.contract.count({ where: { id: contract.id } });
            if (contracts <= 0)
                throw new Error("The specified contract was not found.");

            const result = await prismaClient.contract.update({ where: { id: contract.id }, data: contract });
            return result;
        }

        if (!(contract.name && contract.companyId && contract.code && contract.technicalRetention))
            throw new Error("The data available to create a contract is insufficient.");

        const companies = await prismaClient.company.count({ where: { id: contract.companyId } });

        if (companies <= 0)
            throw new Error("The company ID provided is not valid.");

        const result = await prismaClient.contract.create({
            data: {
                companyId: contract.companyId,
                name: contract.name,
                code: contract.code,
                technicalRetention: contract.technicalRetention,
            }
        });

        return result;
    }

    async findById(id: string): Promise<Contract> {
        const response = await prismaClient.contract.findFirst({ where: { id } });
        if (response)
            return response;

        throw new Error("Contract not found.");
    }

    async findByCompany(companyCNPJ: string): Promise<Contract[]> {
        const company = await prismaClient.company.findFirst({ where: { cnpj: cleanCNPJ(companyCNPJ) } });
        if (!company)
            return [];

        const response = await prismaClient.contract.findMany({ where: { companyId: company.id } });
        return response;
    }

    async delete(id: string): Promise<boolean> {
        const contracts = await prismaClient.contract.count({ where: { id } });
        if (contracts <= 0)
            return false;

        await prismaClient.contract.delete({ where: { id } });
        return true;
    }

}