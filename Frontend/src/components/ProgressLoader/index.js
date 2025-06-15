import React, { useState, useEffect } from "react";
import styles from "./ProgressLoader.module.css";

const ProgressLoader = ({ isLoading, label, isComplete }) => {
  const [percentage, setPercentage] = useState(0);
  const [shouldComplete, setShouldComplete] = useState(true);

  useEffect(() => {
    let interval;
    if (!isComplete) {
      setPercentage(100);
    } else if (isLoading) {
      setShouldComplete(true); // Loader should complete
      setPercentage((prev) => (prev === 100 ? 100 : prev)); // Prevent resetting to 0
      const updatePercentage = () => {
        setPercentage((prev) => {
          const newPercentage = prev + Math.floor(Math.random() * 3) + 1; // Increment by 1 to 3
          if (newPercentage >= 90) {
            clearInterval(interval);
            return 90;
          }
          return newPercentage;
        });
      };

      interval = setInterval(
        updatePercentage,
        Math.floor(Math.random() * 500) + 100
      ); // Random interval between 100ms to 600ms
    } else if (percentage < 100 && shouldComplete) {
      setShouldComplete(false); // Loader should not complete immediately
      const updatePercentage = () => {
        setPercentage((prev) => {
          const newPercentage = prev + Math.floor(Math.random() * 3) + 1; // Increment by 1 to 3
          if (newPercentage >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newPercentage;
        });
      };

      interval = setInterval(
        updatePercentage,
        Math.floor(Math.random() * 500) + 100
      ); // Random interval between 100ms to 600ms
    }

    return () => clearInterval(interval);
  }, [isLoading, percentage, shouldComplete, isComplete]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.box}>
          <div className={styles.percent}>
            <svg>
              <circle cx="70" cy="70" r="70"></circle>
              <circle
                cx="70"
                cy="70"
                r="70"
                style={{
                  strokeDashoffset: `calc(440 - (440 * ${percentage}) / 100)`,
                }}
              ></circle>
            </svg>
            {/* <div className={styles.num}>
              <h2>
                {percentage}
                <span>%</span>
              </h2>
            </div> */}
          </div>
          <h2 className={styles.text}>{label}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProgressLoader;
