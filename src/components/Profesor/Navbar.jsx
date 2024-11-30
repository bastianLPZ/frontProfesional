import React from 'react';
import { logoutUser } from '../../services/logoutService';
import { useLocation } from 'react-router-dom';
import getDynamicText from '../../utils/dynamicProfesor';

const Navbar = () => {
  const location = useLocation();
  const dynamicText = getDynamicText(location.pathname);

  const handleLogout = () => {
    logoutUser(); // Llamar al servicio de logout
  };

  return (
    <nav className="w-full bg-primary text-white p-3 flex items-center justify-between fixed top-0 left-0 z-10 shadow-md">
      <div className="logo text-2xl font-bold"><strong>EstadioManager</strong></div>
      <div className="nav-title">{dynamicText}</div>
      <button onClick={handleLogout} className="logout border border-white text-white bg-terciary px-4 py-2 rounded hover:bg-secondary transition duration-300">
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default Navbar;