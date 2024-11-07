// src/components/libros/DeleteBook.js
import React, { useState } from 'react';
import { deleteBook } from '../../services/LibroService';

const DeleteBook = () => {
    const [bookId, setBookId] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await deleteBook(bookId);
        setResponse(response);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Eliminar Libro</h3>
            <input type="text" placeholder="ID del libro" value={bookId} onChange={(e) => setBookId(e.target.value)} />
            <button type="submit">Eliminar</button>
            {response && <div>Respuesta: {JSON.stringify(response)}</div>}
        </form>
    );
};

export default DeleteBook;
