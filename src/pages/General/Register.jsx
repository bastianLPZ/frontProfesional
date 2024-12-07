import axios from "axios";

const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        if (form.get('password') !== form.get('password2')) {
            alert('Las contraseñas no coinciden');
            return;
        }
        const data = {
            "first_name": form.get('name'),
            "last_name": '',
            "email":form.get('email'),
            "telefono":form.get('phone'),
            "direccion":form.get('address'),
            "username":form.get('username'),
            "password":form.get('password'),
        };
        console.log(data);
        axios.post('http://localhost:8010/administrador/usuarios/crear-usuario/', data).then((result) => {
            console.log(result);
            // Redirigir a la página de inicio de sesión
            
            window.location.href = '/login';


        }).catch((err) => {
            console.error(err);
        });
    };



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre</label>
                <input type="text" id="name" name="name" required />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="phone">Teléfono</label>
                <input type="text" id="phone" name="phone" required />
                <label htmlFor="address">Dirección</label>
                <input type="text" id="address" name="address" required />
                <label htmlFor="username">Usuario</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" required />
                <label htmlFor="password2">Repetir Contraseña</label>
                <input type="password" id="password2" name="password2" required />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default Register;