import React, { useState, useEffect, useRef } from "react";
import GenerarGraficoCS from "../../../components/Administrador/Reportes/GenerarGraficoCS";
import reporteService from "../../../services/Administrador/reporteService"; // Suponiendo que este servicio existe

function UsoCanchasSubcanchas() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null); // Referencia al gráfico para usar en el PDF

  useEffect(() => {
    const fetchUsoCanchasSubcanchas = async () => {
      try {
        const response = await reporteService.fetchUsoCanchasSubcanchas();
        console.log("Datos de Uso de Canchas y Subcanchas:", response);
        setData(response);
      } catch (error) {
        console.error("Error al obtener los datos de uso de canchas y subcanchas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsoCanchasSubcanchas();
  }, []);

  if (loading) return <div>Cargando datos...</div>;
  if (!data) return <div>No se encontraron datos.</div>;

  const canchasOrdenadas = data.canchas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  const subcanchasOrdenadas = data.subcanchas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  const fechas = Array.from(new Set([
    ...canchasOrdenadas.map(item => item.fecha),
    ...subcanchasOrdenadas.map(item => item.fecha),
  ])).sort((a, b) => new Date(a) - new Date(b));

  const canchasPorFecha = fechas.map(fecha => {
    return canchasOrdenadas
      .filter(item => item.fecha === fecha)
      .reduce((sum, item) => sum + item.cantidad_uso, 0);
  });

  const subcanchasPorFecha = fechas.map(fecha => {
    return subcanchasOrdenadas
      .filter(item => item.fecha === fecha)
      .reduce((sum, item) => sum + item.cantidad_uso, 0);
  });

  const chartData = {
    labels: fechas,
    datasets: [
      {
        label: "Uso de Canchas",
        data: canchasPorFecha,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Uso de Subcanchas",
        data: subcanchasPorFecha,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
  };

  return (
    <div>
      <h2>Uso de Canchas y Subcanchas</h2>
      <GenerarGraficoCS data={chartData} options={options} ref={chartRef} />
    </div>
  );
}

export default UsoCanchasSubcanchas;