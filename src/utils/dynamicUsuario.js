const getDynamicText = (pathname) => {
    switch (pathname) {
      case '/usuario':
        return 'Dashboard';
      case '/usuario/clases':
        return 'Mis Clases';
      case '/usuario/reservas':
        return 'Reservas';
      case '/usuario/informes':
        return 'Informes';
      case '/usuario/configuracion':
        return 'Configuraciones';
      default:
        return 'Usuario';
    }
  };
  
  export default getDynamicText;