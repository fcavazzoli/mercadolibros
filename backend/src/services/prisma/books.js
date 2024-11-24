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

export async function getAllBooks(filters) {
    const books = await prisma.book.findMany({
        ...filters,
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

    
    return books.map((book) => ({
        ...book,
        categories: book.BookCategory.map((bc) => bc.category.name), 
    }));
}
export async function deleteBook(id) {
    return await prisma.book.delete({
        where: { id },
    });
}

export async function getUserBook(userId, bookId) {
    return await prisma.userBook.findFirst({
        where: {
            userId,
            bookId
        }
    })
}

export async function getNotMyBooks(userId) {
    const books = await prisma.book.findMany({
        where: {
            NOT: {
                UserBook: {
                    some: {
                        userId: userId
                    }
                }
            }
        },
        include: {
            BookCategory: {
                include: {
                    category: true
                }
            }
        }
    });

    return books.map(book => ({
        ...book,
        categories: book.BookCategory.map(bc => bc.category.name)
    }));
}