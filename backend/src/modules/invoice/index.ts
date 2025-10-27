import { routes } from "@/modules/invoice/configs/routes.js";
import type { FastifyInstance } from "fastify";

export async function invoiceModule(app: FastifyInstance) {
    await routes(app);
}