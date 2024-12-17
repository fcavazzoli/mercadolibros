import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import { getOtherBooks } from '../../services/LibroService';
import BooksGrid from '../html-elements/BooksGrid';
import { Backend } from '../../services/backend';

const backend = new Backend();

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
                const allBooks = response.message.otherBooks || [];
          
                console.log('Libros obtenidos:', allBooks); // Debug: Verifica los datos obtenidos
          
                const formattedBooks = allBooks.map((item) => ({
                ...item,
                  photo: backend.url.replace("api", "") + item.photo,
                  categories: item.categories || ["Sin Categoría"], // Normaliza el campo de categorías
                }));
                setBooks(formattedBooks);
            } catch (error) {
                console.error('Error al cargar libros:', error);
                setError('Error al cargar los libros');
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    // Declara el useMemo antes de los if() return
    const filteredBooks = useMemo(() => 
        books.filter(book =>
            (book.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (book.author || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (book.categories || []).some(category => 
                category.toLowerCase().includes(searchTerm.toLowerCase())
            )
        ), 
        [books, searchTerm]
    );

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    const getEventBook = (event) => {
        return filteredBooks[parseInt(event.currentTarget.getAttribute("index"))];
    }

    const handleSolicitar = (evClick) => {
        const book = getEventBook(evClick);
        navigate(`/ask-trade/${book.id}`);
    };

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

                <BooksGrid books={filteredBooks}>
                    <button className="modify-btn" onClick={(e) => handleSolicitar(e)}>
                        Solicitar
                    </button>
                </BooksGrid>
            </div>
        </Header>
    );
};

export default OtherBooksList;
