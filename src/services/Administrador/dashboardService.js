import axios from 'axios';

const API_URL = 'http://localhost:8010/administrador/dashboard'; // Asegúrate de que la URL sea correcta

const dashboardService = {
  getTotalUsuarios: async () => {
    const response = await axios.get(`${API_URL}/total-usuarios/`);
    console.log('Total usuarios: ' + response.data);
    return response.data;
  },
  
  getTotalReservas: async () => {
    const response = await axios.get(`${API_URL}/total-reservas/`);
    console.log('Total reservas: ' + response.data);
    return response.data;
  },
  
  getCanchasDisponibles: async () => {
    const response = await axios.get(`${API_URL}/canchas-disponibles/`);
    console.log('Canchas disponibles: ' + response.data);
    return response.data;
  },
  
  getReservasCanceladas: async () => {
    const response = await axios.get(`${API_URL}/reservas-canceladas/`);
    console.log('Reservas canceladas: ' + response.data);
    return response.data;
  },

  getListCanchas: async () => {
    const response = await axios.get(`${API_URL}/listar-canchas/`);
    console.log('Canchas obtenidas:', response.data);
    return response.data;
  },

  getInfo: async (id) => {
    const response = await axios.get(`${API_URL}/info-cancha/?cancha=${id}`);
    console.log('Info obtenida:', response.data);
    return response.data;
  }

};

export default dashboardService;