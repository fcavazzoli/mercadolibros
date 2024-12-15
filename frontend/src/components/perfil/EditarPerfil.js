import '../../css/App.css'; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateInfo} from '../../services/profileService';
import Header from '../Header';
import usePopup from '../html-elements/usePopup';

const EditarPerfil = () => {

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null); 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [PopupComponent, showPopup] = usePopup();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser();  // Obtener la info del usuario
                if (response && response.user) { // Verificar que la propiedad user exista
                    setUserInfo(response.user);  // Guardar la info del usuario en el estado
                }
            } catch (error) {
                console.error('Error al cargar la info del usuario:', error);
                showPopup({message:'No se pudo cargar la información del usuario.'});
            }
        };
        fetchUser();
    }, []);  // El array vacío significa que el efecto solo se ejecutará una vez al montar el componente

    // Si userInfo no está disponible aún (por ejemplo, mientras se carga), puedes mostrar un loading o un mensaje
    if (!userInfo) {
        return <div>Cargando...</div>;
    }

    // Desestructurar los datos del usuario
    //const { email, name, address, phoneNumber } = userInfo
    const existingEmail = userInfo?.email || "No existe email registrado";
    const existingName = userInfo?.name || "No existe nombre registrado";
    const existingAddress = userInfo?.address || "No existe dirección registrada";
    const existingPhoneNumber = userInfo?.phoneNumber || "No existe teléfono registrado";
    console.log("Userinfo:",userInfo);
  

    const handleUpdateInfo = async (e) => {
        e.preventDefault();
        try {
            //const data={ name, email, adress,number};
            await updateInfo({ email, name, address,phoneNumber});
            showPopup({message: 'Perfil actualizado correctamente', onComplete:() => navigate('/perfil')});
        } catch (error) {
            console.error('Error al actualizar ela informacion del perfil:', error);
            showPopup({message: 'Error al actualizar la informacion del perfil. Intente nuevamente más tarde.' });
        }
    };

    const handleCancel = () => {
        navigate('/perfil'); // Redirige al listado de libros
    };

    return (
        <Header>
            <div className="edit-form-container">
                <h2>Modificar Información Personal</h2>
                <form onSubmit={handleUpdateInfo}>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={name}
                        placeholder={existingName} 
                        onChange={(e) => setName(e.target.value)}
                        
                    />

                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        placeholder={existingEmail} 
                        onChange={(e) => setEmail(e.target.value)}
                        
                    />

                    <label>Dirección:</label>
                    <input
                        type="text"
                        value={address}
                        placeholder={existingAddress} 
                        onChange={(e) => setAddress(e.target.value)}
                        
                    />  

                    <label>Teléfono:</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        placeholder={existingPhoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        
                    />

                    {/* <label>Preferencia:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="Ficción">Ficción</option>
                        <option value="No Ficción">No Ficción</option>
                        <option value="Ciencia Ficción">Ciencia Ficción</option>
                        <option value="Fantasía">Fantasía</option>
                        <option value="Historia">Historia</option>
                    </select> */}

                    <div className="form-buttons">
                        <button type="submit" className="save-btn">
                            Guardar Cambios
                        </button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
            {PopupComponent}
        </Header>
    );
    

};

export default EditarPerfil;