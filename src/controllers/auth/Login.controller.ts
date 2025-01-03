import { FastifyReply, FastifyRequest } from "fastify";
import { LoginService } from "../../services/auth/Login.service";

class LoginController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const {login, password, remember_me} = request.body as {
            login: string,
            password: string,
            remember_me: boolean
        }

        const loginService = new LoginService();

        const user = await loginService.execute({login, password, remember_me})
        reply.send(user);
    }
}
export { LoginController }