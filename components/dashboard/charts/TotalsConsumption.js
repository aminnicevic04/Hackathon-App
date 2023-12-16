"use client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const TotalsConsumption = ({ data }) => {
  const lineChart = data[0];

  return (
    <div className="card_charts w-full">
      <Line
        data={{
          labels: [...Array(lineChart.data.length).keys()],
          datasets: [{ label: lineChart.label, data: lineChart.data }],
        }}
      />
      <h2 className="pt-6 text-lg text-white">{lineChart.label}</h2>
    </div>
  );
};

export default TotalsConsumption;
