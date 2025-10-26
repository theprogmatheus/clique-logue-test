import { companyRepository } from "@/modules/company/configs/container.js";
import { ContractController } from "@/modules/contract/controllers/ContractController.js";
import { ContractRepositoryImpl } from "@/modules/contract/repositories/impl/ContractRepositoryImpl.js";
import { ContractService } from "@/modules/contract/services/ContractService.js";

const contractRepository = new ContractRepositoryImpl();
const contractService = new ContractService(contractRepository, companyRepository);
const contractController = new ContractController(contractService);

export {
    contractController, contractRepository,
    contractService
};

