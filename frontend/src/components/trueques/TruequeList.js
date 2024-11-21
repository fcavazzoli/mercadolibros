import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProposals, getMyAsks } from '../../services/exchangeService';
import { getBooks } from '../../services/LibroService';
import '../../css/LibroList.css';
import Header from '../Header'

const Render = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState({});
    const [pending, setPending] = useState([]);
    const [incomming, setIncomming] = useState([]);


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setIncomming(await getMyAsks() || [{}]);
                setPending(await getMyProposals() || [{}]);
                
                const tempBooks = await getBooks();
                var newBooks = {};
                for (var i = 0, count = tempBooks.length; i < count; i++) {
                    var book = tempBooks[i];
                    newBooks[book.id] = tempBooks[i];
                }
                setBooks(newBooks);
            } catch (error) {
                console.error('Error al cargar trueques:', error);
                setIncomming([]);
                setPending([]);
            }
        };
        fetchBooks();
    }, []);

    const handleDelete = async (bookId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
            try {
                //await deleteBook(bookId);
                setBooks(books.filter(book => book.id !== bookId));
                alert('Libro eliminado exitosamente');
            } catch (error) {
                console.error('Error al eliminar el libro:', error);
                alert('Error al eliminar el libro. Intente nuevamente más tarde.');
            }
        }
    };

    const handleEdit = (bookId) => {
        navigate(`/edit-book/${bookId}`);
    };

    return (<Header>
        <p><h2 className="libro-list-title">Lista de Trueques</h2></p>
        <div className="libro-list-container">
            <div className="trueque-container"> <div>
            <h3 className="libro-list-title">Trueques entrantes</h3>
            <ul className="trueque-list">
                {incomming.map(item => (
                    <li key={item.id} className="libro-item">
                        <div className="libro-info">
                            <p><strong>Libro:</strong> {books[item.bookId].title || 'Sin título'}</p>
                            <p><strong>Autor:</strong> {books[item.bookId].author || 'Sin autor'}</p>
                            <p>
                                <strong>Categoría:</strong>{' '} {
                                    Array.isArray(books[item.bookId].categories) ? 
                                    books[item.bookId].categories.join(', ') 
                                    : 'Sin categoría'
                                }
                            </p>
                        </div>
                        <div className="buttons-container">
                            <button className="modify-btn" onClick={() => handleEdit(item.id)}>Modificar</button>
                            <button className="delete-btn" onClick={() => handleDelete(item.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
            </div><div>
            <h3 className="libro-list-title">Trueques solicitados</h3>
            <ul className="trueque-list">
                {pending.map(item => (
                    <li key={item.id} className="libro-item">
                        <div className="libro-info">
                            <p><strong>Libro:</strong> {item.title || 'Sin título'}</p>
                        </div>
                        <div className="buttons-container">
                            <button className="modify-btn" onClick={() => handleEdit(item.id)}>Modificar</button>
                            <button className="delete-btn" onClick={() => handleDelete(item.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
            </div>
            </div>
        </div>
    </Header>);
};

export default Render;
