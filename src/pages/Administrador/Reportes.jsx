import React from "react";
import { Tabs } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import ResumenGeneral from "./Reportes/ResumenGeneral";
import ReservasPorUsuario from "./Reportes/ReservasPorUsuario";
import UsoCanchasSubcanchas from "./Reportes/UsoCanchasSubcanchas";
import MantenimientoCanchas from "./Reportes/MantenimientoCanchas";
import ClasesPorProfesor from "./Reportes/ClasesPorProfesor";

const { TabPane } = Tabs;

const Reportes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Si no hay una ruta específica, establecer "Resumen General" como el tab activo por defecto

  return (
    <div style={{ padding: "20px" }}>
      <Tabs
        type="card"
        tabBarStyle={{
          color: "#000000", 
          borderBottom: "2px solid #35682d" 
        }}
      >
        <TabPane tab="Resumen General" key="5">
          {/* Aquí se renderiza el componente del Resumen General */}
          <ResumenGeneral />
        </TabPane>
        <TabPane tab="Reservas por Usuario" key="1">
          <ReservasPorUsuario />
        </TabPane>
        <TabPane tab="Uso de Canchas y Subcanchas" key="2">
          <UsoCanchasSubcanchas />
        </TabPane>
        <TabPane tab="Mantenimiento de Canchas" key="3">
          <MantenimientoCanchas />
        </TabPane>
        <TabPane tab="Clases por Profesor" key="4">
          <ClasesPorProfesor  />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Reportes;