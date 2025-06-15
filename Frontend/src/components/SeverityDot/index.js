import React from "react";
import classes from "./SeverityDot.module.css";

export default function SeverityDot({ severity }) {
  const getSeverityClass = (severity) => {
    switch (severity.toLowerCase()) {
      case "high":
        return classes.high;
      case "medium":
        return classes.medium;
      case "low":
        return classes.low;
      default:
        return classes.default;
    }
  };

  return (
    <div className={`${classes.badge} ${getSeverityClass(severity)}`}></div>
  );
}
