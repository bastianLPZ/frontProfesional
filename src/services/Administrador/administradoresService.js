import axios from 'axios';

const API_URL = 'http://localhost:8010/administrador/usuarios'; // Asegúrate de que la URL sea correcta

const administradoresService = {

    listarAdministradores: async () => {
        try {
            const response = await axios.get(`${API_URL}/listar-administradores/`); // Cambiado a GET
            console.log('Administradores obtenidos:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener administradores:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    eliminarAdministrador: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/eliminar-administrador/?id=${id}`); // Cambiado a DELETE
            console.log('Administrador eliminado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar administrador:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    editarAdministrador: async (id, data) => {
        try {
            const response = await axios.put(`${API_URL}/editar-administrador/?id=${id}`, data); // Cambiado a PUT
            console.log('Administrador editado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al editar administrador:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    crearAdministrador: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/crear-administrador/`, data); // Cambiado a POST
            console.log('Administrador creado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al crear administrador:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    }

};

export default administradoresService