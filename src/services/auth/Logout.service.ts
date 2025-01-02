import { TokenRepository } from "../../repositories/token.repository"
import jwt from "jsonwebtoken"

const tokenRepository = new TokenRepository();
const SECRET_KEY = String(process.env.JWT_SECRET);

interface LogoutProps {
    token: string
}

class LogoutService {
    async execute({token}: LogoutProps) {

        const hasToken = await tokenRepository.findToken(token)
        if(hasToken || !token) {
            throw new Error("Usuário se encontra deslogado")
        }

        try {

            const decoded = jwt.verify(token, SECRET_KEY);

            if (typeof decoded !== 'string' && 'exp' in decoded) {
                const expirationDate = new Date(decoded.exp! * 1000);
                tokenRepository.addToken(token, expirationDate);

                return({ message: "Usuário deslogado"})

              } else {
                throw new Error('Token decodificado inválido.');
              }

        } catch (err) {
            throw new Error("Houve um erro ao deslogar o usuário")
        }

    }
}
export { LogoutService }