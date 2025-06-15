import React from "react";
import classes from "./DropDown.module.css";
import Select from "react-select";

const DropDown = ({
  options,
  label,
  placeholder,
  setter,
  value,
  isMulti = false,
  disabled = false,
  defaultOption,
}) => {
  return (
    <>
      <style>
        {`
        .select__control {
          border: none;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          padding: 6px 0px 6px 5px;
        }
        .select__indicator-separator {
          display: none;
        }
        .select__menu {
          background:white ;
          color:black;
        }
        `}
      </style>

      <div className={classes.dropDownMain}>
        {label && <label>{label}</label>}
        <Select
          isDisabled={disabled}
          isMulti={isMulti}
          onChange={setter}
          value={value}
          className="basic-single"
          classNamePrefix="select"
          defaultValue={{ label: defaultOption, value: defaultOption }}
          name="color"
          options={options.map((opt) => ({ label: opt, value: opt }))}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default DropDown;
