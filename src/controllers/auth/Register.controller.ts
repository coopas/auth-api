import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterService } from "../../services/auth/Register.service";

class RegisterController {
    async handle(request: FastifyRequest, reply: FastifyReply) {

        const { user, email, password, first_name, last_name } = request.body as {
            user: string,
            email: string,
            password: string,
            first_name: string,
            last_name: string
        }

        const registerService = new RegisterService();

        const newUser = await registerService.execute({user, email, password, first_name, last_name})
        reply.send(newUser)

    }
}
export { RegisterController }