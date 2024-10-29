import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUserBook = async (data) => {
    return await prisma.userBook.create({
        data,
    });
};