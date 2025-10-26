import { Company } from "@/modules/company/models/Company.js";
import type { CompanyService } from "@/modules/company/services/CompanyService.js";
import { ResponseEntity } from "@/shared/ResponseEntity.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export class CompanyController {

    companyService: CompanyService;

    constructor(companyService: CompanyService) {
        this.companyService = companyService;
    }

    async registerCompany(req: FastifyRequest, rep: FastifyReply) {
        if (!req.body)
            return new ResponseEntity({ status: 400, message: "The request body is empty.", body: {} }).send(rep);

        const result = await this.companyService.registerCompany(req.body);

        if (result instanceof Company)
            return new ResponseEntity({ status: 201, body: result }).send(rep);

        return new ResponseEntity({ status: 400, message: result, body: {} }).send(rep);
    }

    async updateCompany(req: FastifyRequest, rep: FastifyReply) {
        if (!req.body)
            return new ResponseEntity({ status: 400, message: "The request body is empty.", body: {} }).send(rep);

        const { id } = req.params as { id: string };
        const result = await this.companyService.updateCompany({
            id,
            ...req.body
        });

        if (result)
            return new ResponseEntity({ status: 200, body: result }).send(rep);

        return new ResponseEntity({ status: 400, message: "An error occurred while trying to update the company.", body: {} });
    }

    async getCompanyById(req: FastifyRequest, rep: FastifyReply) {
        const { id } = req.params as { id: string };

        const result = await this.companyService.getCompanyById(id);
        if (!result)
            return new ResponseEntity({ status: 404, message: "Company not found.", body: {} }).send(rep);

        return new ResponseEntity({ status: 200, body: result }).send(rep);
    }

    async getCompanyByCNPJ(req: FastifyRequest, rep: FastifyReply) {
        const { cnpj } = req.params as { cnpj: string };

        const result = await this.companyService.getCompanyByCNPJ(cnpj);

        if (!result)
            return new ResponseEntity({ status: 404, message: "Company not found.", body: {} }).send(rep);

        return new ResponseEntity({ status: 200, body: result }).send(rep);
    }

    async deleteCompany(req: FastifyRequest, rep: FastifyReply) {
        const { id } = req.params as { id: string };
        const result = await this.companyService.deleteCompany(id);

        if (result)
            return new ResponseEntity({ status: 200, body: {} }).send(rep);

        return new ResponseEntity({ status: 204, body: {} }).send(rep);
    }


}