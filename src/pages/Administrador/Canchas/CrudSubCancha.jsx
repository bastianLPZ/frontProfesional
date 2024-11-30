import React, { useState } from "react";
import ListarSubcancha from "../../../components/Administrador/Gestion Reservas/ListarSubcancha";
import { MapIcon } from "@heroicons/react/24/outline";
import subcanchasService from "../../../services/Administrador/subcanchasService";
import CrearSubCancha from "../../../components/Administrador/Gestion Reservas/CrearSubcancha";
import { Modal } from "antd";

const CrudSubCancha = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [subcanchasUpdated, setSubcanchasUpdated] = useState([]); // Estado para almacenar las canchas actualizadas

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
  const actualizarSubcanchas = async () => {
      try {
          const response = await subcanchasService.listarSubcanchas(); // Llama al servicio para obtener las canchas
          setSubcanchasUpdated(response); // Actualiza el estado con la lista de canchas
      } catch (error) {
          console.error('Error al actualizar las subcanchas:', error);
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
                    <MapIcon className="h-5 w-5 text-white" /> Crear Sub-Cancha
                </button>
            </div>

            <Modal
                title="Crear SubCancha"
                visible={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={500}
            >
                <CrearSubCancha 
                actualizarSubCanchas={actualizarSubcanchas} 
                setModalVisible={setModalVisible}/> {/* Pasa la función para actualizar las canchas */}
            </Modal>

      <ListarSubcancha subcanchasUpdated={subcanchasUpdated}/>
    </div>
  );
};

export default CrudSubCancha;