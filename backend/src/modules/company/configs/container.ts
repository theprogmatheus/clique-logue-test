import { CompanyController } from "@/modules/company/controllers/CompanyController.js";
import { CompanyRepositoryImpl } from "@/modules/company/repositories/impl/CompanyRepositoryImpl.js";
import { CompanyService } from "@/modules/company/services/CompanyService.js";

const companyRepository = new CompanyRepositoryImpl();
const companyService = new CompanyService(companyRepository);
const companyController = new CompanyController(companyService);

export {
    companyController, companyRepository,
    companyService
};
