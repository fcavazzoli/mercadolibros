import '../css/App.css'; 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFiltered } from '../services/LibroService';
import { Backend } from '../services/backend';
import Global from '../login/Global'
import BooksGrid from './html-elements/BooksGrid';

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
    <Global>
      {/* Contenido principal */}
      <main className="content">
        <BooksGrid title="Libros Disponibles" books={books}></BooksGrid>
        <BooksGrid title="Libros de Ficción" books={fictionBooks}></BooksGrid>
      </main>
      </Global>
  );
}

export default Landing;