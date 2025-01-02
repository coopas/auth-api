import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { TokenRepository } from '../../repositories/token.repository';

const tokenRepository = new TokenRepository();

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.headers.authorization?.replace(/^Bearer /, '');

    const SECRET_KEY = String(process.env.JWT_SECRET);

    if(!token) {
        throw new Error("Não autorizado: Token não informado")
    }

    const hasToken = await tokenRepository.findToken(token)
    if(hasToken) {
        throw new Error("Não autorizado: Token invalido")
    }

    try {
        const user = await new Promise<any>((resolve, reject) => {
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });

        request.user = user;
    } catch (err) {
        return reply.code(404).send({ message: 'Não autorizado: Token invalido' });
    }
};
