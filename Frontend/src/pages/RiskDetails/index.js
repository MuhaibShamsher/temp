// RiskDetails.js
import React from "react";
import classes from "./RiskDetails.module.css";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader";
import SeverityDot from "../../components/SeverityDot";

const RiskDetails = () => {
  const { state } = useLocation();
  if (!state || !state?.data) {
    return <div>Loading...</div>; // or handle null state scenario appropriately
  }
  const { data } = state;

  return (
    <>
      <Loader />

      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.headerContent}>
            {/* <div className={classes.greenDot}></div> */}
            <SeverityDot severity={data?.severity} />
            <span>{data?.severity}</span>
          </div>
        </div>
        <div className={classes.gridContainer}>
          <div className={classes.gridItem}>
            <div className={classes.twoColumnGrid}>
              <div>
                <span className={classes.fontMedium}>Hostname:</span>
                <p>{data?.hostname}</p>
              </div>
              <div>
                <span className={classes.fontMedium}>IPv4 Address:</span>
                <p>{data?.ip}</p>
              </div>
            </div>
            <div className={classes.twoColumnGrid}>
              <div>
                <span className={classes.fontMedium}>Port:</span>
                <p>{data?.port}</p>
              </div>
              <div>
                <span className={classes.fontMedium}>Protocol:</span>
                <p>{data?.protocol}</p>
              </div>
            </div>
            <div className={classes.twoColumnGrid}>
              <div>
                <span className={classes.fontMedium}>Alert:</span>
                <p>{data?.alert}</p>
              </div>
              <div>
                <span className={classes.fontMedium}>Compliance Breached:</span>
                <p>{data?.compliance_breached}</p>
              </div>
            </div>
          </div>
          <div className={classes.gridItem}>
            <h2>Reference Standards</h2>
            {Object.entries(data?.reference || {}).map(([key, value]) => (
              <div key={key}>
                <p>
                  <strong>{key}:</strong> {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RiskDetails;
