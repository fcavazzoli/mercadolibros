import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createBook(data) {
    return await prisma.book.create({
        data,
    });
}

export async function getBookById(id) {
    return await prisma.book.findUnique({
        where: { id: parseInt(id) },
        include: {
            UserBook: {
                select: {
                    user: true,
                },
            },
            BookCategory: {
                select: {
                    category: true,
                },
            },
        },
    });
}

export async function getAllBooks() {
    return await prisma.book.findMany({
        include: {
            UserBook: {
                select: {
                    user: true,
                },
            },
            BookCategory: {
                select: {
                    category: true,
                },
            },
        },
    });
}

export async function deleteBook(id) {
    return await prisma.book.delete({
        where: { id },
    });
}