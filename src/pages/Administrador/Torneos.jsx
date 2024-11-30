import React from "react";
import { Battery50Icon } from "@heroicons/react/24/outline";
import { Progress } from "antd";

const Torneos = () => {
  return (
    <div className="h-full flex items-center w-full justify-center">
      {/* <h1 className="text-2xl font-bold text-[#35682d]">Bienvenido a la gestión de Reservas: Torneos</h1> */}

      <div className="flex flex-col items-center justify-center mt-5">
        {/* <Battery50Icon className="h-72 w-72 text-[#35682d]" /> */}

        <Progress
          type="dashboard"
          steps={10}
          percent={25}
          trailColor="#f3f3f3"
          strokeWidth={20}
          strokeColor="#35682d"
          width={350}
        />

        <h1 className="text-4xl font-bold text-[#35682d]">
          En construcción...</h1>
      </div>

    </div>
  );
};

export default Torneos;