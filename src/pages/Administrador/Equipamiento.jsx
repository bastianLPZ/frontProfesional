import React, { useState } from "react";
import ListarEquipamiento from "../../components/Administrador/Equipamiento/ListarEquipamiento";
import CrearEquipamiento from "../../components/Administrador/Equipamiento/CrearEquipamiento";
import equipamientoService from "../../services/Administrador/equipamientoService";
import { MapIcon } from '@heroicons/react/24/outline';
import { Modal } from 'antd';

const Equipamiento = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [equipamientosUpdated, setEquipamientosUpdated] = useState(null);

  const showModal = () => {
    setModalVisible(true);
  }

  const handleOk = () => {
    setModalVisible(false);
  }

  const handleCancel = () => {
    setModalVisible(false);
  }

  const actualizarEquipamientos = async () => {
    try {
      const response = await equipamientoService.listarEquipamiento();
      setEquipamientosUpdated(response);
    } catch (error) {
      console.error('Error al actualizar los equipamientos:', error);
    }
  };

  return (
    <div>


      <div className="flex justify-end mb-4">
        <button
          className="bg-primary text-white px-3 py-1 rounded-md hover:bg-secondary mx-2 flex items-center"
          onClick={showModal}
        >
          <MapIcon className="h-5 w-5 text-white" /> Crear Equipamiento
        </button>
      </div>

      <Modal
        title="Crear Equipamiento"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={500}

      >
        <CrearEquipamiento
          actualizarEquipamientos={actualizarEquipamientos}
          setModalVisible={setModalVisible}
        />
      </Modal>

      <ListarEquipamiento equipamientosUpdated={equipamientosUpdated} />

    </div>
  );
};

export default Equipamiento;