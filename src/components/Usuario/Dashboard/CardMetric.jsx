import { Card } from "antd";


function CardMetric({ title, value, icon, backgroundColor }) {
  return (
    <Card
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 8,
        textAlign: "center",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      bodyStyle={{ padding: 20 }}
    >
      <div style={{ fontSize: 40, marginBottom: 10 }}>{icon}</div>
      <h3 style={{ margin: 0, fontSize: 18 }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 24, fontWeight: "bold" }}>{value}</p>
    </Card>
  );
}

export default CardMetric;