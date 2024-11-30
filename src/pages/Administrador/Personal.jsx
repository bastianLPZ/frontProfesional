import React, { useState } from 'react';
import ListarPersonal from '../../components/Administrador/Usuarios/ListarPersonal';
import CrearPersonal from '../../components/Administrador/Usuarios/CrearPersonal';
import personalService from '../../services/Administrador/personalService';
import { Modal, Button } from 'antd';
import { UserPlusIcon } from '@heroicons/react/24/outline';

function Personal() {

    const [modalVisible, setModalVisible] = useState(false);
    const [personalUpdated, setPersonalUpdated] = useState(null);
    const [reload, setReload] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    }

    const handleOk = () => {
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const actualizarPersonal = async () => {
        try {
            const response = await personalService.listarPersonal();
            setPersonalUpdated(response); // Actualiza la lista completa
        } catch (error) {
            console.error('Error al actualizar el personal:', error);
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
        Crear Personal
      </Button>

    </div>

    <Modal
      title="Crear Personal"
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
        <CrearPersonal
            actualizarPersonal={actualizarPersonal}
            setModalVisible={setModalVisible}
            setReload={setReload}
        />

    </Modal>

    <ListarPersonal
        personalUpdated={personalUpdated}
        setPersonalUpdated={setPersonalUpdated}
        reload={reload}
    />
    </div>

  );
};

export default Personal