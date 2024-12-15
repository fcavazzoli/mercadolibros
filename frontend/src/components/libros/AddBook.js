import '../../css/App.css'; 
import React, { useState } from 'react';
import { createBook } from '../../services/LibroService';
import Header from '../Header'
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('Ficción');
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();

    const handleAddBook = async (e) => {
        e.preventDefault();        
        const book = await createBook({ title, author, categories: [category], photo })
        console.log('Libro agregado:', book);
        alert('Libro agregado correctamente');
        navigate('/books');
    };

    const handleCancel = () => {
        navigate('/books'); // Redirige a la página de gestión de libros
    };

    const handlePhotoChange = (e) => {
        const fileName = e.target.files[0].name;
        const filePath = `images/${fileName}`;
        setPhoto(filePath);
    };

    return (<Header>
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

                <label>Foto:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                />

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
    </Header>);
};

export default AddBook;
