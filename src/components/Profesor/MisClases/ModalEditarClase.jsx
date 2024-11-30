import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import clasesService from '../../../services/Profesor/clasesService';  // Asegúrate de importar el servicio correctamente

const ModalEditarClase = ({ visible, onCancel, onEditClass, clase }) => {
  const [form] = Form.useForm();

  // Cargar los valores iniciales cuando la clase cambie
  useEffect(() => {
    if (clase) {
      form.setFieldsValue({
        nombre: clase.nombre,
        descripcion: clase.descripcion,
      });
    }
  }, [clase, form]);

  const handleEditClass = async () => {
    try {
      const values = await form.validateFields();
      // Llamar al servicio para editar la clase
      const response = await clasesService.editClass(clase.id, values);
      
      if (response.status === 200) {
        message.success('Clase editada correctamente');
        // Llamar a la función para actualizar la lista de clases
        onEditClass();
      }

      // Restablecer los campos del formulario
      form.resetFields();
    } catch (error) {
      notification.error({
        message: 'Error al editar la clase',
        description: 'Hubo un error al editar la clase. Intenta nuevamente.',
      });
    }
  };

  return (
    <Modal
      title="Editar Clase"
      visible={visible}
      onCancel={onCancel}
      onOk={handleEditClass}
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
          onClick={handleEditClass}
        >
          Guardar
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

export default ModalEditarClase;