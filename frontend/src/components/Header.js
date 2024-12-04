import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Header.css';

function Render({ children }) {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('sessionToken'); // Elimina el token de sesión
    navigate('/login'); // Redirige al usuario al login
  };

  return (
    <div className="layout">
      {/* Barra lateral */}
      <nav className="sidebar">
        <ul className="menu">
          <li>
            <button onClick={() => navigate('/')}>Home</button>
          </li>
          <li>
            <button onClick={() => navigate('/books')}>Libros</button>
          </li>
          <li>
            <button onClick={() => navigate('/exchanges')}>Trueques</button>
          </li>
          <li>
            <button onClick={() => navigate('/perfil')}>Perfil</button>
          </li>
          <li>
            <button onClick={signOut}>Cerrar Sesión</button>
          </li>
        </ul>
      </nav>

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