import '../css/App.css'; 
import Banner from './globals/Banner';
import Sidebar from './globals/Sidebar';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Render({ children }) {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('sessionToken'); // Elimina el token de sesión
    navigate('/login'); // Redirige al usuario al login
  };

  return (
    <div className="layout">
      <Banner />
      <Sidebar />

      {/* Contenedor principal */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <span className="welcome-message">¡Bienvenido a Mercado Libros!</span>
        </div>
        {/* Contenido dinámico */}
        {children}
      </div>
    </div>
  );
}

export default Render;