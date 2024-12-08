import axios from "axios";
import { useNavigate } from 'react-router-dom';  // Usamos useNavigate de react-router-dom para redirección

const Register = () => {
    const navigate = useNavigate(); // Redirección al usar react-router

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        if (form.get('password') !== form.get('password2')) {
            alert('Las contraseñas no coinciden');
            return;
        }
        const data = {
            first_name: form.get('name'),
            email: form.get('email'),
            telefono: form.get('phone'),
            direccion: form.get('address'),
            username: form.get('username'),
            password: form.get('password'),
        };
        axios.post('http://localhost:8010/administrador/usuarios/crear-usuario/', data)
            .then(() => {
                window.location.href = '/login'; // Puedes usar navigate('/login') también si prefieres react-router
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div 
            className="h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: "url('src/assets/img/background.jpg')", // Cambia esta URL con tu imagen de fondo
            }}
        >
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Crear Cuenta Usuario</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password2" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="password2"
                            name="password2"
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Registrarse
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/Login')}  // Redirige a la página de inicio
                            className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition ml-4"
                        >
                            Volver
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
