import React, { useEffect, useState } from "react";
import IpRangeModal from "../../modal/IpRangeModal";
import Button from "../../components/Button/Button";
import { useSelector } from "react-redux";
import Input from "../../components/Input/Input";
import classes from "./Settings.module.css";
import { Col, Row } from "react-bootstrap";
import PasswordResetModal from "../../modal/PasswordResetModal";
import Loader from "../../components/Loader";

const Settings = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalPassword, setShowModalPassword] = useState(false);
  const { user } = useSelector((state) => state.authReducer);
  const [role, setRole] = useState(user.role);

  return (
    <>
      <Loader />
      <div className={classes.container}>
        <Input
          className={classes.input}
          value={user?.email}
          label="Email"
          disabled={true}
          labelClass={classes.label}
        />
        <Input
          className={classes.input}
          value={role}
          label="Role"
          disabled={true}
          labelClass={classes.label}
        />
        <div className={classes.actions}>
          <Button
            customStyle={{ width: "fit-content" }}
            onClick={() => {
              setShowModal(true);
            }}
          >
            Change IP Range
          </Button>
          <Button
            customStyle={{ width: "fit-content" }}
            onClick={() => {
              setShowModalPassword(true);
            }}
          >
            Change Password
          </Button>
        </div>
      </div>
      {showModal && (
        <IpRangeModal
          show={showModal}
          setShow={setShowModal}
          keyboard={true}
          backdrop={false}
        />
      )}
      {showModalPassword && (
        <PasswordResetModal
          show={showModalPassword}
          setShow={setShowModalPassword}
          keyboard={true}
          backdrop={false}
        />
      )}
    </>
  );
};

export default Settings;
