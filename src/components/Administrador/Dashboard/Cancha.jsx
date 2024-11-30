import React, { useState, useEffect } from 'react';
import dashboardService from '../../../services/Administrador/dashboardService' // Asegúrate de que esta función esté definida en tu servicio

const Cancha = () => {
  const [canchas, setCanchas] = useState([]); // Estado para almacenar las canchas
  const [subcanchas, setSubcanchas] = useState([]); // Estado para almacenar las subcanchas
  const [hoveredSubcancha, setHoveredSubcancha] = useState(null);
  const [info, setInfo] = useState(null); // Estado para almacenar la información
  const [error, setError] = useState(null); // Estado para manejar errores
  const [selectedCancha, setSelectedCancha] = useState(null); // Estado para la cancha seleccionada

  useEffect(() => {
    // Función para obtener las canchas al cargar el componente
    const getCanchas = async () => {
      try {
        const response = await dashboardService.getListCanchas(); // Llama al servicio para obtener las canchas
        console.log('Canchas obtenidas:', response);
        setCanchas(response); // Guarda los datos en el estado
      } catch (error) {
        console.error("Error fetching canchas:", error);
        setError('Error al obtener las canchas: ' + (error.response?.data?.error || 'Error desconocido'));
      }
    };

    getCanchas(); // Llama a la función solo una vez al montar el componente
  }, []);

  useEffect(() => {
    // Función para obtener las subcanchas de la cancha seleccionada
    const getSubcanchas = async () => {
      if (selectedCancha) {
        try {
          const response = await dashboardService.getInfo(selectedCancha); // Llama al servicio para obtener las subcanchas
          console.log('Subcanchas obtenidas:', response);
          setSubcanchas(response.subcanchas || []); // Usa el array si existe, de lo contrario, un array vacío          setInfo(null); // Resetea la información al cambiar de cancha
        } catch (error) {
          console.error("Error fetching subcanchas:", error);
          setError('Error al obtener las subcanchas: ' + (error.response?.data?.error || 'Error desconocido'));
        }
      }
    };

    getSubcanchas(); // Llama a la función si hay una cancha seleccionada
  }, [selectedCancha]);

  const handleMouseEnter = (subcancha) => {
    setHoveredSubcancha(subcancha);
  };

  const handleMouseLeave = () => {
    setHoveredSubcancha(null);
  };

  const handleSubcanchaClick = async (id) => {
    try {
      const response = await dashboardService.getInfo(id); // Llama al servicio para obtener la información
      console.log('Subcancha obtenida:', response);
      setInfo(response); // Guarda la información obtenida en el estado
      setError(null); // Resetea cualquier error anterior
    } catch (err) {
      console.error(err);
      setError('Error al obtener la información de la subcancha: ' + (err.response?.data?.error || 'Error desconocido'));
      setInfo(null); // Resetea la información en caso de error
    }
  };

// Definir la escala
  const escala = 10; // 1 unidad real = 10 píxeles

  // Simular los datos de canchas (aquí debes asegurarte de que los valores provengan de tu API o estado)
  const canchaa = { ancho: "100.00", largo: "62.00" }; // Simulación de datos

  // Convertir los valores a número y aplicar la escala
  const canchaAncho = 1000 // Ancho de la cancha en píxeles
  const canchaLargo = 620 // Largo de la cancha en píxeles


  // Dimensiones de las porterías
  const porteriaAncho = 80; // Ancho de la portería (en píxeles)
  const porteriaLargo = 30; // Largo de la portería (en píxeles)

  return (
    <div className="flex flex-col items-center mb-8">
      <h1 className="text-2xl mb-4">Selecciona una Cancha</h1>
      <select onChange={(e) => setSelectedCancha(e.target.value)} value={selectedCancha || ''}>
        <option value="">-- Selecciona una cancha --</option>
        {canchas.map((cancha) => (
          <option key={cancha.id} value={cancha.id}>
            {cancha.nombre}
          </option>
        ))}
      </select>

      <svg
        width={canchaAncho}
        height={canchaLargo}
        viewBox={`0 0 ${canchaAncho} ${canchaLargo}`}
        className="border border-primary mt-4"
      >
        {/* Dibujar cancha grande de fútbol */}
        <rect
          width={canchaAncho}
          height={canchaLargo}
          fill="#3c9d3c"
          stroke="#fff"
          strokeWidth="5"
        />

        {/* Esquinas */}
        <circle cx="0" cy="0" r="5" fill="#fff" />
        <circle cx={canchaAncho} cy="0" r="5" fill="#fff" />
        <circle cx="0" cy={canchaLargo} r="5" fill="#fff" />
        <circle cx={canchaAncho} cy={canchaLargo} r="5" fill="#fff" />

        {/* Área de penal */}
        <rect x={0} y={(canchaLargo - 220) / 2} width={180} height={220} fill="transparent" stroke="#fff" strokeWidth="2" />
        <rect x={canchaAncho - 180} y={(canchaLargo - 220) / 2} width={180} height={220} fill="transparent" stroke="#fff" strokeWidth="2" />

        {/* Área chica */}
        <rect x={0} y={(canchaLargo - 100) / 2} width={60} height={100} fill="transparent" stroke="#fff" strokeWidth="2" />
        <rect x={canchaAncho - 60} y={(canchaLargo - 100) / 2} width={60} height={100} fill="transparent" stroke="#fff" strokeWidth="2" />

        {/* Línea de medio campo */}
        <line x1={canchaAncho / 2} y1={0} x2={canchaAncho / 2} y2={canchaLargo} stroke="#fff" strokeWidth="2" />

        {/* Círculo central */}
        <circle cx={canchaAncho / 2} cy={canchaLargo / 2} r="90" fill="transparent" stroke="#fff" strokeWidth="2" />

        {/* Porterías */}
        <rect x={-20} y={(canchaLargo - porteriaLargo) / 2} width={20} height={porteriaLargo} fill="#fff" />
        <rect x={canchaAncho} y={(canchaLargo - porteriaLargo) / 2} width={20} height={porteriaLargo} fill="#fff" />

        {/* Dibujar subcanchas */}
        {subcanchas && subcanchas.map((subcancha) => (
          <g key={subcancha.id}>
            <rect
              x={subcancha.ubicacionX}
              y={subcancha.ubicacionY}
              width={subcancha.ancho * escala}
              height={subcancha.largo * escala}
              fill={hoveredSubcancha === subcancha.nombre ? 'rgba(0, 0, 0, 0.5)' : 'transparent'} // Cambia el color de fondo al hacer hover
              stroke="#fff"
              strokeWidth="2"
              onMouseEnter={() => handleMouseEnter(subcancha.nombre)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleSubcanchaClick(subcancha.id)} // Llama a la función al hacer clic
            />
            {/* Nombre de la subcancha */}
            <text
              x={subcancha.ubicacionX + subcancha.ancho * escala / 2} 
              y={subcancha.ubicacionY + subcancha.largo * escala / 2}
              fill="#fff"
              fontSize="14"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {subcancha.nombre}
            </text>
          </g>
        ))}
      </svg>

      {/* Texto que muestra la subcancha seleccionada */}
      {hoveredSubcancha && (
        <div className="mt-2 text-primary text-xl font-bold">
          {hoveredSubcancha}
        </div>
      )}

      {/* Mostrar información de la subcancha */}
      {info && (
        <div className="mt-2 text-primary text-lg">
          {JSON.stringify(info)} {/* Muestra la información obtenida */}
        </div>
      )}

      {/* Mostrar errores si ocurren */}
      {error && (
        <div className="mt-2 text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

export default Cancha;