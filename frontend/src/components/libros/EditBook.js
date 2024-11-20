import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBook } from '../../services/LibroService';
import '../../css/EditBook.css';
import Header from '../Header';

const EditBook = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('Ficción');

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const book = await getBookById(bookId);
                setTitle(book.title || '');
                setAuthor(book.author || '');
                setCategory(Array.isArray(book.categories) && book.categories.length > 0 ? book.categories[0] : 'Ficción');
            } catch (error) {
                console.error('Error al cargar el libro:', error);
                alert('No se pudo cargar la información del libro.');
            }
        };
        fetchBook();
    }, [bookId]);

    const handleUpdateBook = async (e) => {
        e.preventDefault();
        try {
            await updateBook(bookId, { title, author, categories: [category] });
            alert('Libro actualizado correctamente');
            navigate('/books'); // Redirige al listado de libros
        } catch (error) {
            console.error('Error al actualizar el libro:', error);
            alert('Error al actualizar el libro. Intente nuevamente más tarde.');
        }
    };

    const handleCancel = () => {
        navigate('/books'); // Redirige al listado de libros
    };

    return (
        <Header>
            <div className="edit-book-container">
                <h2>Modificar Libro</h2>
                <form onSubmit={handleUpdateBook}>
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
                        <button type="submit" className="save-btn">
                            Guardar Cambios
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
        </Header>
    );
};

export default EditBook;
