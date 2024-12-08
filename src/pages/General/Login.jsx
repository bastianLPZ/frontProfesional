import React, { useState } from 'react';
import { loginUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/img/background.jpg';
import { useSession } from "../../context/session-context";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuth } = useSession();

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
    const { success, usuario, error: errorMessage } = await loginUser(username, password);

    if (success) {
      console.log("Usuario guardado en localStorage:", usuario);
      setIsAuth(true);
      navigate("/", {
        replace: true
      });
    } else {
      setError(errorMessage); // Mostrar el error si lo hay
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/registro"); // Redirige a la ruta correcta para el registro // Redirige a la página de creación de cuenta
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
        <div className="absolute inset-0 bg-opacity-30"></div>
        <div className="flex items-center justify-center h-full">
          <div className="bg-white bg-opacity-60 p-8 rounded-lg shadow-lg w-96 relative z-10">
            <h1 className="text-3xl font-bold text-center text-[#35682d] mb-10">Iniciar Sesión</h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#35682d]"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#35682d]"
              />
              <button
                type="submit"
                className="w-full p-3 bg-[#35682d] text-white rounded-lg hover:bg-[#35682d] transition"
              >
                Iniciar Sesión
              </button>
            </form>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            <div className="mt-4 text-center">
              <button
                onClick={handleSignUpRedirect}
                className="text-sm text-[#35682d] underline hover:text-[#274b1a]"
              >
                ¿No tienes cuenta? Crear una aquí
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
