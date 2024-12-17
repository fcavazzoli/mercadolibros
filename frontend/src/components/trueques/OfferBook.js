import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import Header from '../Header';
import { getBookById, getMyBooks } from '../../services/LibroService';
import { proposeExchange } from '../../services/exchangeService'
import usePopup from '../html-elements/usePopup';
import BooksGrid from '../html-elements/BooksGrid';

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
                const fetchedBook = await getBookById(bookId) || {};
                const myBooksRes = await getMyBooks() || [];
                setAskedBook(fetchedBook);
                setMyBooks(myBooksRes);
            } catch (error) {
                console.error('Error al generar tradeo de libros:', error);
                setError('Error al generar tradeo de libros');
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, [bookId]);

    const handleGenerarTrueque = async(idDelPropuesto) => {
        try {
            showPopup({message: '¿Desea proponer trueque?', onConfirm: async()=> {
                const resp = await proposeExchange(
                    idDelPropuesto, 
                    askedBook.id, 
                    askedBook.UserBook[0].user.id
                );
                if (resp?.id > 0) {
                    showPopup({ message:'Trueque propuesto.', onComplete:() => navigate('/exchanges')});
                } else {
                    console.error('Error al proponer trueque: ', resp);
                    showPopup({message:'Error al proponer trueque. Intente nuevamente más tarde.'});
                }
            }})
        } catch (error) {
            console.error('Error al proponer trueque: ', error);
            showPopup({message:'Error al proponer trueque. Intente nuevamente más tarde.'});
        }
    };

    // Función para obtener el libro según el índice asignado en BooksGrid
    const getEventBook = (event) => {
        return myBooks[parseInt(event.currentTarget.getAttribute("index"))];
    }

    const handleGenerarTruequeFromIndex = (evClick) => {
        const book = getEventBook(evClick);
        handleGenerarTrueque(book.id);
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
                
                {/* Usamos BooksGrid con mis libros */}
                <BooksGrid books={myBooks}>
                    <button className="modify-btn" onClick={handleGenerarTruequeFromIndex}>
                        Ofrecer
                    </button>
                </BooksGrid>

            </div>
            {PopupComponent}
        </Header>
    );
};

export default OtherBooksList;
