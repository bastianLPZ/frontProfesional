import React, { useState, useEffect } from 'react'
import { Input, Select, Checkbox, message } from 'antd';
import horasService from '../../../services/Administrador/horasService';
import equipamientoService from '../../../services/Administrador/equipamientoService';

function CrearReserva({ reloadCalendar, onClose }) {
    const [error, setError] = useState('');
    const usuario = JSON.parse(localStorage.getItem('user'));
    const [canchasDisponibles, setCanchasDisponibles] = useState([]);
    const [subcanchasDisponibles, setSubcanchasDisponibles] = useState([]);
    const [cancha, setCancha] = useState('');
    const [subcanchas, setSubcanchas] = useState('');
    const [fecha, setFecha] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [reservarEquipamiento, setReservarEquipamiento] = useState(false); // Estado para saber si se seleccionó equipamiento
    const [equipamientosDisponibles, setEquipamientosDisponibles] = useState([]);
    const [equipamientosSeleccionados, setEquipamientosSeleccionados] = useState([]);

    // Obtener fecha y hora actual en el formato adecuado
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
    const formattedTime = today.toTimeString().split(' ')[0].slice(0, 5); // Hora actual en formato HH:MM

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reiniciar error

        try {
            await horasService.crearReserva({
                usuario: usuario.id,
                cancha,
                subcanchas,
                fecha,
                horaInicio,
                horaFin,
                equipamientos: equipamientosSeleccionados // Enviar equipamientos seleccionados
            });
            alert('Reserva creada exitosamente');
            // Actualizar las reservas aquí si es necesario
            reloadCalendar();
            onClose();
            setCancha('');
            setSubcanchas('');
            setFecha('');
            setHoraInicio('');
            setHoraFin('');
            setReservarEquipamiento(false);
            setEquipamientosSeleccionados([]);
        } catch (err) {
            console.error(err);
            setError('Error al crear la reserva: ' + (err.response?.data?.error || 'Error desconocido'));
        } finally {
            // Actualizar las reservas aquí si es necesario
            reloadCalendar();
            onClose();
            setCancha('');
            setSubcanchas('');
            setFecha('');
            setHoraInicio('');
            setHoraFin('');
            setReservarEquipamiento(false);
            setEquipamientosSeleccionados([]);
        }
    }

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

    useEffect(() => {
        async function fetchSubcanchas() {
            if (cancha) {
                try {
                    const response = await horasService.subcanchasDisponibles(cancha);
                    setSubcanchasDisponibles(response);
                } catch (error) {
                    console.error("Error al obtener subcanchas disponibles:", error);
                }
            } else {
                setSubcanchasDisponibles([]);
            }
        }
        fetchSubcanchas();
    }, [cancha]);

    // Consultar equipamientos disponibles para la fecha y hora seleccionadas
    useEffect(() => {
        async function fetchEquipamientos() {
            if (reservarEquipamiento && fecha && horaInicio && horaFin) {
                try {
                    const response = await equipamientoService.obtenerEquipamientoDisponible(fecha, horaInicio, horaFin);
                    console.log("Equipamientos disponibles:", response);
                    setEquipamientosDisponibles(response);
                } catch (error) {
                    console.error("Error al obtener equipamientos disponibles:", error);
                    message.error("No se pudo obtener los equipamientos disponibles.");
                }
            }
        }
        fetchEquipamientos();
    }, [reservarEquipamiento, fecha, horaInicio, horaFin]);


    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                {/* Seleccionar la cancha */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px' }}>Cancha:</label>
                    <Select
                        style={{ width: '80%' }}
                        placeholder="Seleccione cancha"
                        value={cancha}
                        onChange={(value) => setCancha(value)}
                        required
                    >
                        {canchasDisponibles.map((cancha) => (
                            <Select.Option key={cancha.id} value={cancha.id}>
                                {cancha.nombre}
                            </Select.Option>
                        ))}
                    </Select>
                </div>

                {/* Seleccionar la subcancha */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px' }}>Subcancha:</label>
                    <Select
                        style={{ width: '80%' }}
                        placeholder="Seleccione subcancha"
                        value={subcanchas}
                        onChange={(value) => setSubcanchas(value)}
                        required
                        disabled={!cancha || subcanchasDisponibles.length === 0}
                    >
                        {subcanchasDisponibles.map((subcancha) => (
                            <Select.Option key={subcancha.id} value={subcancha.id}>
                                {subcancha.nombre}
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
                        value={fecha}
                        min={formattedDate} // Deshabilitar fechas anteriores a hoy
                        onChange={(e) => setFecha(e.target.value)}
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
                        value={horaInicio}
                        min={fecha === formattedDate ? formattedTime : "00:00"} // Deshabilitar horas anteriores a la actual si es hoy
                        onChange={(e) => setHoraInicio(e.target.value)}
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
                        value={horaFin}
                        min={horaInicio} // Deshabilitar horas anteriores a la hora de inicio
                        onChange={(e) => setHoraFin(e.target.value)}
                        required
                    />
                </div>

                {/* Checkbox para seleccionar equipamiento */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <Checkbox onChange={(e) => setReservarEquipamiento(e.target.checked)}>
                        ¿Deseas reservar equipamiento?
                    </Checkbox>
                </div>

                {/* Seleccionar equipamientos disponibles */}
                {reservarEquipamiento && (
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <label style={{ width: '100px' }}>Equipamiento:</label>
                        <Select
                            mode="multiple"
                            style={{ width: '80%' }}
                            placeholder="Seleccione equipamiento"
                            value={equipamientosSeleccionados}
                            onChange={(value) => setEquipamientosSeleccionados(value)}
                            options={equipamientosDisponibles.map((equipamiento) => ({
                                label: equipamiento.nombre,
                                value: equipamiento.id
                            }))}
                        />
                    </div>
                )}

                {/* Botón para crear la reserva */}
                <button
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
                >
                    Crear Reserva
                </button>
            </form>
        </div>
    )
}

export default CrearReserva;