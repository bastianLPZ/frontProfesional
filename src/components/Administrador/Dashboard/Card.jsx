import React from 'react';
import { Card as AntCard } from 'antd';
import CountUp from 'react-countup';

const Card = ({ number, title }) => (
  <AntCard
    className="bg-white shadow-md rounded-lg m-2"
    style={{
      borderLeft: '4px solid #35682d',
      flex: '1 1 20%', // Permite que la tarjeta ocupe el 20% del ancho disponible
      minWidth: '200px', // Establece un ancho mínimo para las tarjetas
    }}
  >
    <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
    <p className="text-2xl font-bold text-primary">
      <CountUp end={number} separator="." />
    </p>
  </AntCard>
);

export default Card;