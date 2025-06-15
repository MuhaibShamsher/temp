import React from "react";
import classes from "./Button.module.css";
const Button = ({
  label,
  children,
  className,
  onClick,
  disabled,
  customStyle,
}) => {
  return (
    <>
      <button
        style={customStyle}
        disabled={disabled}
        onClick={onClick}
        className={[classes.customBtn, className && className].join(" ")}
      >
        {label && label} {children && children}
      </button>
    </>
  );
};

export default Button;
