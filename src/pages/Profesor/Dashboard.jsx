import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import CardMetric from "../../components/Profesor/Dashboard/CardMetric";
import {
  TeamOutlined,
  UserOutlined,
  CalendarOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import dashboardService from "../../services/Profesor/dashboardService";
import ProgresoCupos from "../../components/Profesor/Dashboard/ProgresoCupos";

function Dashboard() {
  // Estado para las métricas
  const [metrics, setMetrics] = useState({
    clases_activas: 0,
    estudiantes_registrados: 0,
    reservas_proximas: 0,
    estudiantes_en_clases: 0,
  });

  // Lógica para obtener datos del backend
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Obtener el ID del usuario logueado desde localStorage
        const user = localStorage.getItem("user");
        if (!user) {
          console.error(
            "Error: No se encontró el ID del usuario en localStorage."
          );
          return;
        }

        // Llama al servicio con el ID del usuario
        const response = await dashboardService.general(user);

        // Actualiza el estado con las métricas obtenidas
        setMetrics(response);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <CardMetric
            title="Clases Activas"
            value={metrics.clases_activas}
            icon={<TeamOutlined style={{ color: "#1890FF" }} />}
            backgroundColor="#E6F7FF"
          />
        </Col>
        <Col span={6}>
          <CardMetric
            title="Estudiantes Registrados"
            value={metrics.estudiantes_registrados}
            icon={<UserOutlined style={{ color: "#52C41A" }} />}
            backgroundColor="#F6FFED"
          />
        </Col>
        <Col span={6}>
          <CardMetric
            title="Reservas Próximas"
            value={metrics.reservas_proximas}
            icon={<CalendarOutlined style={{ color: "#FAAD14" }} />}
            backgroundColor="#FFFBE6"
          />
        </Col>
        <Col span={6}>
          <CardMetric
            title="Estudiantes Activos"
            value={metrics.estudiantes_en_clases}
            icon={<UserSwitchOutlined style={{ color: "#F5222D" }} />}
            backgroundColor="#FFF1F0"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProgresoCupos user={JSON.parse(localStorage.getItem("user"))} />
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
