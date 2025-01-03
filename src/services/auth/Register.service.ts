import { UserRepository } from "../../repositories/user.repository"
import bcrypt from "bcrypt"
import { z } from "zod"
import zxcvbn from "zxcvbn";

const userRepository = new UserRepository();

interface RegisterProps {
    user: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string
}

class RegisterService {
    async execute({ user, email, password, first_name, last_name }: RegisterProps) {

        if (!user || !email || !password || !first_name || !last_name) {
            throw new Error("Dados insuficientes")
        }

        const userRegex = /^[a-zA-Z0-9_.-]+$/;
        if (!userRegex.test(user)) {
            throw new Error("O nome de usuário só pode conter letras, números, _, . e -");
        }

        const validEmail = z.string().email().safeParse(email).success;
        if (!validEmail) {
            throw new Error("Email invalido")
        }

        const strongPassword = zxcvbn(password)
        if (strongPassword.score < 2) {
            throw new Error(`Senha fraca. ${strongPassword.feedback.suggestions.join(', ')}`);
        }

        const newUser = await userRepository.findUserByEmailOrUsername(email, user)
        if (newUser) {
            throw new Error("Email/Usuário já utilizado")
        }

        const hashPassword = await bcrypt.hash(password, 10)

        await userRepository.registerNewUser(user, email, hashPassword, first_name, last_name)
        return { message: "Usuário cadastrado" }

    }
}

export { RegisterService }