import axios from 'axios';

const API_URL = 'http://localhost:8010/administrador/reportes'; // Asegúrate de que la URL sea correcta

const reporteService = {

    fetchResumenGeneralData: async () => {
        try {
            const response = await axios.get(`${API_URL}/resumen-general/`);
            console.log('Datos del Resumen General:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los datos del Resumen General:', error);
            throw error;
        }
    },

    fetchReservasPorUsuarioData: async () => {
        try {
            const response = await axios.get(`${API_URL}/reservas-por-usuario/`);
            console.log('Datos de Reservas por Usuario:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los datos de Reservas por Usuario:', error);
            throw error;
        }
    },

    fetchUsoCanchasSubcanchas: async () => {
        try {
            const response = await axios.get(`${API_URL}/uso-canchas-subcanchas/`);
            console.log('Datos de Uso de Canchas y Subcanchas:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los datos de Uso de Canchas y Subcanchas:', error);
            throw error;
        }
    },

    fetchMantenimientos: async () => {
        try {
            const response = await axios.get(`${API_URL}/mantenimientos/`);
            console.log('Datos de Mantenimientos:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los datos de Mantenimientos:', error);
            throw error;
        }
    },

    fetchClases: async () => {
        try {
            const response = await axios.get(`${API_URL}/clases/`);
            console.log('Datos de Clases:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los datos de Clases:', error);
            throw error;
        }
    }


};

export default reporteService
