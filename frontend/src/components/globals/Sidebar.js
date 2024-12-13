import '../../css/App.css'; 
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Render() {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('sessionToken'); // Elimina el token de sesión
    navigate('/login'); // Redirige al usuario al login
  };

  return (
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
  );
}

export default Render;