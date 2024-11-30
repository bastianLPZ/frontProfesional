import React, { useState } from "react";
import ListarUsuarios from "../../components/Administrador/Usuarios/ListarUsuarios";
import CrearUsuario from "../../components/Administrador/Usuarios/CrearUsuarios";
import usuariosService from "../../services/Administrador/usuariosService";
import { Modal, Button } from "antd";
import { UserPlusIcon } from "@heroicons/react/24/outline";

const Usuarios = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [usuariosUpdated, setUsuariosUpdated] = useState(null);

  const showModal = () => {
    setModalVisible(true);
  }

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const actualizarUsuarios = async () => {
    try {
      const response = await usuariosService.ListarUsuarios();
      setUsuariosUpdated(response);
    } catch (error) {
      console.error("Error al actualizar los usuarios:", error);
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
          Crear Usuario
        </Button>
      </div>  

      <Modal
        title="Crear Usuario"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={500}
      >
        <CrearUsuario
          actualizarUsuarios={actualizarUsuarios}
          setModalVisible={setModalVisible}
        />
      </Modal>

      <ListarUsuarios
        usuariosUpdated={usuariosUpdated}
        setUsuariosUpdated={setUsuariosUpdated}
      />
    </div>

    );
};

export default Usuarios;