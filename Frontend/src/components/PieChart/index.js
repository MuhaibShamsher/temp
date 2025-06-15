import { Pie } from "react-chartjs-2"
import classes from "./PieChart.module.css"
import {useNavigate} from "react-router-dom";

const PieChart = ({datasets, labels,title}) => {
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
          position: 'left',
          labels: {
              color: 'white',
              usePointStyle: true,
              font: {
                size: 16
            }
          }
      }
  },
    }
  return (
    <div className={`${classes.barContainer} card cardBody`}>
    <h4 className={`headingColor  ${classes.titleCard}`}>{title}</h4>
    <Pie data={{
        labels,
        datasets
      }}options={options}/>
  </div>
    
  )
}

export default PieChart