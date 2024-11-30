import React, { useState } from "react";
import { Input } from "antd";
import usuariosService from "../../../services/Administrador/usuariosService";

function CrearUsuarios({ actualizarUsuarios, setModalVisible }) {
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
      await usuariosService.crearUsuario({
        first_name: nombre,
        last_name: apellido,
        email,
        telefono,
        direccion,
        username,
        password,
      });
      alert("Usuario creado exitosamente");
      actualizarUsuarios();

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
        "Error al crear el usuario: " +
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
            placeholder="Contraseña del usuario"
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
            placeholder="Nombre del usuario"
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
            placeholder="Apellido del usuario"
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
            placeholder="Email del usuario"
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
            placeholder="Teléfono del usuario"
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
            placeholder="Dirección del usuario"
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2">
          Crear Usuario
        </button>
    </form>
  </div>
    );
}

export default CrearUsuarios;
