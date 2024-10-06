import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const dbCreateUser = async (user) => {
    return await db.user.create({
        data: user
    });
}

export const getUserById = async (id) => {
    return await db.user.findUnique({
        where: { id }
    })
}

export const getUserByEmail = async (email) => {
    return await db.user.findUnique({
        where: { email }
    })
}
