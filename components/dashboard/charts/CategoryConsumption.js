"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const CategoryConsumption = ({ data }) => {
  return (
    <div className="card_charts w-full">
      <Bar
        data={{
          labels: Object.keys(data.data),
          datasets: [
            {
              label: data.label,
              data: Object.values(data.data),
              backgroundColor: "royalblue",
            },
          ],
        }}
      />
      <h2 className="text-lg text-white pt-6">{data.label}</h2>
    </div>
  );
};

export default CategoryConsumption;
