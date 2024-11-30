import React, { useEffect, useState } from 'react';
import { Calendar, Tooltip } from 'antd';
import locale from 'antd/es/calendar/locale/es_ES';
import mantenimientoService from '../../../services/Administrador/mantenimientoService';

function CalendarioMantenimiento({ onMantenimientoClick, reload }) {
    const [mantenimientos, setMantenimientos] = useState([]);
    const [error, setError] = useState(null);

    // Mapa para almacenar colores asignados a cada id
    const colorMapa = {};

    console.log('Recargando calendario...', reload); // Log para verificar cuando el calendario recarga

    const generarColor = (id) => {
        if (!colorMapa[id]) {
            // Generar un color pseudoaleatorio basado en el ID
            const hash = id.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const hue = hash % 360; // Valor de 0 a 359 (matiz de color)
            colorMapa[id] = `hsl(${hue}, 70%, 50%)`; // Color HSL único
        }
        return colorMapa[id];
    };

    useEffect(() => {
        const getMantenimientos = async () => {
            try {
                const response = await mantenimientoService.listarMantenimientos();
                console.log('Mantenimientos obtenidos:', response); // Verifica los mantenimientos obtenidos
                setMantenimientos(response);
            } catch (error) {
                console.error('Error al obtener mantenimientos:', error);
                setError('Error al obtener mantenimientos: ' + (error.response?.data?.error || 'Error desconocido'));
            }
        };
        getMantenimientos();
    }, [reload]);  // Recargar cuando reload cambie

    const dateCellRender = (value) => {
        const fecha = value.format('YYYY-MM-DD');
        const mantenimientosDia = mantenimientos.filter((mantenimiento) => mantenimiento.fecha === fecha);

        return (
            mantenimientosDia.length > 0 && (
                <ul className="events">
                    {mantenimientosDia.map((mantenimiento, index) => {
                        const color = generarColor(mantenimiento.encargado__id); // Generar color basado en ID
                        return (
                            <li
                                key={index}
                                onClick={() => {
                                    console.log('Click en mantenimiento:', mantenimiento);  // Log para verificar el clic
                                    onMantenimientoClick(mantenimiento);  // Llama a la función del padre
                                }}
                                style={{
                                    backgroundColor: color,
                                    color: '#fff',
                                    borderRadius: '4px',
                                    padding: '4px',
                                    margin: '2px 0',
                                }}
                            >
                                <Tooltip
                                    title={
                                        <div>
                                            <strong>Encargado:</strong> {mantenimiento.encargado__first_name} {mantenimiento.encargado__last_name}<br />
                                            <strong>Cancha:</strong> {mantenimiento.cancha__nombre || 'Sin asignar'}<br />
                                            <strong>Comentarios:</strong> {mantenimiento.comentarios}
                                        </div>
                                    }
                                >
                                    <span>{mantenimiento.cancha__nombre}</span>
                                </Tooltip>
                            </li>
                        );
                    })}
                </ul>
            )
        );
    };

    return (
        <div className="p-4 bg-white">
            {error && <div className="error-message">{error}</div>}
            <Calendar dateCellRender={dateCellRender} locale={locale} />
        </div>
    );
}

export default CalendarioMantenimiento;