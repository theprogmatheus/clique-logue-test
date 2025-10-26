import type { FastifyInstance } from "fastify";

import { routes } from "@/modules/company/configs/routes.js";

export async function companyModule(app: FastifyInstance) {
    // inicar meu modulo

    await routes(app);
}


// OBS: preciso fazer validações de entradas de usuários ainda, salvar o CNPJ com regex numérico sem formatação.