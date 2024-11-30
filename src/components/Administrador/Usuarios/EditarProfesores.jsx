import React, { useState, useEffect } from "react";
import { Input, Button, Modal } from "antd";
import profesoresService from '../../../services/Administrador/profesoresService';

function EditarProfesores({ profesor, visible, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    telefono: "",
    direccion: "",
    username: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (profesor) {
      setFormData({
        first_name: profesor.first_name,
        last_name: profesor.last_name,
        email: profesor.email,
        telefono: profesor.telefono,
        direccion: profesor.direccion,
        username: profesor.username,
      });
    }
  }, [profesor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await profesoresService.editarProfesor(profesor.id, formData);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error al modificar el profesor:", error);
      setError(
        "Error al modificar el profesor: " +
          (error.response?.data?.error || "Error desconocido")
      );
    }
  };

  return (
    <Modal
      title="Editar Profesor"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={500}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ width: "100px" }}>Nombre:</label>
          <Input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Nombre"
            style={{ marginRight: "16px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ width: "100px" }}>Apellido:</label>
          <Input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Apellido"
            style={{ marginRight: "16px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ width: "100px" }}>Correo:</label>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo"
            style={{ marginRight: "16px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ width: "100px" }}>Telefono:</label>
          <Input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Telefono"
            style={{ marginRight: "16px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ width: "100px" }}>Direccion:</label>
          <Input
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Direccion"
            style={{ marginRight: "16px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ width: "100px" }}>Usuario:</label>
          <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Usuario"
            style={{ marginRight: "16px" }}
          />
        </div>
        <button
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
          type="submit"
        >
          Guardar Cambios
        </button>
      </form>
    </Modal>
  );
}

export default EditarProfesores;
