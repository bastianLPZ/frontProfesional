import axios from "axios";

const API_URL = 'http://localhost:8010/personal'; // Asegúrate de que la URL sea correcta


const ClasesUsuarioService = {

    getClases: async () => {
        try {
            const response = await axios.get(`${API_URL}/listar-clases-disponibles/`); // Cambiado a GET
            console.log('Clases:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener las clases:', error);
            throw error; // Lanza el error
        }
    },
    unirseClase: async (objeto) => {
        try {
            
            const response = await axios.post(`${API_URL}/unirse-clase/`,JSON.stringify(objeto)); // Cambiado a POST
            console.log('Clase:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al unirse a la clase:', error);
            throw error; // Lanza el error
        }
    },
    salirClase: async (objeto) => {
        try {
            const response = await axios.post(`${API_URL}/salir-clase/`,JSON.stringify(objeto)); // Cambiado a POST
            console.log('Clase:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al salir de la clase:', error);
            throw error; // Lanza el error
        }
    }
}

export default ClasesUsuarioService;