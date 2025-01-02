import { UserRepository } from "../../../repositories/user.repository"
import validator from "validator"
import bcrypt from "bcrypt"

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

        if(!user || !email || !password || !first_name || !last_name) {
            throw new Error("Dados insuficientes")
        }

        const newUser = await userRepository.findUserByEmailOrUsername(email, user)
        if(newUser) {
            throw new Error("Email/Usuário já utilizado")
        }

        if(!validator.isEmail(email)) {
            throw new Error("Email invalido")
        }

        const hashPassword = await bcrypt.hash(password, 10)

        await userRepository.registerNewUser(user, email, hashPassword, first_name, last_name)
        return { message: "Usuário cadastrado"}

    }
}

export { RegisterService }