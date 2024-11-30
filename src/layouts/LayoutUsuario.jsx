import React from 'react';
import { Outlet } from 'react-router-dom'; // Este componente se usa para renderizar las rutas hijas

const LayoutUsuario = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar de navegación */}
     

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
         {/* Encabezado que puede incluir el logo y el título de la página */}

        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
        </main>
      </div>
    </div>
  );
};

export default LayoutUsuario;