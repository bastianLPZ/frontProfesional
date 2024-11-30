import axios from 'axios';

const API_URL = 'http://localhost:8010/administrador/reservas'; // Asegúrate de que la URL sea correcta

// Función para crear una cancha
const subcanchasService = {

    crearSubcancha: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/crear-subcancha/`, data); // Cambiado a POST
            console.log('Subcancha creada:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al crear subcancha:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    listarSubcanchas: async () => {
        try {
            const response = await axios.get(`${API_URL}/listar-subcanchas/`); // Cambiado a GET
            console.log('Subcanchas obtenidas:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener subcanchas:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    eliminarSubcancha: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/eliminar-subcancha/?id=${id}`); // Cambiado a DELETE
            console.log('Subcancha eliminada:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar subcancha:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    editarSubcancha: async (id, data) => {
        try {
            const response = await axios.put(`${API_URL}/editar-subcancha/?id=${id}`, data); // Cambiado a PUT
            console.log('Subcancha editada:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al editar subcancha:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    obtenerCanchasDisponibles: async () => {
        try {
            const response = await axios.get(`${API_URL}/canchas-disponibles/`); // Cambiado a GET
            console.log('Canchas obtenidas:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener canchas:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    obtenerOrientacionesDisponibles: async (cancha) => {
        try {
            const response = await axios.get(`${API_URL}/orientaciones-disponibles/?cancha=${cancha}`); // Cambiado a GET
            console.log('Orientaciones obtenidas:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener orientaciones:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },


};

export default subcanchasService
