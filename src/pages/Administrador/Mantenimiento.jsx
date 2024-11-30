import React, { useState, useCallback } from "react";
import { Button, Modal } from "antd";
import { PlusIcon, CalendarIcon } from "@heroicons/react/24/outline"; // Importa los iconos
import CrearMantenimiento from "../../components/Administrador/Mantenimiento/CrearMantenimiento";
import CalendarioMantenimiento from "../../components/Administrador/Mantenimiento/CalendarioMantenimiento";
import EditarMantenimiento from "../../components/Administrador/Mantenimiento/EditarMantenimiento";

const Mantenimiento = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [selectedMantenimiento, setSelectedMantenimiento] = useState(null);
  const [calendarioView, setCalendarioView] = useState("general");
  const [reloadCalendar, setReloadCalendar] = useState(false); // Estado para recargar el calendario

  const handleOpenCrearMantenimiento = () => setModalVisible(true);
  const handleCloseCrearMantenimiento = () => setModalVisible(false);

  const handleMantenimientoClick = (mantenimiento) => {
    console.log("Click en mantenimiento:", mantenimiento); // Agregado para verificar el clic
    setSelectedMantenimiento(mantenimiento); // Almacenar el mantenimiento seleccionado
    setModalEditarVisible(true); // Abrir el modal de edición
  };

  const handleCloseModalEditar = () => {
    setModalEditarVisible(false);
    setSelectedMantenimiento(null); // Limpiar el mantenimiento seleccionado al cerrar el modal
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
          onClick={handleOpenCrearMantenimiento}
        >
          <PlusIcon className="w-5 h-5 mr-2" /> Planificar Mantenimiento
        </Button>
      </div>

      <Modal
        title="Planificar Mantenimiento"
        visible={modalVisible}
        onCancel={handleCloseCrearMantenimiento}
        footer={null}
      >
        <CrearMantenimiento
          reloadCalendar={updateCalendar}
          onClose={handleCloseCrearMantenimiento}
        />
      </Modal>

      <CalendarioMantenimiento
        onMantenimientoClick={handleMantenimientoClick}
        reload={reloadCalendar}
        reloadCalendar={updateCalendar}
      />

      {/* Modal para editar mantenimiento */}

      <EditarMantenimiento
        visible={modalEditarVisible}
        mantenimiento={selectedMantenimiento}
        onClose={handleCloseModalEditar}
        onSave={updateCalendar} // Pasa la función reloaderCalendar para actualizar el calendario
      />
    </div>
  );
};

export default Mantenimiento;
