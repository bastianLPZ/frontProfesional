import React, { useState } from "react";
import { Card, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import ModalAñadirEstudiantes from '../../../components/Profesor/MisClases/ModalAñadirEstudiantes'; // Asegúrate de importar tu modal de estudiantes
import ModalVerEstudiantes from '../../../components/Profesor/MisClases/ModalVerEstudiantes'; // Nuevo modal para ver los estudiantes
import ModalEditarClase from '../../../components/Profesor/MisClases/ModalEditarClase'; // Importamos el nuevo modal para editar
import { Modal } from "@coreui/coreui";

const CardClass = ({ clase, onEdit, onDelete, onAddStudent, onRemoveStudent }) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para editar
  const [isStudentsModalVisible, setIsStudentsModalVisible] = useState(false); // Nuevo estado para modal de estudiantes

  const handleEdit = () => {
    setIsModalVisible(true); // Mostrar el modal de edición
  };

  const handleDelete = () => {
    onDelete(clase.id);
  };

  const handleAddStudent = () => {
    onAddStudent(clase.id);
  };

  const handleViewStudents = () => {
    setIsStudentsModalVisible(true); // Abrir el modal para ver estudiantes
  };

  const handleRemoveStudent = (studentId) => {
    onRemoveStudent(clase.id, studentId); // Eliminar estudiante de la clase
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
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
          type="text"
          icon={<UserAddOutlined />}
          onClick={handleAddStudent}
        />,
        <Button
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
          type="text"
          icon={<EditOutlined />}
          onClick={handleEdit}
        />,
        <Button
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
          type="text"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        />,
        <Button
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
          type="text"
          icon={<TeamOutlined />}
          onClick={handleViewStudents} // Abrir modal de estudiantes
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

      {/* Modal para ver estudiantes */}
      <ModalVerEstudiantes
        visible={isStudentsModalVisible}
        onCancel={() => setIsStudentsModalVisible(false)}
        students={clase.usuarios}
        onRemoveStudent={handleRemoveStudent}
      />

      {/* Modal para editar clase */}
      <ModalEditarClase
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onEditClass={onEdit}
        clase={clase}
      />
    </Card>
  );
};

export default CardClass;