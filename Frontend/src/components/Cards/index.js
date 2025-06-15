import React, { useEffect } from "react";
import classes from "./Cards.module.css";
// import { FaExclamationCircle } from "react-icons/fa";
// import { FaMasksTheater } from "react-icons/fa6";
// import { FaSquareArrowUpRight } from "react-icons/fa6";
import { Col } from "react-bootstrap";
import { FaLaptop } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import { MdDangerous } from "react-icons/md";
import { PiGauge } from "react-icons/pi";
import "../../global.css";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CgDanger } from "react-icons/cg";

const Cards = () => {
  const { scanData, alertsData } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const complianceBreachedCount = alertsData?.filter(
    (item) => item?.compliance_breached
  )?.length;

  const calculateRiskPosture = (alertsData) => {
    let totalRiskPosture = 0;
    let count = 0;

    alertsData?.forEach((data) => {
      let likelihood = 0;
      let impact = 0;

      switch (data?.severity?.toLowerCase()) {
        case "low severity zone":
          likelihood = 0.8;
          impact = 2;
          break;
        case "medium severity zone":
          likelihood = 0.5;
          impact = 3;
          break;
        case "high severity zone":
          likelihood = 0.2;
          impact = 5;
          break;
        default:
          return;
      }

      const riskPosture = likelihood * impact;
      totalRiskPosture += riskPosture;
      count++;
    });

    return count > 0 ? (totalRiskPosture / count / 1.6) * 100 : 0;
  };
  const riskPosture = calculateRiskPosture(scanData);

  return (
    <Col className={`${classes.cardsContainer}`}>
      <h4>Current Risk</h4>
      <div className={classes.cardsMainContainer}>
        <div
          className={`${classes.cardPadding}`}
          onClick={() => {
            navigate("/assets");
          }}
        >
          <div>
            <h3>Assets</h3>
          </div>
          <div className={`${classes.cardBottom} `}>
            <p className={` fst-normal ${classes.pCard}`}>{scanData.length}</p>
            <FaLaptop />
          </div>
        </div>

        <div
          className={`${classes.cardPadding}`}
          onClick={() => {
            navigate("/risks");
          }}
        >
          <div>
            <h3>Risks</h3>
          </div>
          <div className={`${classes.cardBottom} `}>
            <p className={` fst-normal ${classes.pCard}`}>
              {complianceBreachedCount}
            </p>
            <GoAlertFill />
          </div>
        </div>
        <div
          className={`${classes.cardPadding}`}
          onClick={() => {
            navigate("/alerts");
          }}
        >
          <div>
            <h3>Alerts</h3>
          </div>
          <div className={`${classes.cardBottom} `}>
            <p className={` fst-normal ${classes.pCard}`}>
              {alertsData?.length}
            </p>
            <CgDanger />
          </div>
        </div>
        <div className={`${classes.cardPadding}`}>
          <div>
            <h3>Risk Posture</h3>
          </div>
          <div className={`${classes.cardBottom} `}>
            <p className={` fst-normal ${classes.pCard}`}>
              {riskPosture.toFixed(2)}%
            </p>
            <PiGauge />
          </div>
        </div>
      </div>
    </Col>
  );
};

export default Cards;
