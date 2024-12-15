import { findOrCreateByNames } from "../services/prisma/categories.js";
import { createBook, getBookById, getAllBooks, getUserBook, getNotMyBooks as getNotMyBooksService } from "../services/prisma/books.js";
import { deleteUserBook, getBooksForUser, getOtherBooksForUser } from "../services/prisma/userBooks.js";
import { updateProposal, userIsBeingAsked } from "../services/prisma/exchanges.js";

import { PrismaClient } from '@prisma/client'; // Importa PrismaClient
const prisma = new PrismaClient(); // Inicializa PrismaClient

export const create = async (req, res) => {
    const { user } = req;

    const {
        title,
        author,
        photo,
        categories
    } = req.body;

    const allCategories = await findOrCreateByNames(categories);

    try {
        const newBook = await createBook(
            {
                title,
                author,
                photo,
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
    const { id } = req.params; // ID del libro
    const bookId = parseInt(id);

    try {
        console.log("Iniciando actualización para el libro ID:", bookId);
        console.log("Datos recibidos:", req.body);

        const userBook = await getUserBook(user.id, bookId);
        if (!userBook) {
            console.error("Libro no encontrado para el usuario:", user.id);
            return res.status(404).json({ message: `User does not have book with id: ${bookId}` });
        }

        const bookInfo = req.body;

        const book = await getBookById(bookId);
        console.log("Libro original:", book);

        let updatedCategories = book.BookCategory.map((c) => c.category);
        if (bookInfo.categories) {
            console.log("Procesando nuevas categorías:", bookInfo.categories);
            const categories = await findOrCreateByNames(bookInfo.categories);
            updatedCategories = categories;
        }

        const updatedBook = await prisma.book.update({
            where: { id: bookId },
            data: {
                title: bookInfo.title || book.title,
                author: bookInfo.author || book.author,
                photo: bookInfo.photo || book.photo,
                BookCategory: {
                    deleteMany: {}, // Eliminar relaciones previas
                    create: updatedCategories.map((category) => ({
                        category: {
                            connect: { id: category.id },
                        },
                    })),
                },
            },
        });

        console.log("Libro actualizado correctamente:", updatedBook);
        return res.status(200).json({ message: "Book updated successfully", updatedBook });
    } catch (error) {
        console.error("Error actualizando el libro:", error);
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
};



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

export const getOtherBooksBySession = async (req, res) => {
    const { user } = req;

    try {
        const otherBooks = await getOtherBooksForUser(user.id);

        return res.status(200).json({ message: { otherBooks } });

    } catch (error) {
        console.error("Error fetching other books by session token:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteBook = async(req, res) => {
    const { id } = req.params; // Book ID from request parameters
    const { user } = req; // Authenticated user

    try {
        // Check if the book exists and belongs to the user
        const userBook = await getUserBook(user.id, parseInt(id));
        if (!userBook) {
            return res.status(404).json({ message: `Book with id ${id} not found for this user.` });
        }

        // Delete the book-user relationship
        await deleteUserBook(user.id, parseInt(id));

        return res.status(200).json({ message: `Book with id ${id} successfully deleted.` });
    } catch (error) {
        if (error.code === 'P2003') {
            return res.status(200).json({
                message: "Cannot delete book. It is referenced in another table (e.g., ExchangeProposal).",
            });
        }
        console.error("Error deleting book:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};