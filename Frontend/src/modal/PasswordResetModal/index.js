import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import ModalSkeleton from "../../components/ModalSkeleton/ModalSkeleton";
import classes from "./PasswordResetModal.module.css";
import { toast } from "react-toastify";
import { baseURL } from "../../Config/apiUrl";
import { POST } from "../../axios/axiosFunctions";

const PasswordResetModal = ({
  show,
  setShow,
  keyboard = false,
  backdrop = true,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { token } = useSelector((state) => state.authReducer);

  const submitHandler = async () => {
    const params = {
      password: newPassword,
      ConfirmPassword: confirmPassword,
    };

    for (let key in params) {
      if (params[key] === "") {
        toast.error("Please fill all the fields.");
        return;
      }
    }

    setSubmitting(true);
    try {
      const response = await POST(
        baseURL("api/ChangePassword/"),
        params,
        token
      );
      if (response !== undefined) {
        toast.success("Password changed successfully!");
        setShow(false);
      } else {
        toast.error("Failed to change password.");
      }
    } catch (error) {
      toast.error("An error occurred while changing the password.");
    }
    setSubmitting(false);
  };

  const close = () => {
    setShow(false);
  };

  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      header={"Change Password"}
      keyboard={keyboard}
      backdrop={backdrop && "static"}
    >
      <div className={classes.container}>
        <Input
          value={newPassword}
          setter={setNewPassword}
          label={"New Password"}
          placeholder={"Enter New Password"}
        />
        <Input
          value={confirmPassword}
          setter={setConfirmPassword}
          label={"Confirm New Password"}
          placeholder={"Enter Confirm New Password"}
        />
        <div className={classes.buttons}>
          <Button
            className={classes.btn}
            onClick={submitHandler}
            disable={submitting}
          >
            {submitting ? "Please wait..." : "Submit"}
          </Button>
          <Button className={classes.btn} onClick={close}>
            Close
          </Button>
        </div>
      </div>
    </ModalSkeleton>
  );
};

export default PasswordResetModal;
