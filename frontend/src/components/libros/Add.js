import React, { useState } from 'react';
import { createBook } from "../../services/LibroService";

const AddBook = () => {
    const [bookData, setBookData] = useState({});
    const [response, setResponse] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createBook(bookData);
        setResponse(response);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Agregar Libro</h3>
            <input type="text" name="title" placeholder="Título del libro" onChange={handleInputChange} />
            <input type="text" name="author" placeholder="Autor del libro" onChange={handleInputChange} />
            <button type="submit">Agregar</button>
            {response && <div>Respuesta: {JSON.stringify(response)}</div>}
        </form>
    );
};

export default AddBook;
