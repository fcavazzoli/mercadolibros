import { Backend } from './backend'; // Importa la clase Backend

const backend = new Backend(); // Instancia de la clase Backend

const createBook = async (data) => {
    const response = await backend.post('/books', data);
    return response;
};

const deleteBook = async (id) => {
    const response = await backend.post(`/books/${id}`, { method: 'DELETE' });
    return response;
};

const getBookById = async (id) => {
    const response = await backend.get(`/books/${id}`);
    return response;
};

export { createBook, deleteBook, getBookById };
