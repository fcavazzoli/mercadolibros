import '../../css/App.css'; 
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBook, getMyBooks } from '../../services/LibroService';
import Header from '../Header'
import Carousel from '../html-elements/Carousel';
import BookImage from '../html-elements/BookImage';

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

    return (<Header>
        <div className="libro-list-container">
          <h2 className="libro-list-title">Mis Libros</h2>
          <div className="controls-container">
            <button className="agregar-btn" onClick={() => navigate('/add-book')} >Agregar libro</button>
            <input
              type="text"
              placeholder="Buscar por título, autor o categoría"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
          </div>

          <Carousel autoPlay="true" interval="500">
            {filteredBooks.map((book) => (
            <div className="libro-item" key={book.id}>
                <div className="libro-content">
                <p><strong>Libro:</strong> {book.title || 'Sin título'}</p>
                <p><strong>Autor:</strong> {book.author || 'Sin autor'}</p>
                <p>
                    <strong>Categoría:</strong>{' '}
                    {book.categories && book.categories.length > 0
                    ? book.categories.join(', ')
                    : 'Sin categoría'}
                </p>
                </div>

                <BookImage book={book} />
                <div className="buttons-container">
                  <button className="modify-btn" onClick={() => handleEdit(book.id)} >
                    Modificar
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(book.id)} >
                    Eliminar
                  </button>
                </div>
            </div>
            ))}
          </Carousel>
          
        </div>
      </Header>);
};

export default LibroList;
