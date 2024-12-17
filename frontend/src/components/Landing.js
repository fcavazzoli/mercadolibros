import '../css/App.css'; 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFiltered } from '../services/LibroService';
import { Backend } from '../services/backend';
import Global from '../login/Global';
import BooksGrid from './html-elements/BooksGrid';

const backend = new Backend();

function Landing() {
  const [books, setBooks] = useState([]);
  const [categoryBooks, setCategoryBooks] = useState({});
  const navigate = useNavigate();

  // Lista de categorías a mostrar
  const categories = [
    "Ficción",
    "Terror",
    "Ciencia Ficción",
    "Fantasía",
    "Historia",
    "Matemática",
    "Física",
    "Biografía",
    "Romance",
    "Misterio"
  ];

  useEffect(() => {
    fetchAllBooks();
    fetchCategoryBooks();
  }, []);

  const fetchAllBooks = async () => {
    try {
      const data = await getFiltered(); // Sin filtros, trae todos
      const formattedBooks = formatBooks(data);
      setBooks(formattedBooks);
    } catch (error) {
      console.error('Error fetching all books:', error);
    }
  };

  const fetchCategoryBooks = async () => {
    try {
      let newCategoryBooks = {};
      for (let cat of categories) {
        const data = await getFiltered({ byCategory: cat });
        const formatted = formatBooks(data);
        newCategoryBooks[cat] = formatted;
      }
      setCategoryBooks(newCategoryBooks);
    } catch (error) {
      console.error('Error fetching category books:', error);
    }
  };

  const formatBooks = (data) => {
    return data.map((item) => ({
      id: item.id || item._id,
      title: item.title,
      author: item.author,
      photo: backend.url.replace("api", "") + item.photo,
      condition: item.condition,
      categories: item.categories || [],
      UserBook: item.UserBook || []
    }));
  };

  return (
    <Global>
      {/* Contenido principal */}
      <main className="content">
        {/* Todos los libros */}
        <BooksGrid title="Libros Disponibles" books={books} />

        {/* Un BooksGrid por cada categoría */}
        {categories.map((cat) => (
          <BooksGrid
            key={cat}
            title={`Libros de ${cat}`}
            books={categoryBooks[cat] || []}
          />
        ))}
      </main>
    </Global>
  );
}

export default Landing;
