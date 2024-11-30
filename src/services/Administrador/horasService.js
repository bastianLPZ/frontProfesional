import axios from "axios";

const API_URL = "http://localhost:8010/administrador/reservas";

const horasService = {
  listarHorasOcupadas: async () => {
    try {
      const response = await axios.get(`${API_URL}/listar-horas-ocupadas/`);
      console.log("Horas ocupadas obtenidas:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al obtener horas ocupadas:", error);
      throw error;
    }
  },

  obtenerEstadoDisponible: async () => {
    try {
      const response = await axios.get(`${API_URL}/estado-disponible/`);
      console.log("Estado disponible obtenido:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al obtener estado disponible:", error);
      throw error;
    }
  },

  obtenerCanchasDisponibles: async () => {
    try {
      const response = await axios.get(
        `${API_URL}/listar-canchas-disponibles/`
      );
      console.log("Canchas disponibles obtenidas:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al obtener canchas disponibles:", error);
      throw error;
    }
  },

  editarReserva: async (id, data) => {
    try {
      const response = await axios.put(
        `${API_URL}/editar-reserva/?id=${id}`,
        data
      );
      console.log("Reserva editada:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al editar reserva:", error);
      throw error;
    }
  },

  crearReserva: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/crear-reserva/`, data);
      console.log("Reserva creada:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al crear reserva:", error);
      throw error;
    }
  },

  subcanchasDisponibles: async (cancha) => {
    try {
      const response = await axios.get(
        `${API_URL}/subcanchas-disponibles/?cancha=${cancha}`
      );
      console.log("Subcanchas disponibles obtenidas:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al obtener subcanchas disponibles:", error);
      throw error;
    }
  },

  listarHorasOcupadasPorCancha: async (cancha) => {
    try {
      const response = await axios.get(
        `${API_URL}/listar-horas-cancha/?cancha=${cancha}`
      );
      console.log("Horas ocupadas disponibles: ", response);
      return response.data;
    } catch (error) {
      console.error("Error a obtener las horas ocupadas por cancha: ", error);
      throw error;
    }
  },
};

export default horasService;
