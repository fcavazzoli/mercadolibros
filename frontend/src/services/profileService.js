import { Backend } from './backend'; // Importa la clase Backend

const backend = new Backend(); // Instancia de la clase Backend

const getUser = async () => {
    try {
        const token = localStorage.getItem('sessionToken');
        const headers = {authorization:`beaer ${token}`};
        const response = await backend.get(`/users/me`,headers); 
        console.log(response);
        return response;
        
    } catch (error) {
        console.error('Error al obtener datos de usuario:', error);
        throw error;
    }

};


const updateInfo = async (userInfo) => {
    const token = localStorage.getItem('sessionToken');
    const headers = {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
    try {
        const response = await backend.patch(`/users`, userInfo, headers);
        return response;
    } catch (error) {
        console.error('Error al actualizar la informacion del perfil:', error);
        throw error;
    }
};
export { getUser,updateInfo};