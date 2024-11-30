import React, { useState, useEffect } from "react";
import { Modal, Transfer } from "antd";
import clasesService from "../../../services/Administrador/clasesService";

function VerAlumnos({ visible, onClose, clase, onUpdate }) {
  const [alumnos, setAlumnos] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]); // Claves seleccionadas por el usuario
  const [targetKeys, setTargetKeys] = useState([]); // Claves en "Alumnos en Clase"
  const claseId = clase?.viewStudent?.id;

  useEffect(() => {
    if (claseId) {
      const fetchAlumnos = async () => {
        try {
          const response = await clasesService.getAlumnosConEstado(claseId);
          console.log("Datos recibidos del backend:", response); // Verificar datos recibidos

          // Mapear los datos para incluir "key" como identificador único
          const formattedData = response.map((alumno) => ({
            ...alumno,
            key: String(alumno.id), // Convertir ID a string para evitar conflictos
          }));

          // Inicializar `targetKeys` con alumnos que ya están en clase
          const initialTargetKeys = formattedData
            .filter((alumno) => alumno.estado === 2)
            .map((alumno) => alumno.key);

          setAlumnos(formattedData);
          setTargetKeys(initialTargetKeys);
        } catch (error) {
          console.error("Error al obtener los alumnos:", error);
        }
      };

      fetchAlumnos();
    }
  }, [claseId]);

  // Manejar cambios en las listas del Transfer
  const handleChange = (newTargetKeys) => {
    console.log("Claves de alumnos en clase:", newTargetKeys); // Verificar nuevas claves
    setTargetKeys(newTargetKeys);
  };

  // Manejar cambios en la selección
  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

    // Confirmar la adición de alumnos
    const handleConfirmAddAlumnos = async () => {
        try {
            const alumnosToAdd = alumnos
            .filter((alumno) => targetKeys.includes(alumno.key))
            .map((alumno) => alumno.id);
    
            console.log("Alumnos a añadir:", alumnosToAdd); // Verificar alumnos a añadir
    
            await clasesService.addAlumnos(claseId, alumnosToAdd);
    
            const updatedAlumnos = await clasesService.getAlumnosConEstado(claseId);
            setAlumnos(updatedAlumnos);

            onUpdate();
    
            onClose();
        } catch (error) {
            console.error("Error al añadir alumnos:", error);
        }
    };

  return (
    <Modal
      title="Ver Alumnos"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Transfer
        dataSource={alumnos}
        titles={["Alumnos Disponibles", "Alumnos en Clase"]}
        targetKeys={targetKeys} // Alumnos que están en la clase
        selectedKeys={selectedKeys} // Claves seleccionadas
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        render={(item) => `${item.first_name} ${item.last_name}`}
        showSearch
        listStyle={{
          width: "45%",
          height: 300,
        }}
        filterOption={(inputValue, item) =>
          `${item.first_name} ${item.last_name}`
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        }
      />
      <button
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2 mt-4"
        onClick={handleConfirmAddAlumnos}
      >
        Añadir Alumnos
      </button>
    </Modal>
  );
}

export default VerAlumnos;