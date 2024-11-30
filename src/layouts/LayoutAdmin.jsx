import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Administrador/Sidebar'; // Asegúrate de que el archivo Sidebar.js esté en el mismo directorio
import Navbar from '../components/Administrador/Navbar'; // Asegúrate de que el archivo Navbar.js esté en el mismo directorio

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar de navegación con un ancho fijo */}
      <div className="w-1/5"> {/* Ajusta el ancho del Sidebar aquí */}
        <Sidebar />
      </div>
      
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar con el logo y el título */}
        <Navbar />
        
        <main className="flex-1 p-4 overflow-y-auto mt-16">
          <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;