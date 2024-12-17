import '../../css/App.css'; 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import usePopup from '../html-elements/usePopup';

function Render() {
  const navigate = useNavigate();
  const [PopupComponent, showPopup] = usePopup();
  const isAuthenticated = Boolean(localStorage.getItem('sessionToken'));
  
  const handleLogout = () => {
    showPopup({message:'Desea cerrar sesión?', onConfirm:() => {
      localStorage.removeItem('sessionToken'); // Remove the session token
      window.location.href = '/';
    }});
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
            <img src={"/logo1.png"} className="banner-logo" alt="logo" onClick={() => navigate('/')} />
            
            <div className="banner-text">
            <h1>¡Bienvenido a Mercado Libros!</h1>
            <p>El mercado para amantes de los libros.</p>
            </div>
        </div>
        {PopupComponent}
    </div>
  );
}

export default Render;