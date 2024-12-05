import { createBrowserRouter, Navigate } from 'react-router-dom';
import LayoutUsuario from '../layouts/LayoutUsuario';
import Dashboard from '../pages/Usuario/Dashboard';
import Configuracion from '../pages/Usuario/Configuracion';

const UserRouter = createBrowserRouter([
  {
    path: '/usuario',
    element: <LayoutUsuario />, // Asegúrate de tener un LayoutUsuario
    children: [
      {
        index: true,
        element: <Dashboard /> // Renderiza el Dashboard cuando se accede a /usuario
      },
      {
        path: 'configuracion',
        element: <Configuracion/>
      }
      // Otras rutas para el administrador
    ]
  },
  {
    path: '*',
    element: <Navigate to="/usuario" /> // Redirige cualquier ruta no encontrada a /usuario
  }
]);

export default UserRouter;