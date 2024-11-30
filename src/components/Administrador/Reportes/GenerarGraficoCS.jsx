import React, { forwardRef } from "react";
import { Line } from "react-chartjs-2";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GenerarGraficoCS = forwardRef(({ data, options }, ref) => {
  const downloadPDF = () => {
    const input = ref.current;
    
    if (!input) return;

    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.text("Uso de Canchas y Subcanchas", 10, 10); // Título del PDF
      pdf.addImage(imgData, "PNG", 10, 20, 180, 100); // Añadir imagen del gráfico
      pdf.save("Reporte.pdf");
    });
  };

  return (
    <div>
      <div ref={ref} style={{ width: "100%", height: "400px" }}>
        <Line data={data} options={options} />
      </div>
      <button
        onClick={downloadPDF}
        className="bg-primary text-white px-3 py-1 rounded-md flex items-center"
        style={{
          marginTop: "20px",
          backgroundColor: "#35682d",
          borderColor: "#35682d",
          color: "#fff",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#2c5e3b";
          e.target.style.borderColor = "#2c5e3b";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#35682d";
          e.target.style.borderColor = "#35682d";
        }}
      >
        <ArrowDownCircleIcon style={{ width: "20px", height: "20px", marginRight: "8px" }} />
        Descargar Reporte PDF
      </button>
    </div>
  );
});

export default GenerarGraficoCS;