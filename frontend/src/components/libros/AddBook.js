// AddBook.js
import React, { useState } from 'react';
import '../../css/AddBook.css';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('Ficción');

    const handleAddBook = (e) => {
        e.preventDefault();
        console.log('Libro agregado:', { title, author, category });
        alert('Libro agregado correctamente');
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
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="Ficción">Ficción</option>
                    <option value="No Ficción">No Ficción</option>
                    <option value="Ciencia Ficción">Ciencia Ficción</option>
                    <option value="Fantasía">Fantasía</option>
                    <option value="Historia">Historia</option>
                </select>
                
                <button type="submit">Agregar Libro</button>
            </form>
        </div>
    );
};

export default AddBook;
