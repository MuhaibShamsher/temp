import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import ModalSkeleton from "../../components/ModalSkeleton/ModalSkeleton";
import { authActions } from "../../store/auth/authSlice";
import classes from "./IpRangeModal.module.css";
import { toast } from "react-toastify";
const IpRangeModal = ({
  show,
  setShow,
  keyboard = false,
  backdrop = true,
  closeBtn = true,
}) => {
  const { scanRange } = useSelector((state) => state.authReducer);
  const [value, setValue] = useState(scanRange);
  const dispatch = useDispatch();
  const submitHandler = () => {
    if (!value) {
      return toast.error("Please enter IP range");
    }
    dispatch(authActions?.setScanRange(value));
    setShow(false);
  };
  const close = () => {
    setShow(false);
  };
  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      header={"IP Range"}
      keyboard={keyboard}
      backdrop={backdrop && "static"}
    >
      <div className={classes.container}>
        <Input
          value={value}
          setter={setValue}
          label={"IP Range"}
          placeholder={"Enter IP Range"}
          labelClass={classes.label}
        />
        <div className={classes.buttons}>
          <Button className={classes.btn} onClick={submitHandler}>
            Submit
          </Button>
          {closeBtn && (
            <Button className={classes.btn} onClick={close}>
              Close
            </Button>
          )}
        </div>
      </div>
    </ModalSkeleton>
  );
};

export default IpRangeModal;
