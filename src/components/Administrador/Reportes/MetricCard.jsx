import React from "react";
import { Card, Statistic } from "antd";

// Este componente recibirá `title`, `value`, y `color` como props
function MetricCard({ title, value, color }) {
  return (
    <Card>
      <Statistic
        title={title}
        value={value}
        valueStyle={{ color: color || "#35682d" }} // Usar el color pasado por props o el predeterminado
      />
    </Card>
  );
}

export default MetricCard;