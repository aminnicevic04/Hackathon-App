"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const HoursConsumption = ({ data }) => {
  const areaChart = data[3];

  // Custom colors
  const colors = [
    "#3498db",
    "#2ecc71",
    "#e74c3c",
    "#f39c12",
    "#9b59b6",
    "#34495e",
  ];

  // Custom labels with styles
  const labelsWithStyles = areaChart.data.map((value, index) => ({
    label: `${value}%`,
    style: {
      color: colors[index % colors.length], // Use a cycling pattern for colors
      fontWeight: "bold",
    },
  }));

  return (
    <div className="h-64 card_charts w-full flex">
      <div>
        <h2 className="text-lg text-white">{areaChart.label}</h2>
        <div className="my-6 grid grid-cols-3">
          {labelsWithStyles.map((item, index) => (
            <div key={index} style={item.style}>
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <Doughnut
        data={{
          datasets: [
            {
              data: areaChart.data,
              backgroundColor: colors,
            },
          ],
        }}
      />
    </div>
  );
};

export default HoursConsumption;
