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
            bookId: { equals: bookId }
        },
        include: {
            user,
            book
        }
    })
}

export const userBookCountByBookId = async (userId, bookId) => {
    const userBooks = await prisma.userBook.findMany({
        where: {
            bookId: bookId,
            userId: userId
        }
    })

    return userBooks.length
}

export const deleteUserBook = async (userId, bookId) => {
    return await prisma.userBook.deleteMany({
        where: {
            userId: userId,
            bookId: bookId
        }
    })
}