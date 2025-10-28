import "dotenv/config";

import { attachmentModule } from "@/modules/attachment/index.js";
import { companyModule } from "@/modules/company/index.js";
import { contractModule } from "@/modules/contract/index.js";
import { invoiceModule } from "@/modules/invoice/index.js";
import { fastify } from "fastify";
import cors from "@fastify/cors";

const start = async () => {
    try {
        const app = fastify({ logger: true });

        await app.register(cors, {
            origin: "*",
        });

        // register modules..
        await app.register(companyModule);
        await app.register(contractModule);
        await app.register(invoiceModule);
        await app.register(attachmentModule);

        await app.listen({ port: 3333 });
        console.log("Server running at http://localhost:3333/");
    } catch (err: any) {
        console.error(err);
        process.exit(1);
    }
}

start();