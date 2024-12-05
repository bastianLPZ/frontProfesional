import { createBrowserRouter, Navigate } from 'react-router-dom';
import LayoutAdmin from '../layouts/LayoutAdmin';
import Dashboard from '../pages/Administrador/Dashboard';
import Reportes from '../pages/Administrador/Reportes';
import Administradores from '../pages/Administrador/Administradores';
import Usuarios from '../pages/Administrador/Usuarios';
import Profesores from '../pages/Administrador/Profesores';
import Canchas from '../pages/Administrador/Canchas';
import Equipamiento from '../pages/Administrador/Equipamiento';
import Torneos from '../pages/Administrador/Torneos';
import Mantenimiento from '../pages/Administrador/Mantenimiento';
import Configuracion from '../pages/Administrador/Configuracion';
import Horas from '../pages/Administrador/Horas';
import Clases from '../pages/Administrador/Clases';
import Personal from '../pages/Administrador/Personal';


const AdminRouter = createBrowserRouter([
  {
    path: '/admin',
    element: <LayoutAdmin />, // Asegúrate de tener un LayoutAdmin
    children: [
      {
        index: true,
        element: <Dashboard /> // Renderiza el Dashboard cuando se accede a /admin
      },
      {
        path: 'reportes',
        element: <Reportes />, // Componente que contiene los tabs
      },
      {
        path: 'gestion/administradores',
        element: <Administradores /> // Renderiza el componente Administradores cuando se accede a /admin/gestion/administradores
      },
      {
        path: 'gestion/usuarios',
        element: <Usuarios /> // Renderiza el componente Usuarios cuando se accede a /admin/gestion/usuarios
      },
      {
        path: 'gestion/profesores',
        element: <Profesores /> // Renderiza el componente Profesores cuando se accede a /admin/gestion/profesores
      },
      {
        path: 'gestion/personal',
        element: <Personal /> // Renderiza el componente Personal cuando se accede a /admin/gestion/profesores
      },
      {
        path: 'gestion/horas',
        element: <Horas />
      },
      {
        path: 'gestion/canchas',
        element: <Canchas /> // Renderiza el componente Canchas cuando se accede a /admin/gestion/canchas
      },
      {
        path: 'gestion/equipamiento',
        element: <Equipamiento /> // Renderiza el componente Equipamiento cuando se accede a /admin/gestion/equipamiento
      },
      {
        path: 'gestion/torneos',
        element: <Torneos /> // Renderiza el componente Torneos cuando se accede a /admin/gestion/torneos
      },
      {
        path: 'gestion/reservas/clases',
        element: <Clases />
      },
      {
        path: 'mantenimiento',
        element: <Mantenimiento /> // Renderiza el componente Mantenimiento cuando se accede a /admin/mantenimiento
      },
      {
        path: 'configuracion',
        element: <Configuracion /> // Renderiza el componente Configuracion cuando se accede a /admin/configuracion
      },
    ]
  },
  {
    path: '*',
    element: <Navigate to="/admin" /> // Redirige cualquier ruta no encontrada a /admin
  }
]);

export default AdminRouter;