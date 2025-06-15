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
import classes from "./Horizontal.module.css";
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

const HorizontalBarChart = ({ datasets, labels, title }) => {
  const navigate = useNavigate();

  const options = {
    onClick: (event, chartElement) => {
      if (chartElement && chartElement.length > 0) {
        navigate("/assets");
      }
    },
    indexAxis: 'y', // Specify y-axis as the index axis for horizontal bars
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
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

export default HorizontalBarChart;
