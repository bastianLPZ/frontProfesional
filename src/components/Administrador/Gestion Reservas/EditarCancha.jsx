import React, { useState, useEffect } from 'react';
import { Input, Button, Modal } from 'antd';
import canchaService from '../../../services/Administrador/canchasService'; // Asegúrate de que la ruta sea correcta

const EditarCancha = ({ cancha, visible, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        subcanchas: '',
        largo: '',
        ancho: '',
    });
    const [error, setError] = useState(''); // Estado para manejar errores

    // useEffect para actualizar formData cuando cambie cancha
    useEffect(() => {
        if (cancha) {
            setFormData({
                nombre: cancha.nombre,
                subcanchas: cancha.capacidad_subcanchas,
                largo: cancha.largo,
                ancho: cancha.ancho,
            });
        }
    }, [cancha]); // Se ejecuta cada vez que cancha cambia

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir comportamiento por defecto
        setError(''); // Reiniciar error

        try {
            await canchaService.editarCancha(cancha.id, formData); // Llama al servicio para modificar la cancha
            onUpdate(); // Llama a la función para actualizar la lista de canchas
            onClose(); // Cierra el modal
        } catch (error) {
            console.error('Error al modificar la cancha:', error);
            setError('Error al modificar la cancha: ' + (error.response?.data?.error || 'Error desconocido'));
        }
    };

    return (
        <Modal
            title="Editar Cancha"
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
                        placeholder="Nombre de la cancha"
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px' }}>SubCanchas:</label>
                    <Input
                        style={{ width: '80%' }}
                        placeholder="Número máximo de subcanchas permitidas"
                        type="number"
                        name="subcanchas"
                        value={formData.subcanchas}
                        onChange={handleChange}
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
                        placeholder="Ancho de la cancha"
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

export default EditarCancha;