import '../../css/App.css'; 
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBook, getMyBooks } from '../../services/LibroService';
import Header from '../Header'
import BooksGrid from '../html-elements/BooksGrid';

const LibroList = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const getEventBook = function(event) {
        return filteredBooks[parseInt(event.currentTarget.getAttribute("index"))];
    }

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

    const handleDelete = async (evClick) => {
        const book = getEventBook(evClick);

        if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
            try {
                let response = await deleteBook(book.id);
                
                if (response.message.includes("ExchangeProposal")) {
                    alert('No puede eliminar el libro ya que se encuenta en un trueque no cerrado');
                    return;
                }

                setBooks(await getMyBooks() || []);
                alert(response.message);
            } catch (error) {
                console.error('Error al eliminar el libro:', error);
                alert('Error al eliminar el libro. Intente nuevamente más tarde.');
            }
        }
    };

    const handleEdit = (evClick) => {
        const book = getEventBook(evClick);
        navigate(`/edit-book/${book.id}`);
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
          <BooksGrid books={filteredBooks}>
             {/* Child buttons will receive the 'book' prop */}
             <button className='libro-update' onClick={(e) => handleEdit(e)}>
                Actualizar
            </button>
            <button className='libro-delete' onClick={(e) => handleDelete(e)}>
                Borrar
            </button>
          </BooksGrid>

          
        </div>
      </Header>);
};

export default LibroList;
