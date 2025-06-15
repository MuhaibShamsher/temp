import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import classes from "./Error.module.css";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Something went wrong!</h1>
      <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
    </div>
  );
};

export default Error;
