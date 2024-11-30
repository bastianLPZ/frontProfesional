import { Link } from 'react-router-dom';
import { Card } from "@material-tailwind/react";
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {
  PresentationChartBarIcon,
  CalendarDaysIcon, 
  AcademicCapIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <Card className="h-full bg-white shadow-xl border-l-4 border-primary mt-16 p-4" style={{ boxShadow: '6px 0 15px rgba(53, 104, 45, 0.7)' }}>
      <Menu>
        {/* Dashboard */}
        <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<PresentationChartBarIcon className="h-5 w-5 text-primary" />}>
          <Link to="/profesor" className="w-full h-full block text-primary hover:text-secondary">Dashboard</Link>
        </MenuItem>

        <hr className="my-4 border-terciary" />

        {/* Mis Clases */}
        <SubMenu label="Mis Clases" icon={<AcademicCapIcon className="h-5 w-5 text-primary" />}>
          <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<ClipboardDocumentCheckIcon className="h-5 w-5 text-primary" />}>
            <Link to="/profesor/clases" className="w-full h-full block text-primary hover:text-secondary">Clases</Link>
          </MenuItem>
          <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<UserGroupIcon className="h-5 w-5 text-primary" />}>
            <Link to="/profesor/estudiantes" className="w-full h-full block text-primary hover:text-secondary">Estudiantes</Link>
          </MenuItem>
        </SubMenu>

        {/* Reservas */}
        <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<CalendarDaysIcon className="h-5 w-5 text-primary" />}>
          <Link to="/profesor/reservas" className="w-full h-full block text-primary hover:text-secondary">Reservas</Link>
        </MenuItem>

        <hr className="my-4 border-terciary" />

        {/* Informes */}
        <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<ChartBarSquareIcon className="h-5 w-5 text-primary" />}>
          <Link to="/profesor/informes" className="w-full h-full block text-primary hover:text-secondary">Informes</Link>
        </MenuItem>

        {/* Configuración */}
        <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<Cog6ToothIcon className="h-5 w-5 text-primary" />}>
          <Link to="/profesor/configuracion" className="w-full h-full block text-primary hover:text-secondary">Configuración</Link>
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default Sidebar;