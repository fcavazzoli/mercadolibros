import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import { getOtherBooks } from '../../services/LibroService';

const OtherBooksList = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getOtherBooks();
                setBooks(response.message.otherBooks || []);
            } catch (error) {
                console.error('Error al cargar libros:', error);
                setError('Error al cargar los libros');
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.categories || []).some(category => 
            category.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <Header>
            <div className="libro-list-container">
                <div className="header-actions">
                    <h2 className="libro-list-title">Libros Disponibles</h2>
                    <button 
                        className="back-btn"
                        onClick={() => navigate('/exchanges')}
                    >
                        Volver a Trueques
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Buscar por título, autor o categoría"
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
                            <div className="buttons-container">
                                <button className="modify-btn" onClick={() => navigate(`/ask-trade/${book.id}`)}>
                                    Solicitar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Header>
    );
};

export default OtherBooksList; 