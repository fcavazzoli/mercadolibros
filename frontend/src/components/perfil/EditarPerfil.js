import '../../css/App.css'; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateInfo} from '../../services/profileService';
import Header from '../Header';

const EditarPerfil = () => {

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null); 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    
    
    const handleUpdateInfo = async (e) => {
        e.preventDefault();
        try {
            //const data={ name, email, adress,number};
            await updateInfo({ email, name, address,phoneNumber});
            alert('Perfil actualizado correctamente');
            navigate('/perfil'); // Redirige a la informacion personal.
        } catch (error) {
            console.error('Error al actualizar ela informacion del perfil:', error);
            alert('Error al actualizar la informacion del perfil. Intente nuevamente más tarde.');
        }
    };

    const handleCancel = () => {
        navigate('/perfil'); // Redirige al listado de libros
    };

    return (
        <Header>
            <div className="edit-book-container">
                <h2>Modificar Información Personal</h2>
                <form onSubmit={handleUpdateInfo}>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        
                    />

                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        
                    />

                    <label>Adress:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        
                    />  

                    <label>PhoneNumber:</label>
                    <input
                        type="text"
                        value={phoneNumber}
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
        </Header>
    );
    

};

export default EditarPerfil;