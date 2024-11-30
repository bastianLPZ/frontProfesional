import React, { useState, useEffect } from "react";
import Calendario from "../../../components/Administrador/Gestion Horas/CalendarioGeneral"; 
import ModalReserva from "../../../components/Administrador/Gestion Horas/ModalReserva";

function CalendarioGeneral({ reload, reloaderCalendar }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);

  // Maneja el cierre del modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedReserva(null); // Limpia la reserva seleccionada
  };

  // Maneja la selección de una reserva para mostrar el modal
  const handleReservaClick = (reserva) => {
    setSelectedReserva(reserva);
    setModalVisible(true);
  };

  useEffect(() => {
    // Aquí debería ir la lógica para recargar el calendario cuando reload cambie
    console.log('Calendario recargado');
  }, [reload]); // Dependiendo de reload, recarga el calendario

  return (
    <div>
      {/* Calendario general */}
      <Calendario
        onReservaClick={handleReservaClick}
        reload={reload} // Recibe el valor de reload desde Horas
      />

      {/* Modal para ver o editar la reserva seleccionada */}
      <ModalReserva
        visible={modalVisible}
        reserva={selectedReserva}
        onClose={handleCloseModal}
        onSave={reloaderCalendar} // Pasa la función reloaderCalendar para actualizar el calendario
      />
    </div>
  );
}

export default CalendarioGeneral;