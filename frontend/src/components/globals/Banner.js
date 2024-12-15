import '../../css/App.css'; 
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Render() {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem('sessionToken'));
  
  const handleLogout = () => {
    localStorage.removeItem('sessionToken'); // Remove the session token
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="banner">
        <div className="auth-buttons">
            {isAuthenticated ? (
            <button className="logout-button" onClick={handleLogout}>
                Cerrar Sesión
            </button>
            ) : (
            <>
                <button className="login-button" onClick={() => navigate('/login')}>
                Iniciar Sesión
                </button>
                <button className="register-button" onClick={() => navigate('/register')}>
                Registrarse
                </button>
            </>
            )}
        </div>
        <div className="banner-content">
            <img src={"/logo192.png"} className="banner-logo" alt="logo" onClick={() => navigate('/')} />
            
            <div className="banner-text">
            <h1>¡Bienvenido a Mercado Libros!</h1>
            <p>El mercado para amantes de los libros.</p>
            </div>
        </div>
    </div>
  );
}

export default Render;