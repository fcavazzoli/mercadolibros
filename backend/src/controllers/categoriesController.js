import { createCategory, getCategories } from "../services/prisma/categories.js";

export const create = async (req, res) => {
    const { name } = req.body;

    try {
        const newCategory = await createCategory({
            name
        });

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAll = async (req, res) => {
    try {
        const categories = await getCategories();

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};