import axios from 'axios';

const API_URL = 'http://localhost:8010/administrador/reservas'; // Asegúrate de que la URL sea correcta

const equipamientoService = {
    crearEquipamiento: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/crear-equipamiento/`, data);
            console.log('Equipamiento creado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al crear equipamiento:', error);
            throw error;
            
        }
    },

    listarEquipamiento: async () => {
        try {
            const response = await axios.get(`${API_URL}/listar-equipamientos/`);
            console.log('Equipamiento obtenido:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener equipamiento:', error);
            throw error;
        }
    },

    editarEquipamiento: async (id, data) => {
        try {
            const response = await axios.put(`${API_URL}/editar-equipamiento/?id=${id}`, data);
            console.log('Equipamiento editado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al editar equipamiento:', error);
            throw error;
        }
    },

    eliminarEquipamiento: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/eliminar-equipamiento/?id=${id}`);
            console.log('Equipamiento eliminado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar equipamiento:', error);
            throw error;
        }
    },

    obtenerEquipamientoDisponible: async (fecha, horaInicio, horaFin) => {
        try {
            const response = await axios.get(`${API_URL}/equipamiento-disponible/?fecha=${fecha}&horaInicio=${horaInicio}&horaFin=${horaFin}`);
            console.log('Equipamiento disponible:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener equipamiento disponible:', error);
            throw error;
        }
    }
};

export default equipamientoService;