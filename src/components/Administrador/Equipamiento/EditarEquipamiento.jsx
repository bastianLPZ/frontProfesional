import React, { useState, useEffect } from 'react'
import { Input, Button, Modal } from 'antd'
import equipamientoService from '../../../services/Administrador/equipamientoService'

function EditarEquipamiento({ equipamiento, visible, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        nombre: '',
        cantidad: '',
        cantidad_total: '',
        descripcion: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (equipamiento) {
            setFormData({
                nombre: equipamiento.nombre,
                cantidad: equipamiento.cantidad_disponible,
                cantidad_total: equipamiento.cantidad_total,
                descripcion: equipamiento.descripcion,
            });
        }
    }, [equipamiento]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await equipamientoService.editarEquipamiento(equipamiento.id, formData);
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Error al modificar el equipamiento:', error);
            setError('Error al modificar el equipamiento: ' + (error.response?.data?.error || 'Error desconocido'));
        }
    };

  return (
    <Modal 
        title="Editar Equipamiento"
        visible={visible}
        onCancel={onClose}
        footer={null}
        width={500}
    >
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ width: '100px' }}>Nombre:</label>
                <Input
                    style={{ width: '80%' }}
                    placeholder="Nombre del equipamiento"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ width: '100px' }}>Cantidad:</label>
                <Input
                    style={{ width: '80%' }}
                    placeholder="Cantidad"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ width: '100px' }}>Cantidad total:</label>
                <Input
                    style={{ width: '80%' }}
                    placeholder="Cantidad total"
                    name="cantidad_total"
                    value={formData.cantidad_total}
                    onChange={handleChange}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ width: '100px' }}>Descripción:</label>
                <Input
                    style={{ width: '80%' }}
                    placeholder="Descripción"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                />
            </div>
            <button
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
                    type="submit"
                >Guardar Cambios</button>
            </form>
    </Modal>
  )
}

export default EditarEquipamiento