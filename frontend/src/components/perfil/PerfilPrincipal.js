import '../../css/App.css';
import Header from '../Header'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/profileService';
import usePopup from '../html-elements/usePopup';

const PerfilMenu = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    const [PopupComponent, showPopup] = usePopup();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser();
                if (response && response.user) {
                    setUserInfo(response.user);
                }
            } catch (error) {
                console.error('Error al cargar la info del usuario:', error);
                showPopup({message: 'No se pudo cargar la información del usuario.'});
            }
        };
        fetchUser();
    }, []);

    if (!userInfo) {
        return <div>Cargando...</div>;
    }

    const { email, name, address, phoneNumber } = userInfo;

    return (
        <Header>
            <div className="perfil-container">
                <div className="perfil-card">
                    <h2 className="perfil-title">Información Personal</h2>
                    <div className="info-item">
                        <span className="info-label">Nombre:</span>
                        <span className="info-value">{name}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{email}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Dirección:</span>
                        <span className="info-value">{address || "No disponible"}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Teléfono:</span>
                        <span className="info-value">{phoneNumber || "No disponible"}</span>
                    </div>
                    <button 
                        className="perfil-button" 
                        onClick={() => navigate('/EditarPerfil')}
                    >
                        Modificar Información
                    </button>
                </div>
            </div>
            {PopupComponent}
        </Header>
    );
};

export default PerfilMenu;
