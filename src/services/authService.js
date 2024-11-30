import axios from 'axios';

const API_URL = 'http://localhost:8010/general/login/';  // URL del backend

// Función para iniciar sesión
export const loginUser = async (username, password) => {
  console.log("Iniciando el proceso de inicio de sesión...");

  try {
    console.log("Enviando solicitud de inicio de sesión...");

    // Usando Axios para realizar la solicitud POST
    const response = await axios.post(API_URL, 
        { 
            username:username, 
            password:password 
        });

    console.log("Respuesta del servidor:", response); // Muestra la respuesta del servidor

    const usuario = response.data.usuario
    const token = response.data.token

    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(usuario))

    // Verifica si la respuesta fue exitosa
    return { success: true, token: token, usuario: usuario }; // Devuelve el token
  } catch (error) {
    // Maneja errores de Axios
    console.error("Error en la conexión:", error); // Manejo de errores de red
    return { success: false, error: error.response ? error.response.data.error : 'Error en la conexión.' }; // Devuelve el error
  }
};