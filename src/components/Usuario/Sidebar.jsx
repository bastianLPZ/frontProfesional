import { Link } from 'react-router-dom';
import { Card } from "@material-tailwind/react";
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {
  PresentationChartBarIcon,
  CalendarDaysIcon, 
  AcademicCapIcon,
  ClipboardDocumentCheckIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <Card className="h-full bg-white shadow-xl border-l-4 border-primary mt-16 p-4" style={{ boxShadow: '6px 0 15px rgba(53, 104, 45, 0.7)' }}>
      <Menu>
        {/* Dashboard */}
        <Link to="/usuario" className="w-full h-full block text-primary hover:text-secondary">
          <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<PresentationChartBarIcon className="h-5 w-5 text-primary" />}>
            Dashboard
          </MenuItem>
        </Link>

        <hr className="my-4 border-terciary" />

        {/* Mis Clases */}
        <SubMenu label="Mis Clases" icon={<AcademicCapIcon className="h-5 w-5 text-primary" />}>
          <Link to="/usuario/clases" className="w-full h-full block text-primary hover:text-secondary">
            <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<ClipboardDocumentCheckIcon className="h-5 w-5 text-primary" />}>
              Clases
            </MenuItem>
          </Link>
        </SubMenu>

        {/* Reservas */}
        <Link to="/usuario/reservas" className="w-full h-full block text-primary hover:text-secondary">
          <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<CalendarDaysIcon className="h-5 w-5 text-primary" />}>
            Reservas
          </MenuItem>
        </Link>
        <hr className="my-4 border-terciary" />

        {/* Informes */}
        <Link to="/usuario/informes" className="w-full h-full block text-primary hover:text-secondary">
          <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<ChartBarSquareIcon className="h-5 w-5 text-primary" />}>
            informes
          </MenuItem>
        </Link>

        {/* Configuración */}
        <Link to="/usuario/configuracion" className="w-full h-full block text-primary hover:text-secondary">
          <MenuItem className="hover:bg-gray-100 focus:bg-gray-200 transition-all" icon={<Cog6ToothIcon className="h-5 w-5 text-primary" />}>
            Configuración
          </MenuItem>
        </Link>
      </Menu>
    </Card>
  );
};

export default Sidebar;