import { findOrCreateByNames } from "../services/prisma/categories.js";
import { createBook, getBookById, getAllBooks, getUserBook, getNotMyBooks as getNotMyBooksService } from "../services/prisma/books.js";
import { deleteUserBook, getBooksForUser } from "../services/prisma/userBooks.js";
import { updateProposal, userIsBeingAsked } from "../services/prisma/exchanges.js";

export const create = async (req, res) => {
    const { user } = req;

    const {
        title,
        author,
        categories
    } = req.body;

    const allCategories = await findOrCreateByNames(categories);

    try {
        const newBook = await createBook(
            {
                title,
                author,
                UserBook: {
                    create: {
                        user: {
                            connect: { id: req.user.id },
                        },
                    },
                },
                BookCategory: {
                    create: allCategories.map((category) => ({
                        category: {
                            connect: { id: category.id },
                        },
                    })),
                },
            });

        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export const assingBook = async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    try {
        const book = await getBookById(id);

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        const userBook = book.UserBook.find((ub) => ub.user.id === user.id);

        if (userBook) {
            return res.status(400).json({ error: "Book already assigned" });
        }

        await prisma.userBook.create({
            data: {
                userId: user.id,
                bookId: book.id,
            },
        });

        return res.status(200).json({ message: "Book assigned successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await getBookById(id);

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        return res.status(200).json(book);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getAll = async (req, res) => {
    const { byCategory, byAuthor, byUser } = req.query;

    let filters = {
        where: {},
    };

    if (byCategory) {
        filters.where.BookCategory = {
            some: {
                category: {
                    name: byCategory,
                },
            },
        };
    }

    if (byAuthor) {
        filters.where.author = byAuthor;
    }

    if (byUser) {
        filters.where.UserBook = {
            some: {
                user: {
                    id: byUser,
                },
            },
        };
    }


    try {
        const books = await getAllBooks(filters);

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateBook = async (req, res) => {
    const { user } = req;

    const { id } = req.params;
    const bookId = parseInt(id)

    const userBook = await getUserBook(user.id, bookId);
    if (!userBook) {
        return res.status(404).json({ message: `User does not have book with id: ${bookId}` })
    }

    const bookInfo = req.body;

    const book = await getBookById(bookId)
    let categories;
    if (bookInfo.categories) {
        categories = await findOrCreateByNames(bookInfo.categories);
    }
    const allCategories = categories || book.BookCategory.map((c) => c.category)

    const newBook = await createBook({
        title: bookInfo.title || book.title,
        author: bookInfo.author || book.author,
        UserBook: {
            create: {
                user: {
                    connect: { id: req.user.id },
                },
            },
        },
        BookCategory: {
            create: allCategories.map((category) => ({
                category: {
                    connect: { id: category.id },
                },
            })),
        },
    })

    const migrateUserProposals = await updateProposal(user.id, bookId, newBook.id)

    const bookIsAsked = await userIsBeingAsked(bookId)
    if (!bookIsAsked) {
        const deleteOldUserBook = await deleteUserBook(user.id, bookId)
    }
    const { id: newBookId, ...sanitizedBook } = newBook;
    return res.status(200).json({ message: { userBookId: newBookId, ...sanitizedBook } })
}

export const getBooksBySession = async (req, res) => {
    const { user } = req;

    try {
        const userBook = await getBooksForUser(user.id)

        return res.status(200).json({ message: { userBooks: userBook } })

    } catch (error) {
        console.error("Error fetching books by session token:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getNotMyBooks = async (req, res) => {
    const { user } = req;

    try {
        const books = await getNotMyBooksService(user.id);
        return res.status(200).json({ message: { books } });
    } catch (error) {
        console.error("Error fetching not my books:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};