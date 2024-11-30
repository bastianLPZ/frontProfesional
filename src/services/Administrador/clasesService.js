import axios from "axios";

const API_URL = "http://localhost:8010/administrador/clases";

const clasesService = {

    listarClases: async () => {
        try {
            const response = await axios.get(`${API_URL}/listar-clases/`);
            console.log('Clases obtenidas:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener clases:', error);
            throw error;
        }
    },

    eliminarClase: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/eliminar-clase/?id=${id}`);
            console.log('Clase eliminada:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar clase:', error);
            throw error;
        }
    },

    editarClase: async (id, data) => {
        console.log('Data:', data);
        try {
            const response = await axios.put(`${API_URL}/editar-clase/?id=${id}`, data);
            console.log('Clase editada:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al editar clase:', error);
            throw error;
        }
    },

    crearClase: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/crear-clase/`, data);
            console.log('Clase creada:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al crear clase:', error);
            throw error;
        }
    },

    profesoresDisponibles: async () => {
        try {
            const response = await axios.get(`${API_URL}/profesores-disponibles/`);
            console.log('Profesores disponibles:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener profesores disponibles:', error);
            throw error;
        }
    },

    getAlumnosConEstado: async (claseId) => {
        try {
            const response = await axios.get(`${API_URL}/alumnos/?clase_id=${claseId}`);
            console.log('Alumnos con estado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los alumnos con estado:', error);
            throw error;
        }
    },

    addAlumnos: async (claseId, alumnos) => {
        try {
            const response = await axios.post(`${API_URL}/añadir-alumnos/?clase_id=${claseId}`, { alumnos });
            console.log('Alumnos añadidos:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al añadir alumnos:', error);
            throw error;
        }
    },

};

export default clasesService