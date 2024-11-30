import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import CrearCancha from '../../../components/Administrador/Gestion Reservas/CrearCancha';
import { MapIcon } from '@heroicons/react/24/outline';
import ListarCanchas from '../../../components/Administrador/Gestion Reservas/ListarCanchas';
import canchaService from '../../../services/Administrador/canchasService';

const CrudCancha = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [canchasUpdated, setCanchasUpdated] = useState([]); // Estado para almacenar las canchas actualizadas

    const showModal = () => {
        setModalVisible(true);
    };

    const handleOk = () => {
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    // Definir la función para actualizar las canchas
    const actualizarCanchas = async () => {
        try {
            const response = await canchaService.listarCanchas(); // Llama al servicio para obtener las canchas
            setCanchasUpdated(response); // Actualiza el estado con la lista de canchas
        } catch (error) {
            console.error('Error al actualizar las canchas:', error);
            // Manejo de errores
        }
    };

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button
                    className="bg-primary text-white px-3 py-1 rounded-md hover:bg-secondary mx-2 flex items-center"
                    onClick={showModal}
                >
                    <MapIcon className="h-5 w-5 text-white" /> Crear Cancha
                </button>
            </div>

            <Modal
                title="Crear Cancha"
                visible={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={500}
            >
                <CrearCancha 
                actualizarCanchas={actualizarCanchas} 
                setModalVisible={setModalVisible}/> {/* Pasa la función para actualizar las canchas */}
            </Modal>

            <ListarCanchas canchasUpdated={canchasUpdated} /> {/* Pasa el estado para que la tabla se actualice */}
        </div>
    );
};

export default CrudCancha;