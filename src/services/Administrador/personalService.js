import axios from 'axios';

const API_URL = 'http://localhost:8010/administrador/usuarios'; // Asegúrate de que la URL sea correcta

const personalService = {

    listarPersonal: async () => {
        try {
            const response = await axios.get(`${API_URL}/listar-personal/`); // Cambiado a GET
            console.log('Personal obtenido:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener personal:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    eliminarPersonal: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/eliminar-personal/?id=${id}`); // Cambiado a DELETE
            console.log('Personal eliminado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar personal:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    editarPersonal: async (id, data) => {
        try {
            const response = await axios.put(`${API_URL}/editar-personal/?id=${id}`, data); // Cambiado a PUT
            console.log('Personal editado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al editar personal:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    crearPersonal: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/crear-personal/`, data); // Cambiado a POST
            console.log('Personal creado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al crear personal:', error);
            throw error; // Lanza el error
        }
    }
    
};

export default personalService