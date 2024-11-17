import { Backend } from './backend'; // Importa la clase Backend

const backend = new Backend(); // Instancia de la clase Backend

const createBook = async (data) => {
    const token = localStorage.getItem('sessionToken');
    const headers = {authorization:`beaer ${token}`};
    const response = await backend.post('/books', data,headers);
    return response;
};

const deleteBook = async (id) => {
    const token = localStorage.getItem('sessionToken');
    const headers = {authorization:`beaer ${token}`};
    const response = await backend.post(`/books/${id}`, { method: 'DELETE' },headers);
    return response;
};

const getBookById = async (id) => {
    const token = localStorage.getItem('sessionToken');
    const headers = {authorization:`beaer ${token}`};
    const response = await backend.get(`/books/${id}`,headers);
    return response;
};
const getBooks = async () => {
    
    const token = localStorage.getItem('sessionToken');
    const headers = {authorization:`beaer ${token}`};

    console.log(headers);
    const response = await backend.get(`/books/`,headers); 
    return response;
};

export { createBook, deleteBook, getBookById ,getBooks};
