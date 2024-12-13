import '../css/App.css'; 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFiltered } from '../services/LibroService';
import { Backend } from '../services/backend';
import Header from './Header'
import BooksGrid from './html-elements/BooksGrid';

const backend = new Backend();

function HomePage() {
  const [books, setBooks] = useState([]);
  const [terrorBooks, setTerrorBooks] = useState([]);
  const [fictionBooks, setFictionBooks] = useState([]);
  const [nofictionBooks, setNoFictionBooks] = useState([]);
  const [cienciafictionBooks, setCienciaFictionBooks] = useState([]);
  const [fantasiaBooks, setFantaisaBooks] = useState([]);
  const [historiaBooks, setHistoriaBooks] = useState([]);

  useEffect(() => {
    subDivideBooks(setBooks);
    subDivideBooks(setTerrorBooks,"Terror");
    subDivideBooks(setFictionBooks, "Ficción");
    subDivideBooks(setNoFictionBooks, "No Ficción");
    subDivideBooks(setCienciaFictionBooks, "Ciencia Ficción");
    subDivideBooks(setFantaisaBooks, "Fantasia");
    subDivideBooks(setHistoriaBooks, "Historia");
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
        category: item.category,
      }));
      setBooks(books || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const subDivideBooks = async (setter, category) => {
    try {
      const data = await getFiltered({ byCategory: category });
      const remote = data.map((item) => ({
        _id: item._id,
        title: item.title,
        author: item.author,
        photo: backend.url.replace("api", "") + item.photo,
        condition: item.condition,
        category: item.category,
      }));
      setter(remote || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  return (
    <Header>
      <div>
        {/* Contenido principal */}
        <main className="content">
          {/* Libros Disponibles */}
          <BooksGrid title="Libros Disponibles" books={books} />
          <BooksGrid title="Libros de Terror" books={terrorBooks} />
          <BooksGrid title="Libros de Ficción" books={fictionBooks} />
          <BooksGrid title="Libros de No Ficción" books={nofictionBooks} />
          <BooksGrid title="Libros de Ciencia Ficción" books={cienciafictionBooks} />
          <BooksGrid title="Libros de Fantasia" books={fantasiaBooks} />
          <BooksGrid title="Libros de Historia" books={historiaBooks} />
        </main>
      </div>
    </Header>
  );
}

export default HomePage;