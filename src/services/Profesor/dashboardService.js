import axios from 'axios';

const API_URL = 'http://localhost:8010/profesor/dashboard'; // Asegúrate de que la URL sea correcta

const dashboardService = {

    general: async (user) => {
        try {
            const response = await axios.get(`${API_URL}/general/?user=${user}`); // Cambiado a GET
            console.log('Datos generales:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener datos generales:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    },

    getProgresoCupos: async (user) => {  
        try {
            const response = await axios.get(`${API_URL}/progreso-cupos/?user=${user}`); // Cambiado a GET
            console.log('Progreso de cupos:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener el progreso de cupos:', error);
            throw error; // Lanza el error para que pueda ser manejado en el componente
        }
    }

};

export default dashboardService