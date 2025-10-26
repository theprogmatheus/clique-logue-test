import type { CompanyRepository } from "@/modules/company/repositories/CompanyRepository.js";
import type { Contract } from "@/modules/contract/models/Contract.js";
import type { ContractRepository } from "@/modules/contract/repositories/ContractRepository.js";
import { cleanCNPJ } from "@/shared/utils/CNPJUtils.js";

export class ContractService {

    contractRepository: ContractRepository;
    companyRepository: CompanyRepository;

    constructor(contractRepository: ContractRepository, companyRepository: CompanyRepository) {
        this.contractRepository = contractRepository;
        this.companyRepository = companyRepository;
    }

    async newContract(contract: Contract): Promise<Contract | string> {
        if (!(contract.companyId && contract.name && contract.code && contract.technicalRetention))
            return "Insufficient data to create a new contract.";

        if (contract.id)
            return "You should not provide an ID when creating a new contract.";

        const existsCompany = await this.companyRepository.existsById(contract.companyId);

        if (!existsCompany)
            return "Company not found.";

        const result = await this.contractRepository.save(contract);
        return result;
    }

    async updateContract(contract: Contract): Promise<Contract | string> {
        if (!contract.id)
            return "You need to provide the ID of the contract to be updated.";

        if (contract.companyId)
            return "The company associated with this contract cannot be changed.";

        const existsContract = await this.contractRepository.exists(contract.id);
        if (!existsContract)
            return "The contract specified does not exist.";

        const result = await this.contractRepository.save(contract);
        return result;
    }

    async deleteContract(contractId: string): Promise<boolean> {
        const result = await this.contractRepository.delete(contractId);
        return result;
    }

    async listContractsByCNPJ(cnpj: string): Promise<Contract[]> {
        const company = await this.companyRepository.findByCNPJ(cleanCNPJ(cnpj));

        if (!company?.id)
            return [];

        const contracts = await this.contractRepository.findByCompany(company.id);
        return contracts;
    }

    async getContract(contractId: string): Promise<Contract | null> {
        const contract = await this.contractRepository.findById(contractId);
        return contract;
    }

}