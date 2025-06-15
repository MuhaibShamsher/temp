import React from 'react';
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from '@mui/x-charts/Gauge';
import classes from "./GaugeChart.module.css"

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="white" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="white"
        strokeWidth={2}
      />
    </g>
  );
}

const  Gauge=()=> {
  return (
    <div className={`${classes.barContainer} card`}>
      <h4 className={` ${classes.titleCard}`}>Score</h4>
    <GaugeContainer
      width={200}
      height={200}
      startAngle={-110}
      endAngle={110}
      value={80}
      
    >
      <GaugeReferenceArc arcBorderRadius={20}  className={classes.gaugeArcRef}/>
      <GaugeValueArc arcBorderRadius={20} className={classes.gaugeArc}/>
      <GaugePointer />
      
    </GaugeContainer>
    <p style={{position:"absolute",bottom:"40px",color:"white",left:"45%"}}>Medium</p>
    </div>
  );
}

export default Gauge;
