import React, { useEffect, useState } from "react";
import MetricCard from "../../../components/Administrador/Reportes/MetricCard";
import GenerarPDFClases from "../../../components/Administrador/Reportes/GenerarPDFClases";
import { Line } from "react-chartjs-2";
import { Row, Col } from "antd";
import reporteService from "../../../services/Administrador/reporteService";

// Importar elementos de chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar componentes en Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ClasesPorProfesor() {
  const [metrics, setMetrics] = useState({
    activas: 0,
    completadas: 0,
    canceladas: 0,
  });
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasesData = async () => {
      try {
        const response = await reporteService.fetchClases(); // Llamada al servicio
        console.log("Datos de Clases:", response);

        const { activas, completadas, canceladas, estudiantesPorClase } = response;
        setMetrics({ activas, completadas, canceladas });

        // Configurar datos para el gráfico
        const labels = estudiantesPorClase.map((clase) => clase.nombre);
        const data = estudiantesPorClase.map((clase) => clase.estudiantes);

        setChartData({
          labels,
          datasets: [
            {
              label: "Estudiantes por clase",
              data,
              fill: false,
              backgroundColor: "rgba(53, 104, 45, 0.6)",
              borderColor: "rgba(42, 74, 30, 1)",
                borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error al obtener los datos de clases:", error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchClasesData();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div>
      {/* Métricas */}
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <MetricCard title="Clases Activas" value={metrics.activas} />
        </Col>
        <Col span={8}>
          <MetricCard title="Clases Completadas" value={metrics.completadas} />
        </Col>
        <Col span={8}>
          <MetricCard title="Clases Canceladas" value={metrics.canceladas} />
        </Col>
      </Row>

      {/* Gráfico */}
      <div style={{ marginTop: "20px" }}>
        {chartData ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Estudiantes por clase",
                },
              },
            }}
          />
        ) : (
          <p>No hay datos para mostrar en el gráfico.</p>
        )}
      </div>

      {/* Componente de generación de PDF */}
      <GenerarPDFClases metrics={metrics} chartData={chartData} />
    </div>
  );
}

export default ClasesPorProfesor;