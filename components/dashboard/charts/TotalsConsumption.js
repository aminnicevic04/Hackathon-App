"use client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const TotalsConsumption = ({ data }) => {
  return (
    <div className="card_charts w-full">
      <Line
        data={{
          labels: [...Array(data.data.length).keys()],
          datasets: [{ label: data.label, data: data.data }],
        }}
      />
      <h2 className="pt-6 text-lg text-white">{data.label}</h2>
    </div>
  );
};

export default TotalsConsumption;
