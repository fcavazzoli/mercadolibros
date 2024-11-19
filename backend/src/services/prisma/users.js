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

export const updateUser = async (userId, userInfo) => {
    const user = await db.user.findFirst({
        where: {
            id: userId
        }
    })

    if (!user) {
        throw Error("User not found")
    }

    const email = userInfo.email || user.email
    const name = userInfo.name || user.name
    const address = userInfo.address || user.address
    const phoneNumber = userInfo.phoneNumber || user.phoneNumber

    const update = await db.user.update({
        where: {
            id: user.id
        },
        data: {
            email: email,
            name: name,
            address: address,
            phoneNumber: phoneNumber
        }
    })

    return update;
}