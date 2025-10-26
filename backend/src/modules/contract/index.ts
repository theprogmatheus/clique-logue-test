import { routes } from "@/modules/contract/configs/routes.js";
import type { FastifyInstance } from "fastify";

export async function contractModule(app: FastifyInstance) {
    routes(app);
}