import { jsPDF } from "jspdf";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline"; // Importar el ícono

const GenerarPDF = ({ data }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    const yOffset = 30;

    // Título
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text("Resumen General de Reportes", margin, yOffset);

    // Tabla de datos
    const metrics = [
      { title: "Total de Reservas", value: data.totalReservas },
      { title: "Total de Usuarios", value: data.totalUsuarios },
      { title: "Total de Canchas", value: data.totalCanchas },
      { title: "Total de Clases", value: data.totalClases },
      { title: "Promedio de Alumnos por Clase", value: data.promedioAlumnosPorClase },
      { title: "Total de Alumnos", value: data.totalAlumnos },
      { title: "Total de Torneos", value: data.totalTorneos },
      { title: "Reservas Confirmadas", value: data.reservasConfirmadas },
      { title: "Reservas Canceladas", value: data.reservasCanceladas },
      { title: "Reservas Pendientes", value: data.reservasPendientes },
    ];

    let yPosition = yOffset + 10; // Espacio debajo del título

    // Cabecera de la tabla
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Indicador", margin, yPosition);
    doc.text("Valor", margin + 100, yPosition, { align: "right" });

    // Línea de separación
    yPosition += 10;
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, margin + 180, yPosition);
    yPosition += 5;

    // Filas de la tabla
    metrics.forEach((metric) => {
      doc.text(metric.title, margin, yPosition);
      doc.text(`${metric.value}`, margin + 100, yPosition, { align: "right" });
      yPosition += 10;
    });

    // Descargar el PDF
    doc.save("ResumenGeneral_Reporte.pdf");
  };

  return (
    <button
      onClick={generatePDF}
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
      <ArrowDownCircleIcon style={{ width: "20px", height: "20px", marginRight: "8px" }} />
      Descargar Reporte PDF
    </button>
  );
};

export default GenerarPDF;