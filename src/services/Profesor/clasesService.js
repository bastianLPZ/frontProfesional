import axios from 'axios';

const API_URL = 'http://localhost:8010/profesor/mis-clases'; // Asegúrate de que la URL sea correcta

const clasesService = {

    getClases: async () => {
        try {
            const response = await axios.get(`${API_URL}/listar-clases/`); // Cambiado a GET
            console.log('Clases:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener las clases:', error);
            throw error; // Lanza el error
        }
    },

    createClass: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/crear-clase/`, data); // Cambiado a POST
            console.log('Clase creada:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al crear la clase:', error);
            // Lanza el error
        }
    },

    editClass: async (id, data) => {
        try {
          console.log("Enviando datos al backend:", data); // Agregar log para depurar
          const response = await axios.put(
            `${API_URL}/editar-clase/?id=${id}`,
            data,
            {
              headers: {
                "Content-Type": "application/json", // Asegúrate de usar JSON
              },
            }
          );
          console.log("Respuesta del backend:", response.data);
          return response.data;
        } catch (error) {
          console.error("Error al editar la clase:", error);
          throw error; // Lanza el error
        }
      },

    deleteClass: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/eliminar-clase/?id=${id}`); // Cambiado a DELETE
            console.log('Clase eliminada:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar la clase:', error);
            throw error; // Lanza el error
        }
    },

};

export default clasesService