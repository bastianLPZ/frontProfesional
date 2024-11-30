import React, { useState, useCallback } from "react";
import { Button, Modal } from "antd";
import { PlusIcon, CalendarIcon } from '@heroicons/react/24/outline';  // Importa los iconos
import CrearReserva from "../../components/Administrador/Gestion Horas/CrearReserva";
import CalendarioGeneral from "./Calendarios/CalendarioGeneral";
import CalendarioPorCancha from "./Calendarios/CalendarioPorCancha";
import ModalReserva from "../../components/Administrador/Gestion Horas/ModalReserva";

const Horas = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalReservaVisible, setModalReservaVisible] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [calendarioView, setCalendarioView] = useState("general");
  const [reloadCalendar, setReloadCalendar] = useState(false); // Estado para recargar el calendario

  const handleOpenCrearReserva = () => setModalVisible(true);
  const handleCloseCrearReserva = () => setModalVisible(false);

  // Función para abrir ModalReserva con la reserva seleccionada
  const handleReservaClick = (reserva) => {
    setSelectedReserva(reserva);
    setModalReservaVisible(true);
  };

  const handleCloseModalReserva = () => {
    setModalReservaVisible(false);
    setSelectedReserva(null);
  };

  const updateCalendar = useCallback(() => {
    setReloadCalendar((prev) => !prev); // Alternar el estado para forzar el recargado
  }, []);

  return (
    <div>
      {/* Botones en la misma línea */}
      <div className="flex justify-between items-center space-x-4">
        {/* Botón Crear Reserva (alineado a la izquierda) */}
        <Button
          className="bg-primary text-white px-3 py-1 rounded-md hover:bg-secondary flex items-center"
          onClick={handleOpenCrearReserva}
        >
          <PlusIcon className="w-5 h-5 mr-2" /> Crear Reserva
        </Button>

        {/* Botones Calendario (centrados) */}
        <div className="flex space-x-4 justify-center flex-grow">
          <Button
            className="bg-primary text-white px-3 py-1 rounded-md hover:bg-secondary flex items-center"
            onClick={() => setCalendarioView("general")}
          >
            <CalendarIcon className="w-5 h-5 mr-2" /> Calendario General
          </Button>

          <Button
            className="bg-primary text-white px-3 py-1 rounded-md hover:bg-secondary flex items-center"
            onClick={() => setCalendarioView("porCancha")}
          >
            <CalendarIcon className="w-5 h-5 mr-2" /> Calendario por Cancha
          </Button>
        </div>
      </div>

      <Modal
        title="Crear Reserva"
        visible={modalVisible}
        onCancel={handleCloseCrearReserva}
        footer={null}
      >
        <CrearReserva
          onClose={handleCloseCrearReserva}
          reloadCalendar={updateCalendar}
        />
      </Modal>

      {calendarioView === "general" && (
        <CalendarioGeneral
          reloaderCalendar={updateCalendar} // Asegúrate de pasar la función de recarga
          reload={reloadCalendar} // Pasa el estado de recarga
        />
      )}
      {calendarioView === "porCancha" && (
        <CalendarioPorCancha
          reloaderCalendar={updateCalendar} // Asegúrate de pasar la función de recarga
          reload={reloadCalendar} // Asegúrate de pasar la función de recarga
        />
      )}
    </div>
  );
};

export default Horas;
