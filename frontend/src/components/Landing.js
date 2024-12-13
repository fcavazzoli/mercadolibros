import '../css/App.css'; 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFiltered } from '../services/LibroService';
import { Backend } from '../services/backend';

const backend = new Backend();

function Landing() {
  const [books, setBooks] = useState([]);
  const [terrorBooks, setTerrorBooks] = useState([]);
  const [fictionBooks, setFictionBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
    fetchTerrorBooks();
    fetchFictionBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getFiltered();
      const books = data.map((item) => ({
        _id: item._id,
        title: item.title,
        author: item.author,
        photo: backend.url.replace("api", "") + item.photo,
        condition: item.condition,
      }));
      setBooks(books || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchTerrorBooks = async () => {
    try {
      const data = await getFiltered({ byCategory: "Terror" });
      const terrorBooks = data.map((item) => ({
        _id: item._id,
        title: item.title,
        author: item.author,
        photo: backend.url.replace("api", "") + item.photo,
        condition: item.condition,
      }));
      setTerrorBooks(terrorBooks || []);
    } catch (error) {
      console.error('Error fetching terror books:', error);
    }
  };

  const fetchFictionBooks = async () => {
    try {
      const data = await getFiltered({ byCategory: "Ficción" });
      const fictionBooks = data.map((item) => ({
        _id: item._id,
        title: item.title,
        author: item.author,
        photo: backend.url.replace("api", "") + item.photo,
        condition: item.condition,
      }));
      setFictionBooks(fictionBooks || []);
    } catch (error) {
      console.error('Error fetching fiction books:', error);
    }
  };

  return (
    <div>
      {/* Contenido principal */}
      <main className="content">
        {/* Libros Disponibles */}
        <h2 className="content-title">Libros Disponibles</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book._id} className="book-card">
              <img
                src={book.photo || '/book-placeholder.png'}
                alt={book.title || 'Imagen no disponible'}
                className="book-image"
              />
              <div className="book-info">
                <h3 className="book-title">{book.title || 'Título no disponible'}</h3>
                <p className="book-author">Autor: {book.author || 'Autor desconocido'}</p>
                <p className="book-condition">Estado: {book.condition || 'No especificado'}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Libros de Terror */}
        <h2 className="content-title">Libros de Terror</h2>
        <div className="books-grid">
          {terrorBooks.map((book) => (
            <div key={book._id} className="book-card">
              <img
                src={book.photo || '/book-placeholder.png'}
                alt={book.title || 'Imagen no disponible'}
                className="book-image"
              />
              <div className="book-info">
                <h3 className="book-title">{book.title || 'Título no disponible'}</h3>
                <p className="book-author">Autor: {book.author || 'Autor desconocido'}</p>
                <p className="book-condition">Estado: {book.condition || 'No especificado'}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Libros de Ficción */}
        <h2 className="content-title">Libros de Ficción</h2>
        <div className="books-grid">
          {fictionBooks.map((book) => (
            <div key={book._id} className="book-card">
              <img
                src={book.photo || '/book-placeholder.png'}
                alt={book.title || 'Imagen no disponible'}
                className="book-image"
              />
              <div className="book-info">
                <h3 className="book-title">{book.title || 'Título no disponible'}</h3>
                <p className="book-author">Autor: {book.author || 'Autor desconocido'}</p>
                <p className="book-condition">Estado: {book.condition || 'No especificado'}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Landing;