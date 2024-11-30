import React, { useState, useEffect } from 'react'
import { Input, Button, Modal, message } from 'antd'
import personalService from '../../../services/Administrador/personalService';

function EditarPersonal({ personal, visible, onClose, onUpdate }) {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        telefono: '',
        direccion: '',
        username: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (personal) {
            setFormData({
                first_name: personal.first_name,
                last_name: personal.last_name,
                email: personal.email,
                telefono: personal.telefono,
                direccion: personal.direccion,
                username: personal.username,
            });
        }
    }, [personal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            await personalService.editarPersonal(personal.id, formData); // Actualiza el personal
            onUpdate(); // Llama a la función para actualizar la lista en el padre
            message.success('Personal editado exitosamente');
        } catch (error) {
            console.error('Error al modificar el personal:', error);
            setError('Error al modificar el personal: ' + (error.response?.data?.error || 'Error desconocido'));
            return; // Detén la ejecución si hay un error
        }
        onClose(); // Solo cierra el modal si no hubo errores
    };

  return (
    
    <Modal
    title="Editar Personal"
    visible={visible}
    onCancel={onClose}
    footer={null}
    width={500}
    >
    {error && <p style={{ color: 'red' }}>{error}</p>}

    <form onSubmit={handleSubmit}>

    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ width: '100px' }}>Usuario:</label>
                <Input
                    style={{ width: '80%' }}
                    placeholder="Usuario"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ width: '100px' }}>Nombre:</label>
                <Input
                    style={{ width: '80%' }}
                    placeholder="Nombre"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ width: '100px' }}>Apellido:</label>
                <Input
                    style={{ width: '80%' }}
                    placeholder="Apellido"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ width: '100px' }}>Email:</label>
                <Input
                    style={{ width: '80%' }}
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ width: '100px' }}>Telefono:</label>
                <Input
                    style={{ width: '80%' }}
                    placeholder="Telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                />  
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ width: '100px' }}>Direccion:</label>
                <Input
                    style={{ width: '80%' }}
                    placeholder="Direccion"
                    name="direccion"
                    value={formData.direccion}
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

export default EditarPersonal