import { routes } from "@/modules/attachment/configs/routes.js";
import multipart from "@fastify/multipart";
import type { FastifyInstance } from "fastify";
import fs from "fs";
import path from "path";

export async function attachmentModule(app: FastifyInstance) {
    app.register(multipart);

    const uploadDir = path.resolve("uploads");
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    await routes(app);
}