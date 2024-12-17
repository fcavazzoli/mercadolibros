import '../css/App.css'; 
import { useState, useEffect } from 'react';
import { Backend } from '../services/backend';
import { getOtherBooks } from '../services/LibroService';
import Header from './Header';
import BooksGrid from './html-elements/BooksGrid';

const backend = new Backend();

function HomePage() {
  const [books, setBooks] = useState([]);

  const [categoryBooks, setCategoryBooks] = useState({});

  // Lista de categorías a mostrar
  const categories = [
    "Ficción",
    "No Ficción",
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
    fetchAndDivideBooks();
  }, []);

  const fetchAndDivideBooks = async () => {
    try {
      const response = await getOtherBooks();
      const allBooks = response.message.otherBooks || [];

      const formattedBooks = allBooks.map((item) => ({
        id: item.id || item._id, // Ajusta según la propiedad única que uses
        title: item.title,
        author: item.author,
        photo: backend.url.replace("api", "") + item.photo,
        condition: item.condition,
        categories: item.categories || ["Sin Categoría"],
        UserBook: item.UserBook || []
      }));

      setBooks(formattedBooks);

      const filteredByCategory = {};
      categories.forEach(cat => {
        filteredByCategory[cat] = filterByCategory(formattedBooks, cat);
      });

      setCategoryBooks(filteredByCategory);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const filterByCategory = (books, category) => {
    return books.filter((book) =>
      Array.isArray(book.categories) &&
      book.categories.some((cat) => cat.toLowerCase() === category.toLowerCase())
    );
  };

  return (
    <Header>
      <div>
        <main className="content">
          {/* Todos los libros */}
          <BooksGrid title="Libros Disponibles" books={books} />
          
          {/* Un BooksGrid por cada categoría */}
          {categories.map((cat) => (
            <BooksGrid
              key={cat}
              titleClass="subtitle"
              title={`Libros de ${cat}`}
              books={categoryBooks[cat] || []}
            />
          ))}
        </main>
      </div>
    </Header>
  );
}

export default HomePage;
