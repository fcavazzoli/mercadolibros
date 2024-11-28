
import '../../css/LibroMenu.css';
import Header from '../Header'
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser} from '../../services/profileService';
import '../../css/EditBook.css';


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
            <div className="libro-menu-container">
                <div className="libro-menu-box">
                    <h2>Información Personal</h2>
                    <p>Nombre: {name}</p>
                    <p>Email: {email}</p>
                    <p>Dirección: {address || "No disponible"}</p> {/* Si address es null, mostramos "No disponible" */}
                    <p>Teléfono: {phoneNumber || "No disponible"}</p> {/* Si phoneNumber es null, mostramos "No disponible" */}
                    <button onClick={() => navigate('/EditarPerfil')}>Modificar Información</button>
                </div>
            </div>
        </Header>
    );
};

export default PerfilMenu;