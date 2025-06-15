import { Bar } from "react-chartjs-2"
import classes from "./StackedChart.module.css"
// import { stackedChartData } from "../../constants/dummy_data";
import {useNavigate} from "react-router-dom";


const StackedChart = ({datasets, labels,title}) => {
  const Navigate=useNavigate();
  const options = {
    onClick: (event, chartElement) => {
      if (chartElement && chartElement.length > 0) {
        Navigate("/assets");
      }
    },
  
    plugins: {

      legend: {
          display: true,
          // position: 'bottom',
          labels: {
              color: 'white',
              usePointStyle: true,
              font: {
                size: 12
            }
          }
      }
  },
    scales: {
      x: {
        grid: {
          display: false, 
        },
        ticks: {
          color: "white", // not 'fontColor:' anymore
           font: {
                        size: 12
                    }
        },
        
      },
      y: {  // not 'yAxes: [{' anymore (not an array anymore)
        ticks: {
          color: "white", // not 'fontColor:' anymore
          // fontSize: 18,
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
    <div className={`${classes.barContainer} card cardBody`}>
    <h4 className={`headingColor  ${classes.titleCard}`}>{title}</h4>
    <Bar data={{
        labels,
        datasets
        
      }} options={options}/>
  </div>
    
  )
}

export default StackedChart