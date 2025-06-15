import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import classes from "./LineChart.module.css";
import { useNavigate } from "react-router-dom";



// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ datasets, labels, title }) => {
  const navigate = useNavigate();
  const maxValue = Math.max(...datasets[0].data);

  const options = {
    // onClick: (event, chartElement) => {
    //   if (chartElement && chartElement.length > 0) {
    //     const dataIndex = chartElement[0].index;
    //     const label = labels[dataIndex];
    //     const ipData = scanData.find(data => data.addresses?.ipv4 === label);
    //     navigate(`/assets/${label}`, { state: { data: ipData } });
    //   }
    // },
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
        grid: {
          display: false,
          color: "white",
        },
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
        },
      },
      y: {
        border: {
          dash: [4, 3],
        },
        grid: {
          color: "grey",
        },
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
        },
        min:0,
        max:maxValue,
      },
    },
  };

  return (
    <div className={`${classes.barContainer} card `}>
      <h4 className={` ${classes.titleCard}`}>{title}</h4>
      <Line
        data={{
          labels,
          datasets,
        }}
        options={options}
      />
    </div>
  );
};

export default LineChart;
