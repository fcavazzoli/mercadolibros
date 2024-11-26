import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateInfo} from '../../services/profileService';
import '../../css/EditBook.css';
import Header from '../Header';

const EditarPerfil = () => {

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const response = await getUser();  // Obtener la info del usuario
    //             if (response && response.user) { // Verificar que la propiedad user exista
    //                 setUserInfo(response.user);  // Guardar la info del usuario en el estado
    //             }
    //         } catch (error) {
    //             console.error('Error al cargar la info del usuario:', error);
    //             alert('No se pudo cargar la información del usuario.');
    //         }
    //     };
    //     fetchUser();
    // }, []);  // El array vacío significa que el efecto solo se ejecutará una vez al montar el componente

    // // Si userInfo no está disponible aún (por ejemplo, mientras se carga), puedes mostrar un loading o un mensaje
    // if (!userInfo) {
    //     return <div>Cargando...</div>;
    // };

    // // Desestructurar los datos del usuario
    // const userId  = userInfo.id;
    // console.log("IDUSUARIO:", userId); 
    
    
    
    
    const handleUpdateInfo = async (e) => {
        e.preventDefault();
        try {
            //const data={ name, email, adress,number};
            await updateInfo({ email, name, address,phoneNumber});
            alert('Perfil actualizado correctamente');
            //navigate('/books'); // Redirige al listado de libros
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
                        required
                    />

                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Adress:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />  

                    <label>PhoneNumber:</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
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