import React, { useState } from 'react';
import { Modal, Form, Select, Button } from 'antd';

const ModalAñadirEstudiantes = ({ visible, onCancel, onAddStudents, estudiantes, claseId }) => {
  const [form] = Form.useForm();
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleAddStudents = () => {
    onAddStudents(claseId, selectedStudents);
    form.resetFields();
    setSelectedStudents([]);
  };

  const handleSelectChange = (value) => {
    setSelectedStudents(value);
  };

  return (
    <Modal
      title="Añadir Estudiantes"
      visible={visible}
      onCancel={onCancel}
      onOk={handleAddStudents}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="estudiantes"
          label="Seleccionar Estudiantes"
          rules={[{ required: true, message: "Por favor selecciona estudiantes" }]}
        >
          <Select
            mode="multiple"
            placeholder="Selecciona estudiantes"
            onChange={handleSelectChange}
            options={estudiantes.map((estudiante) => ({
              label: `${estudiante.firstName} ${estudiante.lastName}`,
              value: estudiante.id,
            }))}
          />
        </Form.Item>
      </Form>
      <div className="flex justify-end">
        <Button
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
          onClick={handleAddStudents}
        >
          Añadir
        </Button>
        <Button
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
          onClick={onCancel}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
};

export default ModalAñadirEstudiantes;