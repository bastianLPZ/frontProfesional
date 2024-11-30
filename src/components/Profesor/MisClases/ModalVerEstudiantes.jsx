import React from 'react';
import { Modal, Button, List } from 'antd';

const ModalVerEstudiantes = ({ visible, onCancel, estudiantes, onRemoveStudent }) => {
  return (
    <Modal
      title="Estudiantes de la clase"
      visible={visible}
      onCancel={onCancel}
      footer={null} // No mostrar los botones predeterminados
    >
      <List
        itemLayout="horizontal"
        dataSource={estudiantes}
        renderItem={(estudiante) => (
          <List.Item
            actions={[
              <Button
                className="bg-danger text-white px-4 py-2 rounded-md hover:bg-secondary"
                onClick={() => onRemoveStudent(estudiante.id)} // Eliminar estudiante
              >
                Eliminar
              </Button>
            ]}
          >
            <List.Item.Meta
              title={estudiante.nombre} // Nombre del estudiante
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default ModalVerEstudiantes;