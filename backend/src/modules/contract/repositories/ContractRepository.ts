import type { Contract } from "@/modules/contract/models/Contract.js";

export interface ContractRepository {

    save(contract: Contract): Promise<Contract>;
    findById(id: string): Promise<Contract | null>;
    findByCompany(companyId: string): Promise<Contract[]>;
    delete(id: string): Promise<boolean>;
    exists(id: string): Promise<boolean>;

}