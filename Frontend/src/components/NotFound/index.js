import React from "react";
import Button from "../Button/Button";
import classes from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.notFound}>
      <h1>Page Not Found</h1>
      <p>
        Looks like you've followed a broken link or entered a URL that doesn't
        exist on this site.
      </p>
      <Button
        label={"Back to our site"}
        onClick={() => navigate("/")}
        customStyle={{
          cursor: "pointer",
          borderRadius: "12px",
        }}
      />
    </div>
  );
};

export default NotFound;
