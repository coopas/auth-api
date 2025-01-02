import prisma from "../prisma"

class UserRepository {

    async findUserByEmailOrUsername(email: string, username: string) {
        return prisma.user.findFirst({ where: { OR: [{ email: email }, { user: username }] } })
    }

    async registerNewUser(user: string, email: string, password: string, first_name: string, last_name: string) {
        return prisma.user.create({ data: { user, email, password, first_name, last_name }})
    }

}

export { UserRepository }