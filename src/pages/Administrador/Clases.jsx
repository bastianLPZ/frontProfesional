import React, { useState } from 'react'
import ListarClases from '../../components/Administrador/Clases/ListarClases';
import CrearClase from '../../components/Administrador/Clases/CrearClase';
import { Modal, Button } from 'antd';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import clasesService from '../../services/Administrador/clasesService';

function Clases() {
  const [modalVisible, setModalVisible] = useState(false);
  const [clasesUpdated, setClasesUpdated] = useState(null);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const actualizarClases = async () => {
    try {
      const response = await clasesService.listarClases();
      setClasesUpdated(response);
    } catch (error) {
      console.error('Error al actualizar las clases:', error);
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
          Crear Clase
        </Button>
      </div>

      <Modal
        title="Crear Clase"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={500}
      >
        <CrearClase
          actualizarClases={actualizarClases}
          setModalVisible={setModalVisible}
        />
      </Modal>

      <ListarClases
        clasesUpdated={clasesUpdated}
      />
    </div>

  );
};

export default Clases;