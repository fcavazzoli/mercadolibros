import React from "react";
import '../css/App.css'; 
import { useNavigate } from 'react-router-dom';

function LoginSuccess() {
    const navigate = useNavigate();
    
    const goBack = (e) => {
        e.preventDefault();
        window.location.href = '/';
    };

    return (
        <div className="login-success-wrapper">
            <div className="login-success-container">
                <h2>Registro Exitoso</h2>
                <form onSubmit={goBack} className="login-success-form">
                    <p className="login-success-message">
                        Tu cuenta se ha registrado exitosamente.
                    </p>
                    <button type="submit" className="login-success-button">
                        Volver al Inicio
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginSuccess;
