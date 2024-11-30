import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Button, Tag } from 'antd';
import horasService from '../../../services/Administrador/horasService';

const ModalReserva = ({ visible, reserva, onClose, onSave }) => {
    if (!reserva) {
        return null;
    }

    console.log('Reserva a editar:', reserva);

    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        cancha: '',
        fecha: '',
        horaInicio: '',
        horaFin: '',
        estado: '',
        equipamientos: [],
    });
    
    // Estados para los datos disponibles
    const [estadosDisponibles, setEstadosDisponibles] = useState([]);
    const [canchasDisponibles, setCanchasDisponibles] = useState([]);
    const [error, setError] = useState('');

    // Al cambiar la reserva, actualiza el formulario
    useEffect(() => {
        if (reserva) {
            setFormData({
                cancha: reserva.cancha,
                fecha: reserva.fecha,
                horaInicio: reserva.hora_inicio,
                horaFin: reserva.hora_fin,
                estado: reserva.estado,
                equipamientos: reserva.equipamiento_reservado, // Asignar equipamientos
            });
        }
    }, [reserva]);

    // Obtener los estados disponibles
    useEffect(() => {
        async function fetchEstado() {
            try {
                const response = await horasService.obtenerEstadoDisponible();
                console.log('Estado obtenido:', response);
                setEstadosDisponibles(response);
            } catch (error) {
                console.error('Error al obtener el estado:', error);
            }
        }
        fetchEstado();
    }, []);

    // Obtener las canchas disponibles
    useEffect(() => {
        async function fetchCancha() {
            try {
                const response = await horasService.obtenerCanchasDisponibles();
                console.log('Canchas obtenidas:', response);
                setCanchasDisponibles(response);
            } catch (error) {
                console.error('Error al obtener las canchas:', error);
            }
        }
        fetchCancha();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await horasService.editarReserva(reserva.id, formData);
            onClose();
            console.log('Llamando a onSave para recargar el calendario');
            onSave();
        } catch (error) {
            console.error('Error al modificar la reserva:', error);
            setError('Error al modificar la reserva: ' + (error.response?.data?.error || 'Error desconocido'));
        }
    };

    return (
        <Modal
            title={`Detalles de la Reserva - ${reserva.hora_inicio} a ${reserva.hora_fin}`}
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={600}
        >
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar error si existe */}

            <form onSubmit={handleSubmit}>

                {/* Seleccionar la cancha */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px' }}>Cancha:</label>
                    <Select
                        style={{ width: '80%' }}
                        placeholder="Seleccione cancha"
                        value={formData.cancha}  // Usar el valor de cancha en formData
                        onChange={(value) => setFormData({ ...formData, cancha: value })}  // Actualizar el valor de cancha
                        required
                    >
                        {canchasDisponibles.map((cancha) => (
                            <Select.Option key={cancha.id} value={cancha.id}>
                                {cancha.nombre}
                            </Select.Option>
                        ))}
                    </Select>
                </div>

                {/* Seleccionar la fecha */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px' }}>Fecha:</label>
                    <Input
                        style={{ width: '80%' }}
                        placeholder="Seleccione Fecha"
                        type="date"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Seleccionar hora inicio */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px' }}>Hora Inicio:</label>
                    <Input
                        style={{ width: '80%' }}
                        placeholder="Seleccione Hora Inicio"
                        type="time"
                        name="horaInicio"
                        value={formData.horaInicio}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Seleccionar hora fin */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px' }}>Hora Fin:</label>
                    <Input
                        style={{ width: '80%' }}
                        placeholder="Seleccione Hora Fin"
                        type="time"
                        name="horaFin"
                        value={formData.horaFin}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Seleccionar el estado */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px' }}>Estado:</label>
                    {console.log('Estado:', formData.estado)}
                    <Select
                        style={{ width: '80%' }}
                        placeholder="Cambia el estado de la reserva"
                        value={formData.estado}
                        onChange={(value) => setFormData({ ...formData, estado: value })}
                        required
                    >
                        {estadosDisponibles.map((estado) => (
                            <Select.Option key={estado} value={estado}>
                                {estado}
                            </Select.Option>
                        ))}
                    </Select>
                </div>

                {/* Mostrar equipamientos reservados como tags */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px' }}>Equipamientos:</label>
                    <div style={{ width: '80%', display: 'flex', flexWrap: 'wrap' }}>
                        {formData.equipamientos.map((equipamiento, index) => (
                            <Tag key={index} color="green" style={{ marginBottom: '4px', fontSize: '14px' }}>
                                {equipamiento}
                            </Tag>
                        ))}
                    </div>
                </div>

                {/* Botón para modificar la reserva */}
                <button
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
                >
                    Modificar Reserva
                </button>
            </form>
        </Modal>
    );
};

export default ModalReserva;