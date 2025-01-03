import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserRepository } from "../../repositories/user.repository"
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = String(process.env.JWT_SECRET)

const userRepository = new UserRepository();

interface LoginProps {
    login: string,
    password: string,
    remember_me: boolean
}

class LoginService {
    async execute({ login, password, remember_me }: LoginProps) {

        if (!login || !password) {
            throw new Error("Dados insuficientes")
        }

        const user = await userRepository.findUserByEmailOrUsername(login, login)
        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        if (await bcrypt.compare(password, user.password)) {

            const TokenExpiresIn = remember_me ? "7d" : "1d";       
            const token = jwt.sign({userId: user.id}, SECRET_KEY, { expiresIn: TokenExpiresIn || "1d" });

            return { token, message: "Logado com sucesso!" }
        } else {
            throw new Error("Senha incorreta")
        }

    }
}

export { LoginService }