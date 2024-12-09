import { useState } from "react";
import { Card, Button } from "antd";
import {
  UserAddOutlined
} from "@ant-design/icons";

/**
 * Componente que representa una tarjeta de clase.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.clase - La información de la clase.
 * @param {number} props.clase.id - El ID de la clase.
 * @param {string} props.clase.nombre - El nombre de la clase.
 * @param {string} [props.clase.descripcion] - Una descripción opcional de la clase.
 * @param {number} props.clase.cupo_total - El cupo total de la clase.
 * @param {number} props.clase.cupo_disponible - Los cupos disponibles.


 * @param {Function} [props.onAddStudent] - Función para agregar un estudiante.
 *
 */


const CardClass = ({ clase, onAddStudent}) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para editar
  const [isStudentsModalVisible, setIsStudentsModalVisible] = useState(false); // Nuevo estado para modal de estudiantes


  
  const handleAddStudent = () => {
    onAddStudent(clase.id);
  };


  return (
    <Card
      style={{
        width: 300,
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
        transition: "all 0.3s ease",
      }}
      hoverable
      actions={[
        <Button
          key="unirse-clase"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
          type="text"
          icon={<UserAddOutlined />}
          onClick={handleAddStudent}
        />
      ]}
    >
      <h3 style={{ margin: 0 }}>
        {" "}
        <strong>{clase.nombre}</strong>{" "}
      </h3>
      <p>{clase.descripcion}</p>
      <p>Cupo total: {clase.cupo_total}</p>
      <p>Cupos disponibles: {clase.cupo_disponible}</p>
    </Card>
  );
};

export default CardClass;