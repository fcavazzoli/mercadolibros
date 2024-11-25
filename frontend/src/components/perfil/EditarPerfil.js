import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateInfo} from '../../services/profileService';
import '../../css/EditBook.css';
import Header from '../Header';

const EditarPerfil = () => {

    const navigate = useNavigate();
     const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [adress, setAdress] = useState('');
    const [number, setNumber] = useState('');
    const userId=1;
    const handleUpdateInfo = async (e) => {
        e.preventDefault();
        try {
            await updateInfo(userId, { name, email, adress,number});
            alert('Libro actualizado correctamente');
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
                        value={adress}
                        onChange={(e) => setAdress(e.target.value)}
                        required
                    />

                    <label>PhoneNumber:</label>
                    <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
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