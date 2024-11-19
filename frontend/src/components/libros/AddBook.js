import React, { useState } from 'react';
import '../../css/AddBook.css';
import { createBook } from '../../services/LibroService';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('Ficción');

    const handleAddBook = async (e) => {
        e.preventDefault();
        const book = await createBook({ title, author, categories: [category] });
        console.log('Libro agregado:', book);
        alert('Libro agregado correctamente');
    };

    const handleCancel = () => {
        window.location.href = '/menu'; // Redirige a la página de gestión de libros
    };

    return (
        <div className="add-book-container">
            <h2>Agregar Nuevo Libro</h2>
            <form onSubmit={handleAddBook}>
                <label>Título:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label>Autor:</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />

                <label>Categoría:</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="Ficción">Ficción</option>
                    <option value="No Ficción">No Ficción</option>
                    <option value="Ciencia Ficción">Ciencia Ficción</option>
                    <option value="Fantasía">Fantasía</option>
                    <option value="Historia">Historia</option>
                </select>

                <div className="form-buttons">
                    <button type="submit" className="add-btn">
                        Agregar Libro
                    </button>
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBook;
