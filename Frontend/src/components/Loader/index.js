import React, { useEffect } from "react";
import gsap from "gsap";
import styles from "./Loader.module.css";
import { logo } from "../../constants/ImagePath";

const Loader = () => {
  useEffect(() => {
    gsap.fromTo(
      `.${styles.loadingPage}`,
      { opacity: 1 },
      {
        opacity: 0,
        display: "none",
        duration: 1,
        delay: 2.5,
      }
    );

    gsap.fromTo(
      `.${styles.logoImage}`,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
      }
    );
  }, []);

  return (
    <div className={styles.loadingPage}>
      <img src={logo} alt="Logo" className={styles.logoImage} />
    </div>
  );
};

export default Loader;
