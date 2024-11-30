const getDynamicText = (pathname) => {
    switch (pathname) {
      case '/admin':
        return 'Dashboard';
      case '/admin/reportes':
        return 'Reportes';
      case '/admin/gestion/administradores':
        return 'Gestión de Administradores';
      case '/admin/gestion/usuarios':
        return 'Gestión de Usuarios';
      case '/admin/gestion/profesores':
        return 'Gestión de Profesores';
      case '/admin/gestion/personal':
        return 'Gestión de Personal';
      case '/admin/gestion/canchas':
        return 'Gestión de Canchas';
      case '/admin/gestion/equipamiento':
        return 'Gestión de Equipamiento';
      case '/admin/gestion/torneos':
        return 'Gestión de Torneos';
      case '/admin/mantenimiento':
        return 'Gestión de Mantenimiento';
      case '/admin/configuracion':
        return 'Configuraciones';
      case '/admin/gestion/horas':
        return 'Gestión de Horas';
      case '/admin/gestion/reservas/clases':
        return 'Gestión de Clases';
      default:
        return 'Admin';
    }
  };
  
  export default getDynamicText;