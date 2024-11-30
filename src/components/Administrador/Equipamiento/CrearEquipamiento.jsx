import React, { useState } from 'react';
import equipamientoService from '../../../services/Administrador/equipamientoService';
import { Input } from 'antd';


function CrearEquipamiento({ actualizarEquipamientos, setModalVisible }) {
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [cantidad_total, setCantidadTotal] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reiniciar error

        try {
            await equipamientoService.crearEquipamiento({
                nombre,
                cantidad,
                cantidad_total,
                descripcion
            });
            alert('Equipamiento creado exitosamente');
            actualizarEquipamientos();

            setModalVisible(false);
            // Aquí puedes redirigir o limpiar el formulario
            setNombre('');
            setCantidad('');
            setCantidadTotal('');
            setDescripcion('');
        } catch (err) {
            console.error(err);
            setError('Error al crear el equipamiento: ' + (err.response?.data?.error || 'Error desconocido'));
        }
    }

  return (
    
    <div>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ width: '100px' }}>Nombre:</label>
                <Input
                    style={{ width: '80%' }}
                    placeholder="Nombre del equipamiento"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ width: '100px' }}>Cantidad:</label>
                <Input
                    style={{ width: '80%' }}
                    placeholder="Cantidad de equipamiento"
                    type="number"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    required
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ width: '100px' }}>Cantidad total:</label>
                <Input
                    style={{ width: '80%' }}
                    placeholder="Cantidad total de equipamiento"
                    type="number"
                    value={cantidad_total}
                    onChange={(e) => setCantidadTotal(e.target.value)}
                    required
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ width: '100px' }}>Descripción:</label>
                <Input
                    style={{ width: '80%' }}
                    placeholder="Descripción del equipamiento"
                    type="text"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />
            </div>
            <button
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
                >Crear Equipamiento</button>
            </form>
        </div>
  )
}

export default CrearEquipamiento