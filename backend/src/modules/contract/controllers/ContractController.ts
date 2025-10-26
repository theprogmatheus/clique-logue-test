import { Contract } from "@/modules/contract/models/Contract.js";
import type { ContractService } from "@/modules/contract/services/ContractService.js";
import { ResponseEntity } from "@/shared/ResponseEntity.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export class ContractController {

    contractService: ContractService;

    constructor(contractService: ContractService) {
        this.contractService = contractService;
    }

    async createContract(req: FastifyRequest, rep: FastifyReply) {
        if (!req.body)
            return new ResponseEntity({ status: 400, message: "The request body is empty.", body: {} }).send(rep);

        const result = await this.contractService.newContract(req.body);

        if (typeof result === "string")
            return new ResponseEntity({ status: 400, message: result, body: {} }).send(rep);

        return new ResponseEntity({ status: 201, body: result }).send(rep);

    }

    async updateContract(req: FastifyRequest, rep: FastifyReply) {
        if (!req.body)
            return new ResponseEntity({ status: 400, message: "The request body is empty.", body: {} }).send(rep);

        const { id } = req.params as { id: string };

        const result = await this.contractService.updateContract({
            ...req.body,
            id
        });

        if (result instanceof Contract)
            return new ResponseEntity({ status: 200, body: result }).send(rep);

        return new ResponseEntity({ status: 400, message: result, body: {} }).send(rep);
    }

    async deleteContract(req: FastifyRequest, rep: FastifyReply) {
        const { id } = req.params as { id: string };

        const result = await this.contractService.deleteContract(id);

        if (result)
            return new ResponseEntity({ status: 200, message: "Contract deleted successfully.", body: {} }).send(rep);

        return new ResponseEntity({ status: 204, body: {} }).send(rep);
    }

    async getContract(req: FastifyRequest, rep: FastifyReply) {
        const { id } = req.params as { id: string };
        const result = await this.contractService.getContract(id);
        if (result)
            return new ResponseEntity({ status: 200, body: result }).send(rep);

        return new ResponseEntity({ status: 404, message: "Contract not found.", body: {} }).send(rep);
    }

    async getContractsByCNPJ(req: FastifyRequest, rep: FastifyReply) {
        const { cnpj } = req.params as { cnpj: string };
        const result = await this.contractService.listContractsByCNPJ(cnpj);
        return new ResponseEntity({ status: 200, body: result }).send(rep);
    }


}