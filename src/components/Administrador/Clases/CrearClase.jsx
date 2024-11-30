import React, { useEffect, useState } from "react";
import { Input, Button, Select } from "antd";
import clasesService from "../../../services/Administrador/clasesService";

function CrearClase({ actualizarClases, setModalVisible }) {
  const [profesor, setProfesor] = useState("");
  const [nombre, setNombre] = useState("");
  const [cupoTotal, setCupoTotal] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [error, setError] = useState("");

  const [profesoresDisponibles, setProfesoresDisponibles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reiniciar error

    try {
      await clasesService.crearClase({
        profesor,
        nombre,
        cupo_total: cupoTotal,
        descripcion,
      });
      alert("Clase creada exitosamente");
      actualizarClases();

      setModalVisible(false);
      // Aquí puedes redirigir o limpiar el formulario
      setProfesor("");
      setNombre("");
      setCupoTotal("");
      setDescripcion("");
    } catch (err) {
      console.error(err);
      setError(
        "Error al crear la clase: " +
          (err.response?.data?.error || "Error desconocido")
      );
    }
  };

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await clasesService.profesoresDisponibles();
        console.log("Profesores obtenidos:", response);
        setProfesoresDisponibles(response);
      } catch (err) {
        console.error(err);
        setError(
          "Error al cargar los profesores: " +
            (err.response?.data?.error || "Error desconocido")
        );
      }
    };

    fetchProfesores();
  }, []);

  return (
    <div>
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
            value={profesor}
            onChange={(value) => setProfesor(value)}
            required
            disabled={!profesoresDisponibles.length}
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
          <label style={{ width: "100px" }}>Nombre Clase:</label>
          <Input
            placeholder="Nombre Clase"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
          <label style={{ width: "100px" }}>Cupos total:</label>
          <Input
            placeholder="Cupos clase"
            value={cupoTotal}
            type="number"
            onChange={(e) => setCupoTotal(e.target.value)}
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
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            style={{ marginRight: "16px" }}
          />
        </div>

        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2">
          Crear Clase
        </button>
      </form>
    </div>
  );
}

export default CrearClase;
