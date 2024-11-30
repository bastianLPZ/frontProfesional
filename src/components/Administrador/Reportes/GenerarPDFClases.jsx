import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Line } from "react-chartjs-2";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

function GenerarPDFClases({ metrics, chartData }) {
  const ref = useRef(null); // Declara el ref

  const downloadPDF = () => {
    const input = ref.current; // Accede al elemento DOM asociado al ref

    if (!input) return;

    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.text("Uso de Canchas y Subcanchas", 10, 10); // Título del PDF
      pdf.addImage(imgData, "PNG", 10, 20, 300, 100); // Añadir imagen del gráfico
      pdf.save("Reporte.pdf");
    });
  };

  return (
    <div>
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

      {/* Contenido para capturar */}
      <div ref={ref} style={{ marginTop: "20px", padding: "20px", backgroundColor: "#fff" }}>
        <h3>Reporte de Clases por Profesor</h3>
        <div>
          <p>Clases Activas: {metrics.activas}</p>
          <p>Clases Completadas: {metrics.completadas}</p>
          <p>Clases Canceladas: {metrics.canceladas}</p>
        </div>
        {chartData && (
          <div style={{ width: "100%", height: "300px" }}>
            <Line data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default GenerarPDFClases;