import "dotenv/config";

import { companyModule } from "@/modules/company/index.js";
import { fastify } from "fastify";

const start = async () => {
    try {
        const app = fastify({ logger: true });

        // register modules..
        app.register(companyModule);

        await app.listen({ port: 3333 });
        console.log("Server running at http://localhost:3333/");
    } catch (err: any) {
        console.error(err);
        process.exit(1);
    }
}

start();