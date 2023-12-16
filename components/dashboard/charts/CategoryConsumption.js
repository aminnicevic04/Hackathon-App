"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const CategoryConsumption = ({ data }) => {
  const barChart = data[1];

  return (
    <div className="card_charts w-full">
      <Bar
        data={{
          labels: Object.keys(barChart.data),
          datasets: [{ data: Object.values(barChart.data) }],
        }}
        color="red"
      />
      <h2 className="text-lg text-white pt-6">{barChart.label}</h2>
    </div>
  );
};

export default CategoryConsumption;
