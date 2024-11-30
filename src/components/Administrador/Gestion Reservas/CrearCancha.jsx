import React, { useState } from "react";
import canchaService from '../../../services/Administrador/canchasService'; // Asegúrate de que la ruta sea correcta
import { Input } from 'antd';

const CrearCancha = ( { actualizarCanchas, setModalVisible } ) => {
    const [nombre, setNombre] = useState('');
    const [subcanchas, setSubcanchas] = useState('');
    const [largo, setLargo] = useState('');
    const [ancho, setAncho] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reiniciar error

        try {
            await canchaService.crearCancha({
                nombre,
                subcanchas,
                largo,
                ancho
            });
            alert('Cancha creada exitosamente');
            actualizarCanchas();

            setModalVisible(false);
            // Aquí puedes redirigir o limpiar el formulario
            setNombre('');
            setSubcanchas('');
            setLargo('');
            setAncho('');
        } catch (err) {
            console.error(err);
            setError('Error al crear la cancha: ' + (err.response?.data?.error || 'Error desconocido'));
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px '}}>Nombre:</label>
                    <Input
                        style={{ width: '80%' }} 
                        placeholder="Nombre de la cancha"
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px '}}>SubCanchas:</label>
                    <Input
                        style={{ width: '80%' }} 
                        placeholder="Número máximo de subcanchas permitidas"
                        type="number"
                        value={subcanchas}
                        onChange={(e) => setSubcanchas(e.target.value)}
                        required
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px' }}>Largo:</label>
                    <Input
                        style={{ width: '80%' }}
                        placeholder="Largo de la cancha"
                        type="number"
                        step="0.01"
                        value={largo}
                        onChange={(e) => setLargo(e.target.value)}
                        required
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px' }}>Ancho:</label>
                    <Input
                        style={{ width: '80%' }}
                        placeholder="Ancho de la cancha"
                        type="number"
                        step="0.01"
                        value={ancho}
                        onChange={(e) => setAncho(e.target.value)}
                        required
                    />
                </div>
                <button
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
                >Crear Cancha</button>
            </form>
        </div>
    );
};

export default CrearCancha;