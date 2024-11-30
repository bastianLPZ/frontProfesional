import React, { useState } from "react";
import { Input } from "antd";
import administradoresService from "../../../services/Administrador/administradoresService";

function CrearAdministrador({ actualizarAdministradores, setModalVisible }) {
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
      await administradoresService.crearAdministrador({
        first_name: nombre,
        last_name: apellido,
        email,
        telefono,
        direccion,
        username,
        password,
      });
      alert("Administrador creado exitosamente");
      actualizarAdministradores();

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
        "Error al crear el administrador: " +
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
          <label style={{ width: "100px" }}>Usuario:</label>
          <Input
            style={{ width: "80%" }}
            placeholder="Nombre de usuario"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
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
          <Input.Password
            style={{ width: "80%" }}
            placeholder="Contraseña del administrador"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
            style={{ width: "80%" }}
            placeholder="Nombre del administrador"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
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
            style={{ width: "80%" }}
            placeholder="Apellido del administrador"
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
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
            style={{ width: "80%" }}
            placeholder="Email del administrador"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ width: "100px" }}>Teléfono:</label>
          <Input
            style={{ width: "80%" }}
            placeholder="Teléfono del administrador"
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
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
            style={{ width: "80%" }}
            placeholder="Dirección del administrador"
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2">
          Crear Administrador
        </button>
      </form>
    </div>
  );
}

export default CrearAdministrador;
