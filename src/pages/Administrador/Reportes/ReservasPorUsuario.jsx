import React, { useState, useEffect } from "react";
import reporteService from "../../../services/Administrador/reporteService";
import GenerarPDFReservas from "../../../components/Administrador/Reportes/GenerarPDFReservas";

function ReservasPorUsuario() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const resumenData = await reporteService.fetchReservasPorUsuarioData();
        setReservas(resumenData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <div>Cargando datos...</div>;
  if (reservas.length === 0) return <div>No hay datos para mostrar.</div>;

  // Preparar datos para el gráfico
  const data = {
    labels: reservas.map((item) => item.usuario__username || "Sin nombre"),
    datasets: [
      {
        label: "Reservas por Usuario",
        data: reservas.map((item) => item.total_reservas || 0),
        backgroundColor: "rgba(53, 104, 45, 0.6)",
        borderColor: "rgba(42, 74, 30, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  return (
    <div>
      {/* <h2>Reservas por Usuario</h2> */}
      {/* Pasamos los datos y opciones al componente GenerarPDFReservas */}
      <GenerarPDFReservas data={data} options={options} />
    </div>
  );
}

export default ReservasPorUsuario;