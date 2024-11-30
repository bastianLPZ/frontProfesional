import axios from 'axios';

const API_URL = 'http://localhost:8010/administrador/reservas'; // Asegúrate de que la URL sea correcta

// Función para crear una cancha
const canchasService = {

    crearCancha: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/crear-cancha/`, data); // Cambiado a POST
            console.log('Cancha creada:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al crear cancha:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    listarCanchas: async () => {
        try {
            const response = await axios.get(`${API_URL}/listar-canchas/`); // Cambiado a GET
            console.log('Canchas obtenidas:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener canchas:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },
    
    eliminarCancha: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/eliminar-cancha/?id=${id}`); // Cambiado a DELETE
            console.log('Cancha eliminada:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar cancha:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    editarCancha: async (id, data) => {
        try {
            const response = await axios.put(`${API_URL}/editar-cancha/?id=${id}`, data); // Cambiado a PUT
            console.log('Cancha editada:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al editar cancha:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },


};


export default canchasService