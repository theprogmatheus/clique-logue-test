import "dotenv/config";

import { companyModule } from "@/modules/company/index.js";
import { contractModule } from "@/modules/contract/index.js";
import { fastify } from "fastify";
import multipart from "@fastify/multipart";
import fs from "fs";
import path from "path";

const start = async () => {
    try {
        const app = fastify({ logger: true });

        app.register(multipart);
        
        // pasta de uploads
        const uploadDir = path.resolve("uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        // register modules..
        app.register(companyModule);
        app.register(contractModule);

        await app.listen({ port: 3333 });
        console.log("Server running at http://localhost:3333/");
    } catch (err: any) {
        console.error(err);
        process.exit(1);
    }
}

start();