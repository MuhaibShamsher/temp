import React from "react";
import Modal from "react-bootstrap/Modal";
import classes from "./ModalSkeleton.module.css";
const ModalSkeleton = ({
  show,
  setShow,
  children,
  width,
  borderRadius = "10px",
  backdrop = true,
  header,
  keyboard = true,
}) => {
  return (
    <>
      <style>
        {`
        .modal-dialog{
            max-width:${width && width};
            z-index:99;
        }
        .modal-content{
            border-radius:${borderRadius};
            overflow:hidden !important;
        }
        .modal-body{
            padding:0;
        }
        `}
      </style>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        backdrop={backdrop}
        keyboard={keyboard}
      >
        <Modal.Body>
          {header && (
            <div className={classes.header}>
              <h3>{header}</h3>
            </div>
          )}
          <div className={classes.body}>{children}</div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalSkeleton;
