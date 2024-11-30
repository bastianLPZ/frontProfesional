import axios from "axios";

const API_URL = "http://localhost:8010/administrador/mantenimiento";

const mantenimientoService = {

    listarMantenimientos: async () => {
        try {
        const response = await axios.get(`${API_URL}/listar-mantenimientos/`);
        console.log("Mantenimientos obtenidos:", response.data);
        return response.data;
        } catch (error) {
        console.error("Error al obtener mantenimientos:", error);
        throw error;
        }
    },
    
    crearMantenimiento: async (data) => {
        try {
        const response = await axios.post(`${API_URL}/crear-mantenimiento/`, data);
        console.log("Mantenimiento creado:", response.data);
        return response.data;
        } catch (error) {
        console.error("Error al crear mantenimiento:", error);
        throw error;
        }
    },
    
    editarMantenimiento: async (id, data) => {
        try {
        const response = await axios.put(
            `${API_URL}/editar-mantenimiento/?id=${id}`,
            data
        );
        console.log("Mantenimiento editado:", response.data);
        return response.data;
        } catch (error) {
        console.error("Error al editar mantenimiento:", error);
        throw error;
        }
    },
    
    eliminarMantenimiento: async (id) => {
        try {
        const response = await axios.delete(`${API_URL}/eliminar-mantenimiento/?id=${id}`);
        console.log("Mantenimiento eliminado:", response.data);
        return response.data;
        } catch (error) {
        console.error("Error al eliminar mantenimiento:", error);
        throw error;
        }
    },

};

export default mantenimientoService;