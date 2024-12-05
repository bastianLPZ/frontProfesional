import { useEffect, useState } from 'react';
import Card from '../../components/Administrador/Dashboard/Card';
import dashboardService from '../../services/Administrador/dashboardService'; // Asegúrate de que la ruta sea correcta
import Cancha from '../../components/Administrador/Dashboard/Cancha';

const Dashboard = () => {
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalReservas, setTotalReservas] = useState(0);
  const [canchasDisponibles, setCanchasDisponibles] = useState(0);
  const [reservasCanceladas, setReservasCanceladas] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuarios = await dashboardService.getTotalUsuarios();
        const reservas = await dashboardService.getTotalReservas();
        const canchas = await dashboardService.getCanchasDisponibles();
        const canceladas = await dashboardService.getReservasCanceladas();

        setTotalUsuarios(usuarios);
        setTotalReservas(reservas);
        setCanchasDisponibles(canchas);
        setReservasCanceladas(canceladas);
      } catch (error) {
        console.error('Error al obtener los datos del dashboard', error);
      }
    };

    fetchData();
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montarse el componente

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#35682d]">Bienvenido al Dashboard de Administrador</h1>
      
      {/* Tarjetas de Estadísticas Clave */}
      <div className="stats flex flex-wrap justify-around">
        <Card title="Total Usuarios" number={totalUsuarios} />
        <Card title="Total Reservas" number={totalReservas} />
        <Card title="Canchas Disponibles" number={canchasDisponibles} />
        <Card title="Reservas Canceladas" number={reservasCanceladas} />
      </div>

      <div className="stats flex flex-wrap justify-around">
      <Cancha />
    </div>
    </div>

    
  );
};

export default Dashboard;