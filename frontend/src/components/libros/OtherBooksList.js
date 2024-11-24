import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotMyBooks } from '../../services/LibroService';
import Header from '../Header';

const OtherBooksList = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getNotMyBooks();
                setBooks(response || []);
            } catch (error) {
                console.error('Error al cargar libros:', error);
                setBooks([]);
            }
        };
        fetchBooks();
    }, []);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Header>
            <div className="libro-list-container">
                <div className="header-actions">
                    <h2 className="libro-list-title">Libros Disponibles</h2>
                    <button 
                        className="back-btn"
                        onClick={() => navigate('/trueques')}
                    >
                        Volver a Trueques
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Buscar por título o autor"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
                <div className="libro-list">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className="libro-item">
                            <div className="libro-info">
                                <p><strong>Libro:</strong> {book.title}</p>
                                <p><strong>Autor:</strong> {book.author}</p>
                                <p>
                                    <strong>Categoría:</strong>{' '}
                                    {book.categories?.length > 0 
                                        ? book.categories.join(', ') 
                                        : 'Sin categoría'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Header>
    );
};

export default OtherBooksList; 