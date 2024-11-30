import React, { useState } from "react";
import ListarAdministradores from "../../components/Administrador/Usuarios/ListarAdministradores";
import CrearAdministrador from "../../components/Administrador/Usuarios/CrearAdministrador";
import administradoresService from "../../services/Administrador/administradoresService";
import { Modal, Button } from "antd";
import { UserPlusIcon } from "@heroicons/react/24/outline";

const Administradores = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [administradoresUpdated, setAdministradoresUpdated] = useState(null);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const actualizarAdministradores = async () => {
    try {
      const response = await administradoresService.listarAdministradores();
      setAdministradoresUpdated(response);
    } catch (error) {
      console.error("Error al actualizar los administradores:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center space-x-4">
        <Button
          className="bg-primary text-white px-3 py-1 rounded-md hover:bg-secondary mx-2"
          onClick={showModal}
        >
          <UserPlusIcon className="w-5 h-5 mr-2" />
          Crear Administrador
        </Button>
      </div>

      <Modal
        title="Crear Administrador"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={500}
      >
        <CrearAdministrador
          actualizarAdministradores={actualizarAdministradores}
          setModalVisible={setModalVisible}
        />
      </Modal>

      <ListarAdministradores
        administradoresUpdated={administradoresUpdated}
        setAdministradoresUpdated={setAdministradoresUpdated}
      />
    </div>
  );
};

export default Administradores;
