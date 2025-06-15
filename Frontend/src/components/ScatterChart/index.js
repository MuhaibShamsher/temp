import { Scatter } from "react-chartjs-2"
import classes from "./ScatterChart.module.css"
import {useNavigate} from "react-router-dom";


const ScatterChart = ({datasets, labels,title}) => {
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
        color: "white", 
         font: {
                      size: 12
                  }
      },
      
    },
    y: {  
      ticks: {
        color: "white", 
      
        font: {
          size: 12, 
        },
       
      },
      
    },
    
  },
}
  return (
    <div className={`${classes.barContainer} card cardBody`}>
    <h4 className={`headingColor  ${classes.titleCard}`}>{title}</h4>
    <Scatter data={{
        labels,
        datasets
        
      }}options={options}/>
  </div>
  // Incident Response:

// Mapping the timeline of security incidents, including the detection and response times, on a scatter graph.
// Identifying outliers or deviations from the normal pattern of incident response.
    
  )
}

export default ScatterChart