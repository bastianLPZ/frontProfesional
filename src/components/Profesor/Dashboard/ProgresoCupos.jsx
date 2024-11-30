import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import dashboardService from "../../../services/Profesor/dashboardService";

const ProgresoCupos = ({ user }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = user.id;
        const response = await dashboardService.getProgresoCupos(userId);
        setData(response); // Asegúrate de que la respuesta esté en el formato correcto
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    if (user.id) {
      fetchData();
    }
  }, [user]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">
            <strong>{`${payload[0].payload.nombre}`}</strong>
          </p>
          <p className="intro">{`Cupos Ocupados: ${payload[0].payload.cupos_ocupados}`}</p>
          <p className="intro">{`Cupos Disponibles: ${payload[0].payload.cupo_disponible}`}</p>
          <p className="intro">{`Total Cupos: ${payload[0].payload.cupo_total}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nombre" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="cupos_ocupados"
          stroke="#8884d8"
          name="Cupos Ocupados"
        />
        <Line
          type="monotone"
          dataKey="cupo_disponible"
          stroke="#82ca9d"
          name="Cupos Disponibles"
        />
        <Line
          type="monotone"
          dataKey="cupo_total"
          stroke="#ff7300"
          name="Total Cupos"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProgresoCupos;
