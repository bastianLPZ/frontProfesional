import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const ModalAñadirClase = ({ visible, onCancel, onAddClass }) => {
  const [form] = Form.useForm();

  const handleAddClass = () => {
    form.validateFields().then((values) => {
      onAddClass(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Añadir Clase"
      visible={visible}
      onCancel={onCancel}
      onOk={handleAddClass}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="nombre"
          label="Nombre de la clase"
          rules={[{ required: true, message: "Por favor ingresa el nombre de la clase" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="cupos"
          label="Cupos de la clase"
          rules={[{ required: true, message: "Por favor ingresa los cupos de la clase" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[{ required: true, message: "Por favor ingresa la descripción" }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
      <div className="flex justify-end">
        <Button
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
          onClick={handleAddClass}
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

export default ModalAñadirClase;