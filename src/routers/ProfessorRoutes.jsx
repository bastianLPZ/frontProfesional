import { createBrowserRouter, Navigate } from 'react-router-dom';
import LayoutProfesor from '../layouts/LayoutProfesor';
import Dashboard from '../pages/Profesor/Dashboard';
import Clases from '../pages/Profesor/Clases';
import Estudiantes from '../pages/Profesor/Estudiantes';
import Reservas from '../pages/Profesor/Resevas';
import Informes from '../pages/Profesor/Informes';
import Configuracion from '../pages/Profesor/Configuracion';

const adminRouter = createBrowserRouter([
  {
    path: '/profesor',
    element: <LayoutProfesor />, // Asegúrate de tener un LayoutAdmin
    children: [
      {
        index: true,
        element: <Dashboard /> // Renderiza el Dashboard cuando se accede a /admin
      },
      {
        path: 'clases',
        element: <Clases /> // Renderiza el componente Clases cuando se accede a /admin/gestion/canchas
      },
      {
        path: 'estudiantes',
        element: <Estudiantes /> // Renderiza el componente Estudiantes cuando se accede a /admin/gestion/canchas 
      },
      {
        path: 'reservas',
        element: <Reservas />
      },
      {
        path: 'informes',
        element: <Informes />
      },
      {
        path: 'configuracion',
        element: <Configuracion />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/profesor" /> // Redirige cualquier ruta no encontrada a /admin
  }
]);

export default adminRouter;