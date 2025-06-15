import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import classes from "./BarChart.module.css";
import "../../global.css";
import { useNavigate } from "react-router-dom";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ datasets, labels, title }) => {
  const navigate = useNavigate();

  const options = {
    onClick: (event, chartElement) => {
      if (chartElement && chartElement.length > 0) {
        navigate("/assets");
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white",
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
    },
    scales: {
      x: {
        type: "category", // Ensure the correct type is set
        grid: {
          display: false,
        },
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={`${classes.barContainer} card`}>
      <h4 className={` ${classes.titleCard}`}>{title}</h4>
      <Bar
        data={{
          labels,
          datasets,
        }}
        options={options}
      />
    </div>
  );
};

export default BarChart;
