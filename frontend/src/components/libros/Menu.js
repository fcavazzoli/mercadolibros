// LibroMenu.js
import React from 'react';
import Global from '../Global'
import '../../css/LibroMenu.css';
import { useNavigate } from 'react-router-dom';

const LibroMenu = () => {
    const navigate = useNavigate();

    return (<Global>
        <div className="libro-menu-container">
        <div className='libro-menu-box'>
            <h2>Gestión de lista de libros</h2>
            <button onClick={() => navigate('/add-book')}>Agregar libro</button>
            <button onClick={() => navigate('/books')}>Modificar libro</button>
            <button onClick={() => navigate('/books')}>Eliminar libro</button>
        </div>
        </div>
    </Global>);
};

export default LibroMenu;
