import { Bar } from "react-chartjs-2"
import classes from "./StackedChart2.module.css"
import {useNavigate} from "react-router-dom";

const StackedChart2 = ({datasets, labels,title}) => {
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

export default StackedChart2;