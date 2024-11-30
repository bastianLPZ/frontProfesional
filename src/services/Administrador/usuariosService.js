import axios from 'axios';

const API_URL = 'http://localhost:8010/administrador/usuarios'; // Asegúrate de que la URL sea correcta

const administradoresService = {

    ListarUsuarios: async () => {
        try {
            const response = await axios.get(`${API_URL}/listar-usuarios/`); // Cambiado a GET
            console.log('Administradores obtenidos:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    eliminarUsuario: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/eliminar-usuario/?id=${id}`); // Cambiado a DELETE
            console.log('Usuario eliminado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    editarUsuario: async (id, data) => {
        try {
            const response = await axios.put(`${API_URL}/editar-usuario/?id=${id}`, data); // Cambiado a PUT
            console.log('Usuario editado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al editar usuario:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    crearUsuario: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/crear-usuario/`, data); // Cambiado a POST
            console.log('Usuario creado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error; // Lanza el error
        }
    }

};

export default administradoresService