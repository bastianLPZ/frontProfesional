import React, { useState, useEffect } from "react";
import { Input, Select } from 'antd';
import subcanchasService from "../../../services/Administrador/subcanchasService";

const CrearSubcancha = ( { actualizarSubcanchas, setModalVisible } ) => {
    const [nombre, setNombre] = useState('');
    const [cancha, setCancha] = useState('');
    const [orientacion, setOrientacion] = useState('');
    const [canchasDisponibles, setCanchasDisponibles] = useState([]);
    const [orientacionesDisponibles, setOrientacionesDisponibles] = useState([]);
    const [error, setError] = useState('');

    // Cargar las canchas disponibles al cargar el componente
    useEffect(() => {
        async function fetchCanchas() {
            try {
                const response = await subcanchasService.obtenerCanchasDisponibles();
                setCanchasDisponibles(response);
            } catch (error) {
                console.error("Error al obtener canchas disponibles:", error);
            }
        }
        fetchCanchas();
    }, []);

    // Cargar las orientaciones disponibles al seleccionar una cancha
    useEffect(() => {
        async function fetchOrientaciones() {
            if (cancha) {
                try {
                    console.log(cancha);
                    const response = await subcanchasService.obtenerOrientacionesDisponibles(cancha);
                    setOrientacionesDisponibles(response);
                } catch (error) {
                    console.error("Error al obtener orientaciones disponibles:", error);
                }
            }
        }
        fetchOrientaciones();
    }, [cancha]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reiniciar error

        try {
            await subcanchasService.crearSubcancha({
                nombre,
                cancha,
                orientacion
            });
            alert('Subcancha creada exitosamente');
            // actualizarSubcanchas();

            setModalVisible(false);
            // Aquí puedes redirigir o limpiar el formulario
            setNombre('');
            setCancha('');
            setOrientacion('');
        } catch (err) {
            console.error(err);
            setError('Error al crear la subcancha: ' + (err.response?.data?.error || 'Error desconocido'));
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
                        placeholder="Nombre de la subcancha"
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px ' }}>Cancha:</label>
                    <Select
                        style={{ width: '80%' }}
                        placeholder="Seleccione una cancha"
                        value={cancha}
                        onChange={setCancha}
                        required
                    >
                        {canchasDisponibles.map((cancha) => (
                            <Option key={cancha.id} value={cancha.id}>
                                {cancha.nombre}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px ' }}>Orientación:</label>
                    <Select
                        style={{ width: '80%' }}
                        placeholder="Seleccione una orientación"
                        value={orientacion}
                        onChange={setOrientacion}
                        required
                        disabled={!cancha}
                    >
                        {orientacionesDisponibles.map((orientacion, index) => (
                            <Option key={index} value={orientacion}>
                                {orientacion}
                            </Option>
                        ))}
                    </Select>
                </div>
                <button
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
                >Crear Sub-Cancha</button>
            </form>
        </div>
    );
};

export default CrearSubcancha;