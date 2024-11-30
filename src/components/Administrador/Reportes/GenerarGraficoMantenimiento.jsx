import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GenerarGraficoMantenimiento({ data }) {
  const chartRef = useRef(null); // Creamos una referencia para el gráfico

  // Filtrar las canchas sin subcancha
  const canchas = data.filter((item) => item.subcancha === "N/A");
  // Filtrar las subcanchas
  const subcanchas = data.filter((item) => item.subcancha !== "N/A");

  const numMantenimientosCanchas = canchas.map(
    (item) => item.num_mantenimientos
  ); // Número de mantenimientos para las canchas
  const numMantenimientosSubcanchas = subcanchas.map(
    (item) => item.num_mantenimientos
  ); // Número de mantenimientos para las subcanchas

  // Solo usamos las canchas en las etiquetas
  const labels = canchas.map((item) => item.cancha);

  // Datos para el gráfico
  const chartData = {
    labels: labels, // Solo las canchas como etiquetas
    datasets: [
      {
        label: "Número Mantenimientos",
        data: numMantenimientosCanchas, // Número de mantenimientos para las canchas
        backgroundColor: "rgba(53, 104, 45, 0.6)",
        borderColor: "rgba(42, 74, 30, 1)",
      },
      {
        label: "Número Mantenimientos",
        data: numMantenimientosSubcanchas, // Número de mantenimientos para las subcanchas
        backgroundColor: "rgba(53, 104, 45, 0.6)",
        borderColor: "rgba(42, 74, 30, 1)",
      },
    ],
  };

  // Función para generar el PDF
  const downloadPDF = () => {
    const input = chartRef.current; // Referencia al gráfico

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.text("Mantenimiento de Canchas", 10, 10);
      pdf.addImage(imgData, "PNG", 10, 20, 180, 100); // Ajustar el tamaño de la imagen
      pdf.save("MantenimientoCanchas.pdf"); // Descargar el archivo PDF
    });
  };

  return (
    <div>
      <div style={{ width: "100%", height: "100%" }} ref={chartRef}>
        <Bar data={chartData} />
      </div>
      <button
        onClick={downloadPDF}
        className="bg-primary text-white px-3 py-1 rounded-md flex items-center" // flexbox para alinear el ícono y el texto
        style={{
          marginBottom: "20px",
          backgroundColor: "#35682d", // color de fondo
          borderColor: "#35682d", // color del borde
          color: "#fff", // color del texto
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#2c5e3b"; // color cuando el mouse entra
          e.target.style.borderColor = "#2c5e3b"; // color del borde cuando el mouse entra
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#35682d"; // color de fondo normal
          e.target.style.borderColor = "#35682d"; // color del borde normal
        }}
      >
        <ArrowDownCircleIcon
          style={{ width: "20px", height: "20px", marginRight: "8px" }}
        />
        Descargar Reporte PDF
      </button>
    </div>
  );
}

export default GenerarGraficoMantenimiento;
