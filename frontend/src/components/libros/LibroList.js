import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBook, getBooks } from '../../services/LibroService';
import '../../css/LibroList.css';
import Header from '../Header'

const LibroList = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                console.log(response);
                setBooks(response || []);
            } catch (error) {
                console.error('Error al cargar libros:', error);
                setBooks([]);
            }
        };
        fetchBooks();
    }, []);

    const handleDelete = async (bookId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
            try {
                await deleteBook(bookId);
                setBooks(books.filter(book => book.id !== bookId));
                alert('Libro eliminado exitosamente');
            } catch (error) {
                console.error('Error al eliminar el libro:', error);
                alert('Error al eliminar el libro. Intente nuevamente más tarde.');
            }
        }
    };

    const handleEdit = (bookId) => {
        navigate(`/edit-book/${bookId}`);
    };

    const filteredBooks = books.filter(book =>
        (book.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.author || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (<Header>
        <div className="libro-list-container">
            <h2 className="libro-list-title">Lista de Libros</h2>
            <input
                type="text"
                placeholder="Buscar por título o autor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />
            <ul className="libro-list">
                {filteredBooks.map(book => (
                    <li key={book.id} className="libro-item">
                        <div className="libro-info">
                            <p><strong>Libro:</strong> {book.title || 'Sin título'}</p>
                            <p><strong>Autor:</strong> {book.author || 'Sin autor'}</p>
                            <p>
                                <strong>Categoría:</strong>{' '}
                                {Array.isArray(book.categories) ? book.categories.join(', ') : 'Sin categoría'}
                            </p>
                        </div>
                        <div className="buttons-container">
                            <button
                                className="modify-btn"
                                onClick={() => handleEdit(book.id)}
                            >
                                Modificar
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(book.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </Header>);
};

export default LibroList;
