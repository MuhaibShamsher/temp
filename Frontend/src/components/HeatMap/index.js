import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import classes from "./HeatMap.module.css";
import { useNavigate } from "react-router-dom";
import "../../global.css";

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ datasets, labels, title }) => {
  const navigate = useNavigate();

  const options = {
    cutout: 150,
    elements: {
      arc: {
        borderRadius: 30,
        spacing: 4, // Add space between segments
      },
    },
    onClick: (event, chartElement) => {
      if (chartElement && chartElement.length > 0) {
        navigate("/assets");
      }
    },
    plugins: {
      legend: {
        display: true,
        position: "left",
        labels: {
          color: "white",
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className={`${classes.barContainer} card`}>
      <h4 className={` ${classes.titleCard}`}>{title}</h4>
      <Doughnut
        data={{
          labels: labels,
          datasets,
        }}
        options={options}
      />
    </div>
  );
};

export default DoughnutChart;
