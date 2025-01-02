import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { RegisterController } from "../controllers/auth/Register.controller";
import { LoginController } from "../controllers/auth/Login.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { LogoutController } from "../controllers/auth/Logout.controller";

export async function authRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.post("/register", async (request: FastifyRequest, reply: FastifyReply) => {
        return new RegisterController().handle(request, reply);
    })

    fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
        return new LoginController().handle(request, reply)
    })
    
    fastify.post("/logout", async (request: FastifyRequest, reply: FastifyReply) => {
        return new LogoutController().handle(request, reply)
    })


    fastify.get('/test', { preHandler: authMiddleware }, async (request, reply) => { // ROTA APENAS PARA TESTES
        const user = request.user; 
        console.log(user)
        return { message: `Olá, ${user.info.first_name} ${user.info.last_name}` };
      });
    
}