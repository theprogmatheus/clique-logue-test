import type { Contract } from "@/modules/contract/models/Contract.js";
import type { ContractRepository } from "@/modules/contract/repositories/ContractRepository.js";
import { prismaClient } from "@/shared/prisma/prisma.client.js";

export class ContractRepositoryImpl implements ContractRepository {

    async exists(id: string): Promise<boolean> {
        const count = await prismaClient.contract.count({ where: { id } });
        return count > 0;
    }

    async save(contract: Contract): Promise<Contract> {
        if (contract.id) {
            const result = await prismaClient.contract.update({ where: { id: contract.id }, data: contract });
            return result;
        }

        if (!(contract.name && contract.companyId && contract.code && contract.technicalRetention))
            throw new Error("The data available to create a contract is insufficient.");

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

    async findById(id: string): Promise<Contract | null> {
        const response = await prismaClient.contract.findFirst({ where: { id } });
        return response;
    }

    async findByCompany(companyId: string): Promise<Contract[]> {
        const response = await prismaClient.contract.findMany({ where: { companyId } });
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