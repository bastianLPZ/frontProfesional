import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Button, Popconfirm } from "antd";
import mantenimientoService from "../../../services/Administrador/mantenimientoService";
import {
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function EditarMantenimiento({ visible, mantenimiento, onClose, onSave }) {
  if (!mantenimiento) {
    return null;
  }

  console.log("Mantenimiento a editar:", mantenimiento); // Log para verificar que el mantenimiento es el correcto

  const [formData, setFormData] = useState({
    fecha: "",
    tipo: "",
    comentarios: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (mantenimiento) {
      setFormData({
        fecha: mantenimiento.fecha,
        tipo: mantenimiento.tipo,
        comentarios: mantenimiento.comentarios,
      });
    }
  }, [mantenimiento]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpia el mensaje de error
    try {
      await mantenimientoService.editarMantenimiento(
        mantenimiento.id,
        formData
      );
      onClose();
      onSave();
    } catch (error) {
      console.error("Error al editar mantenimiento:", error);
      setError(
        "Error al editar mantenimiento: " +
          (error.response?.data?.error || "Error desconocido")
      );
    }
  };

  const handleDelete = async (id) => {
    setError(""); // Limpia el mensaje de error
    try {
      await mantenimientoService.eliminarMantenimiento(id);
      onClose();
      onSave();
    } catch (error) {
      console.error("Error al eliminar mantenimiento:", error);
      setError(
        "Error al eliminar mantenimiento: " +
          (error.response?.data?.error || "Error desconocido")
      );
    }
  };

  const buttonStyle = {
    backgroundColor: "#35682d", // bg-primary
    color: "white", // text-white
    padding: "8px 16px", // px-6 py-1
    borderRadius: "8px", // rounded-md
    margin: "0 8px", // mx-2
    cursor: "pointer",
  };

  return (
    <Modal
      title="Editar mantenimiento"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Seleccionar la fecha */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ width: "100px" }}>Fecha:</label>
          <Input
            style={{ width: "80%" }}
            placeholder="Seleccione Fecha"
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>

        {/* Ingresar el nombre */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ width: "100px" }}>Tipo:</label>
          <Input
            style={{ width: "80%" }}
            placeholder="Ingrese tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          />
        </div>

        {/* Ingresar la descripción */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ width: "100px" }}>Descripción:</label>
          <Input.TextArea
            style={{ width: "80%" }}
            placeholder="Ingrese comentarios"
            name="comentarios"
            value={formData.comentarios}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
        >
          Guardar Cambios
        </button>
        <Popconfirm
          icon={<QuestionMarkCircleIcon className="h-5 w-5 text-primary" />}
          title="¿Estás seguro de que deseas eliminar este equipamiento?"
          onConfirm={() => {
            console.log(
              "Confirmando eliminación de mantenimiento con ID:",
              mantenimiento.id
            ); // Agrega un log
            handleDelete(mantenimiento.id);
          }}
          okText="Sí"
          cancelText="No"
          okButtonProps={{ style: buttonStyle }}
          cancelButtonProps={{ style: buttonStyle }}
        >
          <button
            type="button"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
          >
            <TrashIcon className="h-5 w-5 text-white inline-block mr-1" />
            Eliminar
          </button>
        </Popconfirm>
      </form>
    </Modal>
  );
}

export default EditarMantenimiento;
