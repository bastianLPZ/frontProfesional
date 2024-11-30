import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import MetricCard from "../../../components/Administrador/Reportes/MetricCard";
import GenerarPDF from "../../../components/Administrador/Reportes/GenerarPDF"; // Importa el componente GenerarPDF
import reporteService from "../../../services/Administrador/reporteService";

function ResumenGeneral() {
  const [data, setData] = useState({
    totalReservas: 0,
    totalUsuarios: 0,
    totalCanchas: 0,
    totalClases: 0,
    totalAlumnos: 0,
    totalTorneos: 0,
    promedioAlumnosPorClase: 0,
    reservasPendientes: 0,
    reservasConfirmadas: 0,
    reservasCanceladas: 0,
    usuariosTipo: {},
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const resumenData = await reporteService.fetchResumenGeneralData(); // Cambiar según tu API
        setData(resumenData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    getData();
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      {/* Resumen de Recursos y Uso de Espacios */}
      <Row gutter={16} style={{ marginBottom: "10px" }}>
        <Col span={8}>
          <MetricCard title="Total de Canchas" value={data.totalCanchas} />
        </Col>
        <Col span={8}>
          <MetricCard title="Total de Reservas" value={data.totalReservas} />
        </Col>
        <Col span={8}>
          <MetricCard title="Total de Usuarios" value={data.totalUsuarios} />
        </Col>
      </Row>

      <hr />

      {/* Estadísticas de Usuarios */}
      <Row gutter={16} style={{ marginBottom: "10px", marginTop: "10px" }}>
        <Col span={8}>
          <MetricCard
            title="Usuarios Personal"
            value={data.usuariosTipo.personal}
          />
        </Col>
        <Col span={8}>
          <MetricCard
            title="Usuarios Administradores"
            value={data.usuariosTipo.admin}
          />
        </Col>
        <Col span={8}>
          <MetricCard
            title="Usuarios Profesores"
            value={data.usuariosTipo.profesor}
          />
        </Col>
      </Row>

      <hr />

      {/* Clases y Participación */}
      <Row gutter={16} style={{ marginBottom: "10px", marginTop: "10px" }}>
        <Col span={8}>
          <MetricCard title="Total de Clases" value={data.totalClases} />
        </Col>
        <Col span={8}>
          <MetricCard
            title="Promedio de Alumnos por Clase"
            value={data.promedioAlumnosPorClase}
          />
        </Col>
        <Col span={8}>
          <MetricCard title="Total de Alumnos" value={data.totalAlumnos} />
        </Col>
      </Row>

      <hr />

      {/* Estado de las Reservas */}
      <Row gutter={16} style={{ marginBottom: "10px", marginTop: "10px" }}>
        <Col span={8}>
          <MetricCard
            title="Reservas Confirmadas"
            value={data.reservasConfirmadas}
          />
        </Col>
        <Col span={8}>
          <MetricCard
            title="Reservas Canceladas"
            value={data.reservasCanceladas}
          />
        </Col>
        <Col span={8}>
          <MetricCard
            title="Reservas Pendientes"
            value={data.reservasPendientes}
          />
        </Col>
      </Row>

      {/* Llamada al componente GenerarPDF */}
      <GenerarPDF data={data} />
    </div>
  );
}

export default ResumenGeneral;