import React, { useState } from "react";
import CalendarioPorCancha2 from "../../../components/Administrador/Gestion Horas/CalendarioPorCancha"; // Asegúrate de que este sea el componente correcto para mostrar el calendario por cancha
import ModalReserva from "../../../components/Administrador/Gestion Horas/ModalReserva";

function CalendarioPorCancha({ reload, reloaderCalendar }) {
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

  return (
    <div>
      {/* Componente de calendario con el evento de recarga */}
      <CalendarioPorCancha2
        onReservaClick={handleReservaClick}
        reload={reload} // Recibe el valor de reload desde Horas
      />

      {/* Modal para ver o editar la reserva seleccionada */}
      <ModalReserva
        visible={modalVisible}
        reserva={selectedReserva}
        onClose={handleCloseModal}
        onSave={reloaderCalendar} // Llama a reloaderCalendar al guardar
      />
    </div>
  );
}

export default CalendarioPorCancha;