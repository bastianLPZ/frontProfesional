import React, { useRef, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2"; // Importar Bar desde react-chartjs-2
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

// Asegúrate de que los elementos necesarios de Chart.js estén registrados
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function GenerarPDFReservas({ data, options }) {
  const chartRef = useRef(null); // Creamos una referencia para el gráfico
  const [isChartRendered, setIsChartRendered] = useState(false); // Control de renderización

  // Destruir el gráfico al desmontar
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Función para descargar el PDF
  const downloadPDF = () => {
    const input = document.getElementById("reservasChart");

    // Esperamos a que se dibuje el gráfico antes de capturarlo
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.text("Reservas por Usuario", 10, 10);
      pdf.addImage(imgData, "PNG", 10, 20, 180, 100); // Ajustar el tamaño de la imagen
      pdf.save("ReservasPorUsuario.pdf");
    });
  };

  // Función para renderizar el gráfico solo una vez
  useEffect(() => {
    setIsChartRendered(true); // Aseguramos que el gráfico se haya renderizado
  }, []);

  return (
    <div>
      <div id="reservasChart" style={{ width: "100%", height: "400px" }}>
        {/* Renderizar el gráfico solo cuando el estado isChartRendered sea true */}
        {isChartRendered && <Bar data={data} options={options} ref={chartRef} />}
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

export default GenerarPDFReservas;