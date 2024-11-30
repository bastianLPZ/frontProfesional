import { Link } from 'react-router-dom';
import { Card } from "@material-tailwind/react";
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {
  PresentationChartBarIcon,
  ChartBarSquareIcon,
  UserCircleIcon,
  UserGroupIcon,
  AcademicCapIcon,
  UserPlusIcon,
  MapIcon,
  ClipboardDocumentCheckIcon,
  TrophyIcon,
  WrenchIcon,
  Cog6ToothIcon,
  CalendarDaysIcon, 
  ClockIcon,
  CogIcon
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <Card className="h-full bg-white shadow-xl border-l-4 border-primary mt-16 p-4" style={{ boxShadow: '6px 0 15px rgba(53, 104, 45, 0.7)' }}>
      <Menu>
        <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<PresentationChartBarIcon className="h-5 w-5 text-primary" />}>
          <Link to="/admin" className="w-full h-full block text-primary hover:text-secondary">Dashboard</Link>
        </MenuItem>
        <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<ChartBarSquareIcon className="h-5 w-5 text-primary" />}>
          <Link to="/admin/reportes" className="w-full h-full block text-primary hover:text-secondary">Reportes</Link>
        </MenuItem>

        <hr className="my-4 border-terciary" />

        <SubMenu label='Gestión de usuarios' icon={<UserPlusIcon className="h-5 w-5 text-primary" />}>
          <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<UserCircleIcon className="h-5 w-5 text-primary" />}>
            <Link to="/admin/gestion/administradores" className="w-full h-full block text-primary hover:text-secondary">Administradores</Link>
          </MenuItem>
          <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<UserGroupIcon className="h-5 w-5 text-primary" />}>
            <Link to="/admin/gestion/usuarios" className="w-full h-full block text-primary hover:text-secondary">Usuarios</Link>
          </MenuItem>
          <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<AcademicCapIcon className="h-5 w-5 text-primary" />}>
            <Link to="/admin/gestion/profesores" className="w-full h-full block text-primary hover:text-secondary">Profesores</Link>
          </MenuItem>
          <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<CogIcon className="h-5 w-5 text-primary" />}>
            <Link to="/admin/gestion/personal" className="w-full h-full block text-primary hover:text-secondary">Personal</Link>
          </MenuItem>
        </SubMenu>

        <SubMenu label='Gestión de reservas' icon={<CalendarDaysIcon className="h-5 w-5 text-primary" />}>
        <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<ClockIcon className="h-5 w-5 text-primary" />}>
            <Link to="/admin/gestion/horas" className="w-full h-full block text-primary hover:text-secondary">Reserva de horas</Link>
          </MenuItem>
          <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<MapIcon className="h-5 w-5 text-primary" />}>
            <Link to="/admin/gestion/canchas" className="w-full h-full block text-primary hover:text-secondary">Canchas</Link>
          </MenuItem>
          <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<ClipboardDocumentCheckIcon className="h-5 w-5 text-primary" />}>
            <Link to="/admin/gestion/equipamiento" className="w-full h-full block text-primary hover:text-secondary">Equipamiento</Link>
          </MenuItem>
          <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<TrophyIcon className="h-5 w-5 text-primary" />}>
            <Link to="/admin/gestion/torneos" className="w-full h-full block text-primary hover:text-secondary">Torneos</Link>
          </MenuItem>
        </SubMenu>
        <MenuItem className='hover:bg-gray-100 focus:bg-gray-200 transition-all' icon={<ClipboardDocumentCheckIcon className="h-5 w-5 text-primary" />}>
          <Link to="/admin/gestion/reservas/clases" className="w-full h-full block text-primary hover:text-secondary">Gestión de clases</Link>
        </MenuItem>

        <hr className="my-4 border-terciary" />

        <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<WrenchIcon className="h-5 w-5 text-primary" />}>
            <Link to="/admin/mantenimiento" className="w-full h-full block text-primary hover:text-secondary">Mantenimiento</Link>
          </MenuItem>
        <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<Cog6ToothIcon className="h-5 w-5 text-primary" />}>
          <Link to="/admin/configuracion" className="w-full h-full block text-primary hover:text-secondary">Configuración</Link>
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default Sidebar;