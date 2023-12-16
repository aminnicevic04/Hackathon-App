"use client";
import { Doughnut } from "react-chartjs-2";

const HoursConsumption = ({ data }) => {
  if (!data) {
    // Handle the case where the chart data is not found
    return null;
  }

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
  const labelsWithStyles = data.data.map((value, index) => ({
    label: `${value}%`,
    style: {
      color: colors[index % colors.length], // Use a cycling pattern for colors
      fontWeight: "bold",
    },
  }));

  return (
    <div className="h-64 card_charts w-full flex max-xl:justify-between max-md:flex-col max-md:h-fit">
      <div>
        <h2 className="text-lg text-white">{data.label}</h2>
        <div className="my-6 grid grid-cols-3 gap-3">
          {labelsWithStyles.map((item, index) => (
            <div key={index} style={item.style}>
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <div className="h-40">
        <Doughnut
          data={{
            datasets: [
              {
                data: data.data,
                backgroundColor: colors,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default HoursConsumption;
