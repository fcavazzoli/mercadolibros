import { Backend } from './backend'; // Importa la clase Backend

const backend = new Backend(); // Instancia de la clase Backend

const createBook = async (data) => {
    const token = localStorage.getItem('sessionToken');
    const headers = {authorization:`beaer ${token}`};
    const response = await backend.post('/books', data,headers);
    return response;
};

const deleteBook = async (id) => {
    const response = await backend.delete(`/books/${id}`);
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
const updateBook = async (id, data) => {
    const token = localStorage.getItem('sessionToken');
    const headers = {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
    try {
        const response = await backend.patch(`/books/${id}`, data, headers);
        return response;
    } catch (error) {
        console.error('Error al actualizar el libro:', error);
        throw error;
    }
};
const getMyBooks = async () => {
    try {
        const response = await backend.get('/books/user/myBooks'); 

        if (Array.isArray(response.message.userBooks)){
            const books = response.message.userBooks.map(item => item.book);
            const mappedPhotos = books.map((book)=> {
                return {
                    ...book,
                    photo: backend.url.replace("api", "") + book.photo
                }
            })
            console.log(mappedPhotos)
            return mappedPhotos
        }
        return [];
    } catch (error) {
        console.error('Error al actualizar el libro:', error);
        throw error;
    }
};
const getOtherBooks = async () => {
    try {
        const token = localStorage.getItem('sessionToken');
        const headers = {authorization: `Bearer ${token}`};
        const response = await backend.get('/books/user/not-my-books', headers); 
        return response;
    } catch (error) {
        console.error('Error al obtener los libros:', error);
        throw error;
    }
};

const getFiltered = async ({ byCategory, byAuthor, byUser }) => {
    const endpoint = '/books/'

    let queryParams = [];
    
    if (byCategory) {
        queryParams.push(`byCategory=${encodeURIComponent(byCategory)}`);
    }
    if (byAuthor) {
        queryParams.push(`byAuthor=${encodeURIComponent(byAuthor)}`);
    }
    if (byUser) {
        queryParams.push(`byUser=${encodeURIComponent(byUser)}`);
    }

    const url = queryParams.length > 0 ? `${endpoint}?${queryParams.join('&')}` : endpoint;

    try {
        const response = await backend.get(url);
        return response;
    } catch (error) {
        console.error('Error al obtener los libros filtrados:', error);
        throw error;
    }

}

export { createBook, deleteBook, getBookById ,getBooks, updateBook, getMyBooks,getOtherBooks};