import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserRepository } from "../../repositories/user.repository"

const userRepository = new UserRepository();

const SECRET_KEY = String(process.env.JWT_SECRET)
const EXPIRES_IN = process.env.EXPIRES_IN

interface LoginProps {
    login: string,
    password: string
}

class LoginService {
    async execute({ login, password }: LoginProps) {

        if (!login || !password) {
            throw new Error("Dados insuficientes")
        }

        const user = await userRepository.findUserByEmailOrUsername(login, login)
        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        if (await bcrypt.compare(password, user.password)) {

            const token = jwt.sign({info: user}, SECRET_KEY, { expiresIn: EXPIRES_IN });

            return { token, message: "Logado com sucesso!" }
        } else {
            throw new Error("Senha incorreta")
        }

    }
}

export { LoginService }