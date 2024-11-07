// src/components/libros/ModifyBook.js
import React, { useState } from 'react';
import { getBookById } from '../../services/LibroService';

const ModifyBook = () => {
    const [bookId, setBookId] = useState('');
    const [bookData, setBookData] = useState({});
    const [response, setResponse] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await getBookById(bookId);
        setResponse(response);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Modificar Libro</h3>
            <input type="text" placeholder="ID del libro" value={bookId} onChange={(e) => setBookId(e.target.value)} />
            <button type="submit">Buscar</button>
            {response && (
                <div>
                    <h4>Detalles del Libro</h4>
                    <input type="text" name="title" placeholder="Título del libro" value={bookData.title} onChange={handleInputChange} />
                    <input type="text" name="author" placeholder="Autor del libro" value={bookData.author} onChange={handleInputChange} />
                    <button type="button" onClick={() => {/* lógica para actualizar libro */}}>Actualizar</button>
                </div>
            )}
        </form>
    );
};

export default ModifyBook;
