import React, { useState } from "react";
import ListarProfesores from "../../components/Administrador/Usuarios/ListarProfesores";
import CrearProfesor from '../../components/Administrador/Usuarios/CrearProfesores';
import profesoresService from "../../services/Administrador/profesoresService";
import { Modal, Button } from "antd";
import { UserPlusIcon } from "@heroicons/react/24/outline";

const Profesores = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [profesoresUpdated, setProfesoresUpdated] = useState(null);

    const showModal = () => {
        setModalVisible(true);
    };

    const handleOk = () => {
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const actualizarProfesores = async () => {
        try {
            const response = await profesoresService.listarProfesores();
            setProfesoresUpdated(response);
        } catch (error) {
            console.error("Error al actualizar los profesores:", error);
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
                    Crear Profesor
                </Button>
            </div>

            <Modal
                title="Crear Profesor"
                visible={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={500}
            >
                <CrearProfesor
                    actualizarProfesores={actualizarProfesores}
                    setModalVisible={setModalVisible}
                />
            </Modal>

            <ListarProfesores
                profesoresUpdated={profesoresUpdated}
            />
      </div>
    );
};

export default Profesores;