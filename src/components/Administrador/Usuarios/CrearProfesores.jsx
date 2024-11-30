import React, { useState } from "react";
import { Input, Button } from "antd";
import profesoresService from "../../../services/Administrador/profesoresService";

function CrearProfesores({ actualizarProfesores, setModalVisible }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reiniciar error

    try {
      await profesoresService.crearProfesor({
        first_name: nombre,
        last_name: apellido,
        email,
        telefono,
        direccion,
        username,
        password,
      });
      alert("Profesor creado exitosamente");
      actualizarProfesores();

      setModalVisible(false);
      // Aquí puedes redirigir o limpiar el formulario
      setNombre("");
      setApellido("");
      setEmail("");
      setTelefono("");
      setDireccion("");
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError(
        "Error al crear el profesor: " +
          (err.response?.data?.error || "Error desconocido")
      );
    }
  };

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
          <label style={{ width: "100px" }}>Nombre:</label>
          <Input
            placeholder="Nombre"
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
        <label style={{ width: "100px" }}>Apellido:</label>
          <Input
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
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
            <label style={{ width: "100px" }}>Email:</label>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="Telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
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
            <label style={{ width: "100px" }}>Dirección:</label>
          <Input
            placeholder="Direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
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
            <label style={{ width: "100px" }}>Nombre de usuario:</label>
          <Input
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            <label style={{ width: "100px" }}>Contraseña:</label>
          <Input
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginRight: "16px" }}
          />
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2">
          Crear Profesor
        </button>
      </form>
    </div>
  );
}

export default CrearProfesores;
