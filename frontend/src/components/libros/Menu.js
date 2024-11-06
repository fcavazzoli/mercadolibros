import React from 'react';
import '../../css/LibroMenu.css'; // Asegúrate de usar la ruta correcta

const LibroMenu = () => {
    return (
        <div className="libro-menu-container">
            <div className="libro-menu-box">
                <h2>Gestión de lista de libros</h2>
                <button onClick={() => {/* lógica para agregar libro */}}>Agregar libro</button>
                <button onClick={() => {/* lógica para modificar libro */}}>Modificar libro</button>
                <button onClick={() => {/* lógica para eliminar libro */}}>Eliminar libro</button>
            </div>
        </div>
    );
};

export default LibroMenu;

