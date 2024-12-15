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
            user: true,
            book: true
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

export const getBooksForUser = async (userId) => {
    const userBooks = await prisma.userBook.findMany({
        where: {
            userId
        },
        include: {
            book: {
                include: {
                    BookCategory: {
                        include: {
                            category: true
                        }
                    }
                }
            }
        }
    });

    return userBooks.map(userBook => ({
        ...userBook,
        book: {
            ...userBook.book,
            categories: userBook.book.BookCategory.map(bc => bc.category.name)
        }
    }));
}

export const getOtherBooksForUser = async (userId) => {
    const userBooks = await prisma.userBook.findMany({
        where: {
            NOT: {
                userId: userId
            }
        },
        include: {
            book: true
        }
    })
    console.log(userBooks)
    const books = await prisma.book.findMany({
        where: {
            id: {
                in: userBooks.map(b=> b.bookId)
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