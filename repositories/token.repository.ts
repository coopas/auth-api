import prisma from "../src/prisma";

class TokenRepository {

    async findToken(token: string) {
        return prisma.tokens.findFirst({where: {
            token
        }})
    }

    async addToken(token: string, valid_date: Date) {
        return prisma.tokens.create({ data: { token, valid_date}})
    }

}

export { TokenRepository }