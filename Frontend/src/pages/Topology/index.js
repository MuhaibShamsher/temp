import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TreeChart from "../../components/TreeChart";
import {
  convertIpDataToComponentFormat,
  convertPortDataToComponentFormat,
} from "../../Helper/TopologyHelperFunc";
import Loader from "../../components/Loader";

function Topology() {
  const { data: scanData, isPortTopology } = useLocation().state;
  const formattedData = isPortTopology
    ? convertPortDataToComponentFormat(scanData)
    : convertIpDataToComponentFormat([scanData]);
  const [chartData, setChartData] = useState(formattedData);

  const changeTargetNodeOnChart = (newNode) => {
    setChartData(newNode);
  };

  return (
    // <div style={{ width: "100%", height: "100vh" }}>
    <>
      <Loader />
      <TreeChart
        data={chartData}
        changeTargetNodeOnChart={changeTargetNodeOnChart}
      />
    </>

    // </div>
  );
}

export default Topology;
