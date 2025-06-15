import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BarChart from "../../components/BarChart";
import Cards from "../../components/Cards";
import DoughnutChart from "../../components/DoughnutChart";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";

import {
  extractIpsAndOpenPorts,
  extractMacVendors,
  extractOpenPorts,
  extractOsAccuracy,
  extractOsInfo,
  extractSeverityCounts,
} from "../../Helper/DataFilter";
import Loader from "../../components/Loader";
import ProgressLoader from "../../components/ProgressLoader";
import {
  transformDataForBarChart,
  transformDataForDoughnutChart,
  transformDataForHorizontalBarChart,
  transformDataForLineChart,
  transformDataForLineChart2,
  transformDataForPieChart,
} from "../../constants/tranfromData";
import AlertModal from "../../modal/AlertModal";
import IpRangeModal from "../../modal/IpRangeModal";
import { authActions } from "../../store/auth/authSlice";
import styles from "./Home.module.css";

const Home = () => {
  const { scanData, scanRange, alertsPromptData, isScanning } = useSelector(
    (state) => state.authReducer
  );

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(!scanRange);

  // tranformed
  const openPorts = extractOpenPorts(scanData);
  const barChartData = transformDataForBarChart(openPorts);

  const osInfo = extractOsInfo(scanData);
  const pieChartData = transformDataForPieChart(osInfo);

  const portStates = extractSeverityCounts(scanData);
  const doughnutChartData = transformDataForDoughnutChart(portStates);

  const osAccuracy = extractOsAccuracy(scanData);
  const LineChartData = transformDataForLineChart(osAccuracy);
  // const hostUptime = extractHostUptime(scanData);
  const ipOpenPorts = extractIpsAndOpenPorts(scanData);
  const LineChartData2 = transformDataForLineChart2(ipOpenPorts);

  const macVendors = extractMacVendors(scanData);

  const HorizontalChartData = transformDataForHorizontalBarChart(macVendors);

  const alertCloseHandler = (item) => {
    dispatch(authActions.setAlertsPromptSeen(item));
  };

  return (
    <>
      <Loader />
      {isScanning ? (
        // <>
        //   <Row>
        //     <Col md={4}>
        //       {" "}
        //       <Skeleton
        //         variant={"rounded"}
        //         height={200}
        //         width={"100%"}
        //         style={{ backgroundColor: "var(--gray-color)" }}
        //       />
        //     </Col>
        //     <Col md={4}>
        //       {" "}
        //       <Skeleton
        //         variant={"rounded"}
        //         height={200}
        //         width={"100%"}
        //         style={{ backgroundColor: "var(--gray-color)" }}
        //       />
        //     </Col>
        //     <Col md={4}>
        //       {" "}
        //       <Skeleton
        //         variant={"rounded"}
        //         height={200}
        //         width={"100%"}
        //         style={{ backgroundColor: "var(--gray-color)" }}
        //       />
        //     </Col>
        //   </Row>

        //   <Skeleton
        //     variant={"rounded"}
        //     height={400}
        //     width={"100%"}
        //     style={{ marginTop: "20px", backgroundColor: "var(--gray-color)" }}
        //   />

        //   <Row>
        //     <Col md={6}>
        //       {" "}
        //       <Skeleton
        //         variant={"rounded"}
        //         height={400}
        //         width={"100%"}
        //         style={{
        //           marginTop: "20px",
        //           backgroundColor: "var(--gray-color)",
        //         }}
        //       />
        //     </Col>
        //     <Col md={6}>
        //       {" "}
        //       <Skeleton
        //         variant={"rounded"}
        //         height={400}
        //         width={"100%"}
        //         style={{
        //           marginTop: "20px",
        //           backgroundColor: "var(--gray-color)",
        //         }}
        //       />
        //     </Col>
        //   </Row>

        //   <Skeleton
        //     variant={"rounded"}
        //     height={400}
        //     width={"100%"}
        //     style={{ marginTop: "20px", backgroundColor: "var(--gray-color)" }}
        //   />
        //   <Skeleton
        //     variant={"rounded"}
        //     height={400}
        //     width={"100%"}
        //     style={{ marginTop: "20px", backgroundColor: "var(--gray-color)" }}
        //   />
        // </>
        <ProgressLoader isLoading={isScanning} label="Scanning..." />
      ) : (
        <div>
          <Row className={styles.home}>
            <Cards />
          </Row>
          <Row className={styles.home}>
            <Col>
              <LineChart
                title="Ip's and their Open Ports"
                labels={LineChartData2.labels}
                datasets={LineChartData2.datasets}
              />
            </Col>
          </Row>

          <Row className={styles.home}>
            <Col>
              <DoughnutChart
                title="Severity of Assets"
                labels={doughnutChartData.labels}
                datasets={doughnutChartData.datasets}
              />
            </Col>
            <Col>
              <LineChart
                title="OS Accuracy"
                labels={LineChartData.labels}
                datasets={LineChartData.datasets}
              />
            </Col>
          </Row>
          <Row className={styles.home}>
            <Col>
              <BarChart
                title="Services"
                labels={barChartData.labels}
                datasets={barChartData.datasets}
              />
            </Col>
          </Row>
          <Row className={styles.home}>
            <Col>
              <PieChart
                title="Operating Systems"
                labels={pieChartData.labels}
                datasets={pieChartData.datasets}
              />
            </Col>
          </Row>
          {/* <Row className={styles.home}> */}
          {/* <Col> */}
          {/* <ScatterChart
            title="Incident Response"
            labels={scatterChartData.labels}
            datasets={scatterchartData.datasets}
          /> */}
          {/* <HeatMap
            title={"Port 21 Status "}
            datasets={heatChartData.datasets}
          /> */}
          {/* </Col> */}
          {/* <Col> */}
          {/* <HorizontalBarChart
            title="MAC Vendors"
            labels={HorizontalChartData.labels}
            datasets={HorizontalChartData.datasets}
          /> */}
          {/* <StackedChart
            title="Vulnerability Categories"
            labels={stackedChartData.labels}
            datasets={stackedChartData.datasets}
          /> */}
          {/* </Col> */}
          {/* </Row> */}
        </div>
      )}
      {showModal && (
        <IpRangeModal
          show={showModal}
          setShow={setShowModal}
          closeBtn={false}
        />
      )}
      {alertsPromptData?.length > 0 && (
        <AlertModal
          // setShow={() => alertCloseHandler(item)}
          show={true}
          alertsData={alertsPromptData}
        />
      )}
    </>
  );
};

export default Home;
