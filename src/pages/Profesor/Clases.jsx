import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CardClass from "../../components/Profesor/MisClases/CardClass"; // Asegúrate de importar el componente CardClass
import clasesService from "../../services/Profesor/clasesService"; // Asegúrate de ajustar la ruta de tu servicio
import ModalAñadirClase from "../../components/Profesor/MisClases/ModalAñadirClase";
import ModalEditarClase from "../../components/Profesor/MisClases/ModalEditarClase";
import ModalAñadirEstudiantes from "../../components/Profesor/MisClases/ModalAñadirEstudiantes";

const Clases = () => {
  const [clases, setClases] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddStudentsModalVisible, setIsAddStudentsModalVisible] =
    useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [students, setStudents] = useState([]); // Lista de estudiantes disponibles

  useEffect(() => {
    console.log("Clases:", clases); // Verifica el contenido de clases después de la actualización
  }, [clases]); // Solo se ejecuta cuando 'clases' cambia

  // Definir la función fetchClases fuera de useEffect
  const fetchClases = async () => {
    try {
      const response = await clasesService.getClases();
      console.log("Clases recibidas:", response);
      setClases(Array.isArray(response) ? response : []); // Asegura que 'response' sea un arreglo
    } catch (error) {
      console.error("Error fetching clases:", error);
    }
  };

  useEffect(() => {
    fetchClases(); // Cargar las clases al cargar el componente
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await clasesService.getStudents();
      console.log("Estudiantes:", response); // Verifica la respuesta de la API
      setStudents(response);
    } catch (error) {
      console.error("Error fetching estudiantes:", error);
    }
  };

  useEffect(() => {
    fetchStudents(); // Cargar los estudiantes al cargar el componente
  }, []);

  const handleAddClass = (values) => {
    // Llamar al servicio para añadir la clase
    clasesService.createClass(values).then(() => {
      setIsAddModalVisible(false);
      fetchClases(); // Recargar las clases
    });
  };

  const handleEditClass = (id, values) => {
    // Llamar al servicio para editar la clase
    clasesService.editClass(id, values).then(() => {
      setIsEditModalVisible(false);
      fetchClases(); // Recargar las clases
    });
  };

  const handleDeleteClass = (id) => {
    // Llamar al servicio para eliminar la clase
    clasesService.deleteClass(id).then(() => {
      fetchClases(); // Recargar las clases
    });
  };

  const handleAddStudents = (classId, studentIds) => {
    // Llamar al servicio para añadir estudiantes a la clase
    clasesService.addStudentsToClass(classId, studentIds).then(() => {
      setIsAddStudentsModalVisible(false);
      fetchClases(); // Recargar las clases
    });
  };

  const handleEditClick = (clase) => {
    setEditingClass(clase);
    setIsEditModalVisible(true);
  };

  const handleAddStudentsClick = (claseId) => {
    setEditingClass({ id: claseId });
    setIsAddStudentsModalVisible(true);
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Button
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalVisible(true)}
          >
            Añadir Clase
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {clases && clases.length > 0 ? (
          clases.map((clase) => (
            <Col span={8} key={clase.id}>
              <CardClass
                clase={clase}
                onEdit={() => handleEditClick(clase)}
                onDelete={handleDeleteClass}
                onAddStudent={() => handleAddStudentsClick(clase.id)}
              />
            </Col>
          ))
        ) : (
          <p>No hay clases disponibles.</p>
        )}
      </Row>

      {/* Modal Añadir Clase */}
      <ModalAñadirClase
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onAddClass={handleAddClass}
      />

      {/* Modal Editar Clase */}
      {editingClass && (
        <ModalEditarClase
          visible={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          onEditClass={handleEditClass}
          clase={editingClass}
        />
      )}

      {/* Modal Añadir Estudiantes */}
      {editingClass && (
        <ModalAñadirEstudiantes
          visible={isAddStudentsModalVisible}
          onCancel={() => setIsAddStudentsModalVisible(false)}
          onAddStudents={handleAddStudents}
          estudiantes={students}
          claseId={editingClass.id}
        />
      )}
    </div>
  );
};

export default Clases;
