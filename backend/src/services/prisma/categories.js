import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findCategoryByName = async (name) => {
    return await prisma.category.findFirst({
        where: {
            name
        }
    });
};

export const createCategory = async (data) => {
    return await prisma.category.create({
        data
    });
};

export const getCategories = async () => {
    return await prisma.category.findMany({});
}

export const findOrCreateByNames = async (names) => {
    return await Promise.all(
        names.map(async (categoryName) => {
            const category = await prisma.category.findUnique({
                where: { name: categoryName },
            });

            return category
                ? category
                : await prisma.category.create({ data: { name: categoryName } });
        }));
};