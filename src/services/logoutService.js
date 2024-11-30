import axios from 'axios';

const API_URL = 'http://localhost:8010/general/logout/';  // URL del backend

// services/authService.js
export const logoutUser = async() => {

    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user'));

    try {
       const response = await axios.post(API_URL, 
        { 
            user: user 
        }, 
        { 
            headers: { Authorization: `Bearer ${token}` } 
        });

        console.log("Respuesta del servidor:", response); // Muestra la respuesta del servidor

        if (response.status === 200) {
            // Eliminar los datos almacenados en el localStorage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
        
            // Redirigir al usuario al login
            window.location.href = '/login'; 
        }

    } catch (error) {
        console.error("Error en la conexión:", error); // Manejo de errores de red
        return { success: false, error: error.response ? error.response.data.error : 'Error en la conexión.' }; // Devuelve el
        
    }
  };