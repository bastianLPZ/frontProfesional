import React, { useState, useEffect } from "react";
import { Input, Button, Modal, Select } from "antd";
import clasesService from "../../../services/Administrador//clasesService";

function EditarClase({ clase, visible, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    profesor: "",
    nombre: "",
    cupo_total: "",
    descripcion: "",
  });
  const [error, setError] = useState("");

  const [profesoresDisponibles, setProfesoresDisponibles] = useState([]);

  useEffect(() => {
    if (clase) {
      console.log("Clase a editar:", clase);
      setFormData({
        profesor: clase.clase_profesor__id,
        nombre: clase.nombre,
        cupo_total: clase.cupo_total,
        descripcion: clase.descripcion,
      });
    }
  }, [clase]);

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await clasesService.profesoresDisponibles();
        console.log("Profesores obtenidos:", response);
        setProfesoresDisponibles(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfesores();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await clasesService.editarClase(clase.id, formData);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error al modificar la clase:", error);
      setError(
        "Error al modificar la clase: " +
          (error.response?.data?.error || "Error desconocido")
      );
    }
  };

  return (
    <Modal
      title="Editar Clase"
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
          <label style={{ width: "100px" }}>Profesor:</label>
          <Select
            style={{ width: "80%" }}
            placeholder="Seleccione profesor"
            value={formData.profesor}
            onChange={(value) => setFormData({ ...formData, profesor: value })}
            required
          >
            {profesoresDisponibles.map((profesor) => (
              <Select.Option key={profesor.id} value={profesor.id}>
                {profesor.first_name} {profesor.last_name}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ width: "100px" }}>Nombre:</label>
          <Input
            name="nombre"
            value={formData.nombre}
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
          <label style={{ width: "100px" }}>Cupos:</label>
          <Input
            name="cupo_total"
            value={formData.cupo_total}
            onChange={handleChange}
            placeholder="Cupos"
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
          <label style={{ width: "100px" }}>Descripción:</label>
          <Input
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
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

export default EditarClase;
