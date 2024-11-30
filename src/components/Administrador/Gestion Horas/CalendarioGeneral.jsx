import React, { useEffect, useState } from 'react';
import { Calendar, Tooltip } from 'antd';
import locale from 'antd/es/calendar/locale/es_ES'; // Configuración en español
import horasService from '../../../services/Administrador/horasService';

const CalendarioGeneral = ({ onReservaClick, reload }) => {
  const [horas, setHoras] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const getHours = async () => {
      try {
        const response = await horasService.listarHorasOcupadas();
        console.log('Horas ocupadas obtenidas:', response);
        setHoras(response);
      } catch (error) {
        console.error('Error al obtener horas ocupadas:', error);
        setError('Error al obtener horas ocupadas: ' + (error.response?.data?.error || 'Error desconocido'));
      }
    };
    getHours();
  }, [reload]); // Ahora se activa cada vez que el valor de reload cambia

  // Filtra las reservas para un día específico
  const getListData = (value) => {
    const fecha = value.format('YYYY-MM-DD'); // Convierte la fecha de la celda a un formato 'YYYY-MM-DD'
    return horas
      .filter((reserva) => reserva.fecha === fecha) // Filtra las reservas que coinciden con la fecha
      .map((reserva) => ({
        type:
          reserva.estado === 'pendiente'
            ? 'warning' // Amarillo para pendiente
            : reserva.estado === 'confirmada'
            ? 'success' // Verde para confirmada
            : 'error', // Rojo para cancelada
        content: `Reserva ${reserva.usuario} - ${reserva.hora_inicio} a ${reserva.hora_fin}`, // Texto de la reserva
        reservaData: reserva, // Guarda toda la data de la reserva para mostrar en el modal
      }));
  };

  // Renderiza el contenido de cada celda del calendario
  const dateCellRender = (value) => {
    const listData = getListData(value); // Obtiene las reservas para esa fecha
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index} onClick={() => onReservaClick(item.reservaData)}>
            <Tooltip
              title={
                <div>
                  <strong>Cancha:</strong> {item.reservaData.cancha} <br />
                  <strong>Hora:</strong> {item.reservaData.hora_inicio} a {item.reservaData.hora_fin} <br />
                  <strong>Estado:</strong> {item.reservaData.estado}
                </div>
              }
            >
              {/* Cambiar color de texto según el estado */}
              <span
                className={
                  item.type === 'warning'
                    ? 'bg-yellow-300'
                    : item.type === 'success'
                    ? 'bg-green-300'
                    : 'bg-red-300'
                }
              >
                {item.content}
              </span>
            </Tooltip>
          </li>
        ))}
      </ul>
    );
  };

  const monthCellRender = () => null; // No muestra contenido en las celdas mensuales

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div className="p-4 bg-white">
      <Calendar cellRender={cellRender} locale={locale} />
    </div>
  );
};

export default CalendarioGeneral;