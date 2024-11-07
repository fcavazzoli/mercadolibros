// EditBook.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById } from '../../services/LibroService';
import { Backend } from '../../services/backend'; // Importar la instancia de Backend directamente
import '../../css/EditBook.css';

const EditBook = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [bookData, setBookData] = useState({ title: '', author: '', categories: '' });
    const backend = new Backend(); // Instanciar Backend para realizar la solicitud

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await getBookById(bookId);
                setBookData(response.data);
            } catch (error) {
                console.error('Error al cargar el libro:', error);
            }
        };
        fetchBook();
    }, [bookId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Llamada directa para actualizar el libro usando Backend
            await backend.patch(`/books/${bookId}`, bookData);
            alert('Libro actualizado exitosamente');
            navigate('/menu');
        } catch (error) {
            console.error('Error al actualizar el libro:', error);
            alert('Error al actualizar el libro. Intente nuevamente más tarde.');
        }
    };

    return (
        <div className="edit-book-container">
            <h2>Modificar Libro</h2>
            <form onSubmit={handleSubmit}>
                <label>Título del libro:</label>
                <input type="text" name="title" value={bookData.title} onChange={handleInputChange} required />

                <label>Autor del libro:</label>
                <input type="text" name="author" value={bookData.author} onChange={handleInputChange} required />

                <label>Categoría:</label>
                <select name="categories" value={bookData.categories} onChange={handleInputChange} required>
                    <option value="Ficción">Ficción</option>
                    <option value="No Ficción">No Ficción</option>
                    {/* otras opciones */}
                </select>

                <button type="submit">Guardar Cambios</button>
                <button type="button" onClick={() => navigate('/menu')}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditBook;
