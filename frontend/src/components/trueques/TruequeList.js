import '../../css/App.css'; 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProposals, getMyAsks, acceptProposal, rejectProposal } from '../../services/exchangeService';
import { getBooks } from '../../services/LibroService';
import Header from '../Header';
import usePopup from '../html-elements/usePopup';
import BooksGrid from '../html-elements/BooksGrid';

const Render = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState({});
    const [pending, setPending] = useState([]);
    const [incomming, setIncomming] = useState([]);
    const [PopupComponent, showPopup] = usePopup();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                let newBooks = {};
                let newIncomming = await getMyAsks() || [];
                let newPending = await getMyProposals() || [];

                const tempBooks = await getBooks();
                for (var i = 0, count = tempBooks.length; i < count; i++) {
                    var book = tempBooks[i];
                    newBooks[book.id] = book;
                }
                
                setBooks(newBooks);
                setPending(newPending);
                setIncomming(newIncomming);
            } catch (error) {
                console.error('Error al cargar trueques:', error);
                setBooks({});
                setPending([]);
                setIncomming([]);
            }
        };
        fetchBooks();
    }, []);

    const handleAceptar = async(proposalId) => {
        try {
            if (window.confirm('¿Desea aceptar el trueque?')) {
                await acceptProposal(proposalId);
                showPopup({message:'Trueque aceptado.'});
            }
        } catch (error) {
            console.error('Error al aceptar trueque: ', error);
            showPopup({message:'Error al aceptar trueque. Intente nuevamente más tarde.'});
        }
    };

    const handleRechazar = async(proposalId) => {
        try {
            if (window.confirm('¿Desea rechazar el trueque?')) {
                await rejectProposal(proposalId);
                showPopup({message:'Trueque rechazado.'});
            }
        } catch (error) {
            console.error('Error al rechazar trueque: ', error);
            showPopup({message:'Error al rechazar trueque. Intente nuevamente más tarde.'});
        }
    };

    return (
        <Header>
            <h2 className="libro-list-title">Mis intercambios</h2>
            <button 
                className="add-btn"
                onClick={() => navigate('/libros-disponibles')}
            >
                Ver Libros Disponibles
            </button>
            <div className="libro-list-container">
                <div className="trueque-container">
                    <h3 className="libro-list-title">Trueques entrantes</h3>
                    {incomming.map(item => {
                        const requestedBook = books[item.askedBookId];
                        const offeredBook = books[item.proposedBookId];
                        const displayBooks = [requestedBook, offeredBook].filter(Boolean);

                        const proposingUser = offeredBook?.UserBook?.[0]?.user;

                        return (
                            <div key={item.id} className="trueque-item">
                                <div className="trueque-card">
                                    <BooksGrid
                                        titleClass="trueque-title"
                                        books={displayBooks}>
                                    </BooksGrid>
                                    <div className="libro-info">
                                        <p><strong>Quiere tu libro:</strong> {requestedBook?.title || 'No encontrado'}</p>
                                        <p><strong>Te ofrece el libro:</strong> {offeredBook?.title || 'No encontrado'}</p>
                                        <p><strong>Estado trueque:</strong> {item.status || 'Desconocido'}</p>
                                        <p><strong>Usuario que propone:</strong> {proposingUser?.name || 'Desconocido'} ({proposingUser?.email || 'Sin email'})</p>
                                    </div>
                                    <div className="buttons-container">
                                        <button className="modify-btn" onClick={() => handleAceptar(item.id)}>Aceptar</button>
                                        <button className="delete-btn" onClick={() => handleRechazar(item.id)}>Rechazar</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
    
                <div className="trueque-container">
                    <h3 className="libro-list-title">Trueques solicitados</h3>
                    {pending.map(item => {
                        const requestedBook = books[item.askedBookId];
                        const offeredBook = books[item.proposedBookId];
                        const displayBooks = [requestedBook, offeredBook].filter(Boolean);

                        const requestedUser = requestedBook?.UserBook?.[0]?.user;

                        return (
                            <div key={item.id} className="trueque-item">
                                <div className="trueque-card">
                                    <BooksGrid
                                        titleClass="trueque-title"
                                        books={displayBooks}>
                                    </BooksGrid>
                                    <div className="libro-info">
                                        <p><strong>Pediste el libro:</strong> {requestedBook?.title || 'No encontrado'}</p>
                                        <p><strong>Ofreciste tu libro:</strong> {offeredBook?.title || 'No encontrado'}</p>
                                        <p><strong>Estado trueque:</strong> {item.status || 'Desconocido'}</p>
                                        <p><strong>Usuario a quien propones:</strong> {requestedUser?.name || 'Desconocido'} ({requestedUser?.email || 'Sin email'})</p>
                                    </div>
                                    {/* Aquí podrías añadir un botón para cancelar la propuesta si deseas */}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {PopupComponent}
        </Header>
    );
};

export default Render;
