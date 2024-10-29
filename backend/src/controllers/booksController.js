import { findOrCreateByNames } from "../services/prisma/categories.js";
import { createBook, getBookById, getAllBooks } from "../services/prisma/books.js";

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
    try {
        const books = await getAllBooks();

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};