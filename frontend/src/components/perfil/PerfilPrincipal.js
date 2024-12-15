//import '../../css/App.css';
import '../../css/EditForms.css';
import Header from '../Header'
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser} from '../../services/profileService';


const PerfilMenu = () => {
    const [userInfo, setUserInfo] = useState(null);  // Estado para almacenar la info del usuario
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser();  // Obtener la info del usuario
                if (response && response.user) { // Verificar que la propiedad user exista
                    setUserInfo(response.user);  // Guardar la info del usuario en el estado
                }
            } catch (error) {
                console.error('Error al cargar la info del usuario:', error);
                alert('No se pudo cargar la información del usuario.');
            }
        };
        fetchUser();
    }, []);  // El array vacío significa que el efecto solo se ejecutará una vez al montar el componente

    // Si userInfo no está disponible aún (por ejemplo, mientras se carga), puedes mostrar un loading o un mensaje
    if (!userInfo) {
        return <div>Cargando...</div>;
    }

    // Desestructurar los datos del usuario
    const { email, name, address, phoneNumber } = userInfo

    return (
        <Header>
            <div className="edit-form-container"> {/* Cambiar aquí */}
                <div>
                    <div>
                        <h2>Información Personal</h2>
                    </div>
                    <div>
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
                    </div>
                    <button 
                        className="perfil-button" 
                        onClick={() => navigate('/EditarPerfil')}
                    >
                        Modificar Información
                    </button>
                </div>
            </div>
        </Header>
    );
};

export default PerfilMenu;