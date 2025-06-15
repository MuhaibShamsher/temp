import React from "react";
import classes from "./Badge.module.css";

export default function Badge({ severity }) {
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
    <div className={`${classes.badge} ${getSeverityClass(severity)}`}>
      {severity}
    </div>
  );
}
