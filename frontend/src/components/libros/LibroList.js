import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBook, getMyBooks } from '../../services/LibroService';
import '../../css/LibroList.css';
import Header from '../Header'

const LibroList = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setBooks(await getMyBooks() || []);
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
                let response = await deleteBook(bookId);
                setBooks(await getMyBooks() || []);
                alert(response.message);
            } catch (error) {
                console.error('Error al eliminar el libro:', error);
                alert('Error al eliminar el libro. Intente nuevamente más tarde.');
            }
        }
    };

    const handleEdit = (bookId) => {
        navigate(`/edit-book/${bookId}`);
    };

    const handleImageError = (e) => {
        e.target.onerror = null; // Prevents infinite loop if default image also fails
        e.target.src = '/default-book.png'; // Agregar una foto Default para cuando no hay imagen
    };

    const filteredBooks = books.filter(book =>
        (book.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.author || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.categories || []).some(category => 
            category.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (<Header>
        <div className="libro-list-container">
            <h2 className="libro-list-title">Mis Libros</h2>
            <div className="controls-container">
                <button 
                    className="agregar-btn"
                    onClick={() => navigate('/add-book')}
                >
                    Agregar libro
                </button>
                <input
                    type="text"
                    placeholder="Buscar por título, autor o categoría"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
            </div>
            <ul className="libro-list">
                {filteredBooks.map(book => (
                    <li key={book.id} className="libro-item">
                        <div className="libro-content">
                            <div className="libro-info">
                                <p><strong>Libro:</strong> {book.title || 'Sin título'}</p>
                                <p><strong>Autor:</strong> {book.author || 'Sin autor'}</p>
                                <p>
                                    <strong>Categoría:</strong>{' '}
                                    {book.categories && book.categories.length > 0 
                                        ? book.categories.join(', ') 
                                        : 'Sin categoría'}
                                </p>
                            </div>
                            <div className="libro-photo">
                                {book.photo ? (
                                    <img 
                                        src={book.photo} 
                                        alt={book.title} 
                                        onError={handleImageError}
                                    />
                                ) : (
                                    <div className="no-photo">
                                        <img 
                                            src="/default-book.png" 
                                            alt="Default book cover"
                                        />
                                    </div>
                                )}
                            </div>
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
