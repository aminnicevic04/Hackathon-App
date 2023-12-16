"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const AvgLastMonthConsumption = ({ data }) => {
  const pieChart = data[2];

  const colors = ["#36a2eb", "#ff6384"];

  // Custom labels with styles
  const labelsWithStyles = Object.entries(pieChart.data).map(
    ([label, value], index) => ({
      label: `${label}: ${value}%`,
      style: {
        color: colors[index % colors.length], // Use a cycling pattern for colors
        fontWeight: "bold",
      },
    })
  );

  return (
    <div className="h-64 card_charts w-full flex max-xl:justify-between max-md:flex-col max-md:h-fit">
      <div>
        <h2 className="text-lg text-white">{pieChart.label}</h2>
        <div className="my-6">
          {labelsWithStyles.map((item, index) => (
            <div key={index} style={item.style}>
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <Pie
        data={{
          datasets: [{ data: Object.values(pieChart.data) }],
        }}
      />
    </div>
  );
};

export default AvgLastMonthConsumption;
