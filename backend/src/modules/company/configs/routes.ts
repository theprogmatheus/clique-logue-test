import type { FastifyInstance } from "fastify";
import { companyController } from "@/modules/company/configs/container.js";

export async function routes(app: FastifyInstance) {
    app.get("/companies/:id", (req, rep) => companyController.getCompanyById(req, rep));
    //app.get("/companies/:cnpj", (req, rep) => companyController.getCompanyByCNPJ(req, rep));
    app.post("/companies", (req, rep) => companyController.registerCompany(req, rep));
    app.put("/companies/:id", (req, rep) => companyController.updateCompany(req, rep));
    app.delete("/companies/:id", (req, rep) => companyController.deleteCompany(req, rep));
}