import { contractController } from "@/modules/contract/configs/container.js";
import type { FastifyInstance } from "fastify";

export async function routes(app: FastifyInstance) {

    app.get("/contracts/cnpj/:cnpj", (req, rep) => contractController.getContractsByCNPJ(req, rep));
    app.get("/contracts/:id", (req, rep) => contractController.getContract(req, rep));
    app.post("/contracts", (req, rep) => contractController.createContract(req, rep));
    app.put("/contracts", (req, rep) => contractController.updateContract(req, rep));
    app.delete("/contracts/:id", (req, rep) => contractController.deleteContract(req, rep));

}