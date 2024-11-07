import React, { useState } from 'react';
import '../../css/LibroMenu.css'; // Asegúrate de usar la ruta correcta
import AddBook from './Add'; 
import DeleteBook from './Delete'; 
import ModifyBook from './Modify';
import BookList from './BookList';

const LibroMenu = () => {
    
    const [currentComponent, setCurrentComponent] = useState(null); 
    
    const renderComponent = () => { 
        switch (currentComponent) { 
            case 'add': return <AddBook />; 
            case 'delete': return <DeleteBook />; 
            case 'modify': return <ModifyBook />;
            case 'show': return <BookList />;
            default: return null;
        }
    };

    return (
        <div className="libro-menu-container">
            <div className="libro-menu-box">
                <h2>Gestión de lista de libros</h2>
                <button onClick={() => setCurrentComponent('add')}>Agregar libro</button>
                <button onClick={() => setCurrentComponent('modify')}>Modificar libro</button>
                <button onClick={() => setCurrentComponent('delete')}>Eliminar libro</button>
                <button onClick={() => setCurrentComponent('show')}>Mostrar libros</button>
                {renderComponent()}
            </div>
        </div>
    );
};

export default LibroMenu;

