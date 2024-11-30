import React, { useState, useEffect } from "react";
import GenerarGraficoMantenimiento from "../../../components/Administrador/Reportes/GenerarGraficoMantenimiento";
import reporteService from "../../../services/Administrador/reporteService";

function MantenimientoCanchas() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMantenimientos = async () => {
      try {
        const response = await reporteService.fetchMantenimientos();
        console.log("Datos de Mantenimientos:", response);
        setData(response); // Asumimos que el backend ya devuelve los datos en el formato correcto
      } catch (error) {
        console.error("Error al obtener los datos de mantenimientos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMantenimientos();
  }, []);

  if (loading) return <div>Cargando datos...</div>;
  if (data.length === 0) return <div>No se encontraron datos de mantenimiento.</div>;

  return (
    <div>
      <GenerarGraficoMantenimiento data={data} />
    </div>
  );
}

export default MantenimientoCanchas;