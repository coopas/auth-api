import { FastifyReply, FastifyRequest } from "fastify";
import { LoginService } from "../../services/auth/Login.service";

class LoginController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const {login, password} = request.body as {
            login: string,
            password: string
        }

        const loginService = new LoginService();

        const user = await loginService.execute({login, password})
        reply.send(user);
    }
}
export { LoginController }