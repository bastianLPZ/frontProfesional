import { Outlet } from 'react-router-dom'; // Este componente se usa para renderizar las rutas hijas
import Sidebar from '../components/Usuario/Sidebar';
import Navbar from '../components/Usuario/Navbar';
const LayoutUsuario = () => {
  return (
    <div className="flex h-screen w-screen overflow-x-hidden">
      <div className="w-1/5"> {/* Ajusta el ancho del Sidebar aquí */}
        <Sidebar />
      </div>
      {/* Sidebar de navegación */}
     

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
         {/* Encabezado que puede incluir el logo y el título de la página */}
        <Navbar />
        <main className="flex-1 p-4 overflow-y-auto mt-16">
          <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
        </main>
      </div>
    </div>
  );
};

export default LayoutUsuario;