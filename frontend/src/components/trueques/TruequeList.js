import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProposals, getMyAsks, acceptProposal, rejectProposal } from '../../services/exchangeService';
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
                let newBooks = {};
                let newIncomming = await getMyAsks() || [];
                let newPending = await getMyProposals() || [];

                const tempBooks = await getBooks();
                for (var i = 0, count = tempBooks.length; i < count; i++) {
                    var book = tempBooks[i];
                    newBooks[book.id] = book;
                }
                
                setBooks(newBooks);
                setPending(newPending);//.filter(item => newBooks[item.proposedBookId] != undefined));
                setIncomming(newIncomming);//.filter(item => newBooks[item.proposedBookId] != undefined));
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
                alert('Trueque aceptado.');
            }
        } catch (error) {
            console.error('Error al aceptar trueque: ', error);
            alert('Error al aceptar trueque. Intente nuevamente más tarde.');
        }
    };

    const handleRechazar = async(proposalId) => {
        try {
            if (window.confirm('¿Desea rechazar el trueque?')) {
                await rejectProposal(proposalId);
                alert('Trueque rechazado.');
            }
        } catch (error) {
            console.error('Error al rechazar trueque: ', error);
            alert('Error al rechazar trueque. Intente nuevamente más tarde.');
        }
        
    };

    const handleCancelar = async(proposalId) => {
        try {
            if (window.confirm('¿Desea aceptar el trueque?')) {
                await acceptProposal(proposalId);
                alert('Trueque aceptado.');
            }
        } catch (error) {
            console.error('Error al aceptar trueque: ', error);
            alert('Error al aceptar trueque. Intente nuevamente más tarde.');
        }
        
    };

    return (<Header>
        <p><h2 className="libro-list-title">Lista de Trueques</h2></p>
        <button 
            className="add-btn"
            onClick={() => navigate('/libros-disponibles')}
        >
            Ver Libros Disponibles
        </button>
        <div className="libro-list-container">
            <div className="trueque-container"> <div>
            <h3 className="libro-list-title">Trueques entrantes</h3>
            <ul className="trueque-list">
                {incomming.map(item => (
                    <li key={item.id} className="libro-item">
                        <div className="libro-info">
                            <p><strong>Quiere:</strong> {books[item.askedBookId   ]?.title || 'No encontrado'}</p>
                            <p><strong>Ofrece:</strong> {books[item.proposedBookId]?.title || 'No encontrado'}</p>
                            <p><strong>Estado:</strong> {item.status || 'Desconocido'}</p>
                        </div>
                        <div className="buttons-container">
                            <button className="modify-btn" onClick={() => handleAceptar(item.id)}>Aceptar</button>
                            <button className="delete-btn" onClick={() => handleRechazar(item.id)}>Rechazar</button>
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
                            <p><strong>Pediste:</strong> {books[item.askedBookId   ]?.title || 'No encontrado'}</p>
                            <p><strong>Ofreciste:</strong> {books[item.proposedBookId]?.title || 'No encontrado'}</p>
                            <p><strong>Estado:</strong> {item.status || 'No encontrado'}</p>
                        </div>
                        <div className="buttons-container">
                            {/* <button className="delete-btn" onClick={() => handleCancelar(item.id)}>Cancelar</button> */}
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
