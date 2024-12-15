import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import Header from '../Header';
import { getBookById, getMyBooks } from '../../services/LibroService';
import { proposeExchange } from '../../services/exchangeService'
import usePopup from '../html-elements/usePopup';

const OtherBooksList = () => {
    const { bookId } = useParams();
    const [askedBook, setAskedBook] = useState({});
    const [myBooks, setMyBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [PopupComponent, showPopup] = usePopup();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setAskedBook(await getBookById(bookId) || {});
                setMyBooks(await getMyBooks() || []);
            } catch (error) {
                console.error('Error al generar tradeo de libros:', error);
                setError('Error al generar tradeo de libros');
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);


    const handleGenerarTrueque = async(idDelPropuesto) => {
        try {
            if (window.confirm('¿Desea proponer trueque?')) {
                const resp = await proposeExchange(idDelPropuesto, askedBook.id, askedBook.UserBook[0].user.id);
                if (resp?.id > 0) {
                    showPopup({ message:'Trueque propuesto.', onComplete:() => navigate('/exchanges')});
                } else {
                    console.error('Error al proponer trueque: ', resp);
                    showPopup({message:'Error al proponer trueque. Intente nuevamente más tarde.'});
                }
            }
        } catch (error) {
            console.error('Error al proponer trueque: ', error);
            showPopup({messge:'Error al proponer trueque. Intente nuevamente más tarde.'});
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Header>
            <div className="libro-list-container">
                <div className="header-actions">
                    <h2 className="libro-list-title">Mis Libros Disponibles</h2>
                    <button 
                        className="back-btn"
                        onClick={() => navigate('/exchanges')}
                    >
                        Volver a Trueques
                    </button>
                </div>
                
                <div className="libro-list">
                    {myBooks.map((book) => (
                        <div key={book.id} className="libro-item">
                            <div className="libro-info">
                                <p><strong>Libro:</strong> {book.title}</p>
                                <p><strong>Autor:</strong> {book.author}</p>
                                <p>
                                    <strong>Categoría:</strong>{' '}
                                    {book.categories?.length > 0 
                                        ? book.categories.join(', ') 
                                        : 'Sin categoría'}
                                </p>

                            </div>
                            <div className="buttons-container">
                                <button className="modify-btn" onClick={() => handleGenerarTrueque(book.id)}>Ofrecer</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {PopupComponent}
        </Header>
    );
};

export default OtherBooksList; 