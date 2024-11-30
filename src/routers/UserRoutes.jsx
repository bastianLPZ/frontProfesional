import { createBrowserRouter, Navigate } from 'react-router-dom';
import LayoutUsuario from '../layouts/LayoutUsuario';
import Dashboard from '../pages/Usuario/Dashboard';

const adminRouter = createBrowserRouter([
  {
    path: '/usuario',
    element: <LayoutUsuario />, // Asegúrate de tener un LayoutAdmin
    children: [
      {
        index: true,
        element: <Dashboard /> // Renderiza el Dashboard cuando se accede a /admin
      },
      // Otras rutas para el administrador
    ]
  },
  {
    path: '*',
    element: <Navigate to="/usuario" /> // Redirige cualquier ruta no encontrada a /admin
  }
]);

export default adminRouter;