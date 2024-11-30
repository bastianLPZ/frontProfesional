import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/General/Login'; // Asegúrate de que la ruta es correcta

const generalRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Login /> // Aquí se muestra el Login en la raíz
  },
  {
    path: '/login',
    element: <Login /> // También puedes tener esta ruta si deseas
  },
  {
    path: '*', // Ruta wildcard para manejar rutas no encontradas
    element: <Navigate to="/" /> // Redirige a la página principal
  }
]);

export default generalRoutes;