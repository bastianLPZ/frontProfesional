import axios from 'axios';

const API_URL = 'http://localhost:8010/administrador/usuarios'; // Asegúrate de que la URL sea correcta

const profesoresService = {

    listarProfesores: async () => {
        try {
            const response = await axios.get(`${API_URL}/listar-profesores/`); // Cambiado a GET
            console.log('Profesores obtenidos:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener profesores:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    eliminarProfesor: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/eliminar-profesor/?id=${id}`); // Cambiado a DELETE
            console.log('Profesor eliminado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar profesor:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    editarProfesor: async (id, data) => {
        try {
            const response = await axios.put(`${API_URL}/editar-profesor/?id=${id}`, data); // Cambiado a PUT
            console.log('Profesor editado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al editar profesor:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    crearProfesor: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/crear-profesor/`, data); // Cambiado a POST
            console.log('Profesor creado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al crear profesor:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    }

};

export default profesoresService