import { FastifyReply, FastifyRequest } from "fastify";
import { LogoutService } from "../../services/auth/Logout.service";

class LogoutController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const token = request.headers.authorization?.replace(/^Bearer /, '') || "";

        const logoutService = new LogoutService();
        const logout = await logoutService.execute({token})
        reply.send(logout)

    }
}

export { LogoutController }