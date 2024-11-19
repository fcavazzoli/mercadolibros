import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUserBook = async (data) => {
    return await prisma.userBook.create({
        data,
    });
};

export const getUserBook = async (userId, bookId) => {
    return await prisma.userBook.findFirst({
        where: {
            userId,
            bookId
        }
    })
}