import fastify from "fastify";
import cors from "@fastify/cors";

import dotenv from "dotenv";
import { authRoutes } from "./routes/auth.routes";
dotenv.config();

const app = fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message })
});

const start = async () => {

    await app.register(cors);
    await app.register(authRoutes, { prefix: "api/auth" })

    const port = Number(process.env.PORT)

    try {
        app.listen({ port })
    } catch (err) {
        console.log(err);
    }
}

start();