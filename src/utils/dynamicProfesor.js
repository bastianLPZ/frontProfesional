const getDynamicText = (pathname) => {
    switch (pathname) {
      case '/profesor':
        return 'Dashboard';
      case '/profesor/clases':
        return 'Mis Clases';
      case '/profesor/estudiantes':
        return 'Estudiantes';
      case '/profesor/reservas':
        return 'Reservas';
      case '/profesor/informes':
        return 'Informes';
      case '/profesor/configuracion':
        return 'Configuraciones';
      default:
        return 'Profesor';
    }
  };
  
  export default getDynamicText;