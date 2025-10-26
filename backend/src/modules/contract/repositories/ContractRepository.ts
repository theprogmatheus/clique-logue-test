import type { Contract } from "@/modules/contract/models/Contract.js";

export interface ContractRepository {

    save(contract: Contract): Promise<Contract>;
    findById(id: string): Promise<Contract>;
    findByCompany(companyCNPJ: string): Promise<Contract[]>;
    delete(id: string): Promise<boolean>;

}