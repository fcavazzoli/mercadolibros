import '../../css/App.css'; 
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Render() {
  const navigate = useNavigate();

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
      </ul>
    </nav>
  );
}

export default Render;