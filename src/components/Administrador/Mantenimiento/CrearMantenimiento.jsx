import React, { useState, useEffect } from 'react'
import { Input, Select, message } from 'antd'
import mantenimientoService from '../../../services/Administrador/mantenimientoService'
import horasService from '../../../services/Administrador/horasService';
import profesoresService from '../../../services/Administrador/profesoresService';
import personalService from '../../../services/Administrador/personalService';

function CrearMantenimiento({ reloadCalendar, onClose }) {

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD

    const [error, setError] = useState('')
    const [fecha, setFecha] = useState('')
    const [tipo, setTipo] = useState('')
    const [comentarios, setComentarios] = useState('')

    const [cancha, setCancha] = useState(null);
    const [subcanchas, setSubcanchas] = useState(null);
    const [encargado, setEncargado] = useState(null);
  
    const [canchasDisponibles, setCanchasDisponibles] = useState([]);
    const [subcanchasDisponibles, setSubcanchasDisponibles] = useState([]);
    const [encargadosDisponibles, setEncargadosDisponibles] = useState([]);
  
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpia el mensaje de error

        try {
            await mantenimientoService.crearMantenimiento({ 
                cancha,
                subcanchas,
                encargado,
                fecha, 
                tipo, 
                comentarios 
            });
            message.success('Mantenimiento creado exitosamente');
            reloadCalendar();
            onClose();

            setCancha('');
            setSubcanchas('');
            setEncargado('');

            setFecha('');
            setTipo('');
            setComentarios('');
        } catch (error) {
            console.error('Error al crear mantenimiento:', error);
            setError('Error al crear mantenimiento: ' + (error.response?.data?.error || 'Error desconocido'));
        } 
    }

    useEffect(() => {
        async function fetchCanchas() {
            try {
                const response = await horasService.obtenerCanchasDisponibles();
                console.log('Canchas obtenidas:', response);
                setCanchasDisponibles(response);
            } catch (error) {
                console.error('Error al obtener las canchas:', error);
            }
        }
        fetchCanchas();
    }, []);

    useEffect(() => {
        async function fetchEncargados() {
            try {
                const response = await personalService.listarPersonal();
                console.log('Encargados obtenidos:', response);
                setEncargadosDisponibles(response);
            } catch (error) {
                console.error('Error al obtener los encargados:', error);
            }
        }
        fetchEncargados();
    }, []);

    useEffect(() => {
        async function fetchSubcanchas() {
            if (cancha){
            try {
                const response = await horasService.subcanchasDisponibles(cancha);
                console.log('Subcanchas obtenidas:', response);
                setSubcanchasDisponibles(response);
            } catch (error) {
                console.error('Error al obtener las subcanchas:', error);
            }
        }else{
            setSubcanchasDisponibles([]);
        }
        }
        fetchSubcanchas();
    }, [cancha]);

  return (
    
    <div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>

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

                <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
            <label style={{ width: "100px" }}>Tipo:</label>
          <Input
            placeholder="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            style={{ marginRight: "16px" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
            <label style={{ width: "100px" }}>Comentarios:</label>
          <Input
            placeholder="comentarios"
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
            style={{ marginRight: "16px" }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ width: '100px' }}>Encargado:</label>
                    <Select
                        style={{ width: '80%' }}
                        placeholder="Seleccione encargado"
                        value={encargado}
                        onChange={(value) => setEncargado(value)}
                        required
                    >
                        {encargadosDisponibles.map((encargado) => (
                            <Select.Option key={encargado.id} value={encargado.id}>
                                {encargado.first_name} {encargado.last_name}
                            </Select.Option>
                        ))}
                    </Select>
                </div>


        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2">
          Crear Equipamiento
        </button>

          
        </form>

    </div>
            
  );
}

export default CrearMantenimiento;