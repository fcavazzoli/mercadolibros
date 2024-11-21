import React from 'react';
import '../css/Header.css';
import { useNavigate } from 'react-router-dom';

function Render({ children }) {
  const navigate = useNavigate();

  const signOut = function () {
    localStorage.removeItem('sessionToken');
    window.location.replace('');
  };

  return (
    <div className="general">
      <nav>
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/books')}>Libros</button>
          <button onClick={() => navigate('/exchanges')}>Trueques</button>
          <button onClick={() => signOut()}>SignOut</button>
      </nav>
      {children}
    </div>
  );
}

export default Render;