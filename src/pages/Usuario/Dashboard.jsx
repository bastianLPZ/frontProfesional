import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import CardMetric from "../../components/Usuario/Dashboard/CardMetric";
import {
  SmileOutlined,
  MessageOutlined,
  TrophyOutlined,
  BellOutlined,
} from "@ant-design/icons";
import dashboardService from "../../services/Usuario/dashboardService";
import UserActivity from "../../components/Usuario/Dashboard/UserActivity";

function UserDashboard() {
  // Estado para las métricas
  const [metrics, setMetrics] = useState({
    actividades_completadas: 0,
    mensajes_nuevos: 0,
    notificaciones: 0,
    logros_desbloqueados: 0,
  });

  // Lógica para obtener datos del backend
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const user = localStorage.getItem("user");
        if (!user) {
          console.error(
            "Error: No se encontró el ID del usuario en localStorage."
          );
          return;
        }

        const parsedUser = JSON.parse(user);
        if (!parsedUser?.id) {
          console.error("Error: El usuario no contiene un ID válido.");
          return;
        }

        const response = await dashboardService.general(parsedUser.id);
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
            title="Actividades Completadas"
            value={metrics.actividades_completadas}
            icon={<TrophyOutlined style={{ color: "#FFD700" }} />}
            backgroundColor="#FFF8DC"
          />
        </Col>
        <Col span={6}>
          <CardMetric
            title="Actividades en curso"
            value={metrics.mensajes_nuevos}
            icon={<MessageOutlined style={{ color: "#87CEEB" }} />}
            backgroundColor="#F0F8FF"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <UserActivity user={JSON.parse(localStorage.getItem("user"))} />
        </Col>
      </Row>
    </div>
  );
}

export default UserDashboard;