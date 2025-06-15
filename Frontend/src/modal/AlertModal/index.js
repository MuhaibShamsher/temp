import React from "react";
import ModalSkeleton from "../../components/ModalSkeleton/ModalSkeleton";
import Button from "../../components/Button/Button";
import classes from "./AlertModal.module.css";
import { useNavigate } from "react-router-dom";
import { AnimatedList } from "../../components/AnimatedList";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth/authSlice";
import { IoCloseCircle } from "react-icons/io5";
import Badge from "../../components/Badge";
import { GoAlertFill } from "react-icons/go";
import { CgDanger } from "react-icons/cg";

const AlertModal = ({ show, setShow, alertsData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAction = (item) => {
    navigate(`/risk/${item.ip}`, { state: { data: item } });
    dispatch(authActions.setAlertsPromptSeen(item));
  };

  const close = (item) => {
    dispatch(authActions.setAlertsPromptSeen(item));
    // setShow(false); // Close modal when 'Close' button is clicked
  };

  const closeModalHandler = () => {
    alertsData?.map((item) => dispatch(authActions.setAlertsPromptSeen(item)));
  };

  return (
    <ModalSkeleton
      show={show}
      setShow={closeModalHandler}
      header="Alert Details"
    >
      <AnimatedList className="my-animated-list" delay={1500}>
        {alertsData?.map((alertData, index) => (
          <div className={classes.alertContainer} key={index}>
            <div className={classes.alertIcon}>
              {" "}
              <CgDanger size={40} />
            </div>
            <div className={classes.alertContent}>
              {/* <Badge severity={alertData?.severity} /> */}
              <h2 className={classes.alertTitle}>{alertData?.alert}</h2>

              <p className={classes.alertDescription}>
                Compliance Breach: {alertData?.compliance_breached}
              </p>
              <Button
                className={classes.alertButton}
                onClick={() => handleAction(alertData)}
              >
                View
              </Button>
            </div>
            <div className={classes.closeIcon}>
              <IoCloseCircle
                size={20}
                onClick={() => close(alertData)}
                color={"white"}
              />
            </div>
          </div>
        ))}
      </AnimatedList>
    </ModalSkeleton>
  );
};

export default AlertModal;
