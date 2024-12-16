import '../css/App.css'; 
import { useState, useEffect } from 'react';
import { Backend } from '../services/backend';
import { getOtherBooks } from '../services/LibroService';
import Header from './Header';
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
    fetchAndDivideBooks(); // Cargamos los libros al montar el componente
  }, []);

  const fetchAndDivideBooks = async () => {
    try {
      const response = await getOtherBooks();
      const allBooks = response.message.otherBooks || [];

      console.log('Libros obtenidos:', allBooks); // Debug: Verifica los datos obtenidos

      const formattedBooks = allBooks.map((item) => ({
        _id: item._id,
        title: item.title,
        author: item.author,
        photo: backend.url.replace("api", "") + item.photo,
        condition: item.condition,
        categories: item.categories || ["Sin Categoría"], // Normaliza el campo de categorías
      }));

      setBooks(formattedBooks);

      // Filtrar libros por categorías
      setTerrorBooks(filterByCategory(formattedBooks, "Terror"));
      setFictionBooks(filterByCategory(formattedBooks, "Ficción"));
      setNoFictionBooks(filterByCategory(formattedBooks, "No Ficción"));
      setCienciaFictionBooks(filterByCategory(formattedBooks, "Ciencia Ficción"));
      setFantaisaBooks(filterByCategory(formattedBooks, "Fantasia"));
      setHistoriaBooks(filterByCategory(formattedBooks, "Historia"));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const filterByCategory = (books, category) => {
    return books.filter((book) => {
      // Asegúrate de que book.categories sea un arreglo y verifica si incluye la categoría
      return Array.isArray(book.categories) && 
             book.categories.some((cat) => cat.toLowerCase() === category.toLowerCase());
    });
  };

  return (
    <Header>
      <div>
        <main className="content">
          <BooksGrid title="Libros Disponibles" books={books} />
          <BooksGrid titleClass="subtitle" title="Libros de Terror" books={terrorBooks} />
          <BooksGrid titleClass="subtitle" title="Libros de Ficción" books={fictionBooks} />
          <BooksGrid titleClass="subtitle" title="Libros de No Ficción" books={nofictionBooks} />
          <BooksGrid titleClass="subtitle" title="Libros de Ciencia Ficción" books={cienciafictionBooks} />
          <BooksGrid titleClass="subtitle" title="Libros de Fantasia" books={fantasiaBooks} />
          <BooksGrid titleClass="subtitle" title="Libros de Historia" books={historiaBooks} />
        </main>
      </div>
    </Header>
  );
}

export default HomePage;