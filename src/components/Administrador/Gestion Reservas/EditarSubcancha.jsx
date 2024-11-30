import React, { useState, useEffect } from 'react';
import { Input, Button, Modal } from 'antd';
import subcanchaService from '../../../services/Administrador/subcanchasService'; // Asegúrate de que la ruta sea correcta

const EditarSubcancha = ({ subcancha, visible, onClose, onUpdate }) => {
    console.log('Subcancha a editar:', subcancha);
    const [formData, setFormData] = useState({
        nombre: '',
        largo: 0,
        ancho: 0,
    });
    const [error, setError] = useState(''); // Estado para manejar errores

    // useEffect para actualizar formData cuando cambie subcancha
    useEffect(() => {
        if (subcancha) {
            setFormData({
                nombre: subcancha.nombre,
                largo: subcancha.largo,
                ancho: subcancha.ancho,
            });
        }
    }, [subcancha]); // Se ejecuta cada vez que subcancha cambia

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir comportamiento por defecto
        setError(''); // Reiniciar error

        try {
            await subcanchaService.editarSubcancha(subcancha.id, formData); // Llama al servicio para modificar la subcancha
            onUpdate(); // Llama a la función para actualizar la lista de subcanchas
            onClose(); // Cierra el modal
        } catch (error) {
            console.error('Error al modificar la subcancha:', error);
            setError('Error al modificar la subcancha: ' + (error.response?.data?.error || 'Error desconocido'));
        }
    };

    return (
        <Modal
            title="Editar Subcancha"
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={500}
        >
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar error si existe */}

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px' }}>Nombre:</label>
                    <Input
                        style={{ width: '80%' }}
                        placeholder="Nombre de la subcancha"
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px' }}>Largo:</label>
                    <Input
                        style={{ width: '80%' }}
                        placeholder="Largo de la subcancha"
                        type="number"
                        step="0.01"
                        name="largo"
                        value={formData.largo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px' }}>Ancho:</label>
                    <Input
                        style={{ width: '80%' }}
                        placeholder="Ancho de la subcancha"
                        type="number"
                        step="0.01"
                        name="ancho"
                        value={formData.ancho}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
                    type="submit"
                >Guardar Cambios</button>
            </form>
        </Modal>
    );
};

export default EditarSubcancha;