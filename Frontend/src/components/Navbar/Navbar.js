import "bootstrap/dist/css/bootstrap.min.css";
import { Divide } from "hamburger-react";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { authActions } from "../../store/auth/authSlice";
import classes from "./Navbar.module.css";
import image from "../../assets/logo.png";

const Navbar = (props) => {
  const [openDrop, setOpenDrop] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const logoutHandler = () => {
    dispatch(authActions.logout());
    toast.success(`Logged out successfully!`);
  };
  const openDropFunc = () => {
    setOpenDrop(!openDrop);
  };

  const location = useLocation();
  const titlePage = location.pathname.replace("/", "") || "Dashboard";

  return (
    <nav className={classes["main-nav1"]}>
      <a
        href="/"
        className={`${classes.image} text-decoration-none  d-flex align-itemcenter`}
      >
        <img
          className="d-sm-inline"
          src={image}
          style={{ width: "100%", height: "3.23em" }}
          alt=""
        />
        {/* <h3 className={classes.logoColor}>AURA</h3> */}
      </a>

      <div className={classes["main-nav"]}>
        <div className={classes.headingDiv}>
          <div className={classes.but}>
            <a href="#/" className={classes.hamburger} onClick={props.send}>
              <Divide />
            </a>
          </div>
          <h3 className={classes.titlePage}>{titlePage}</h3>
        </div>
        <div className={classes["social-media"]}>
          <ul className={classes["social-media-desktop"]}>
            {/* <div className={classes["social-media-icons"]}>
              <li>
                <a
                  href="https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA"
                  target="_thapa"
                  className={classes.Iconsnotifications}
                >
                  <IoNotificationsCircleOutline />
                </a>
              </li>

              <li>
                <a
                  href="https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA"
                  target="_thapa"
                  className={classes.Iconsnotifications}
                >
                  <MdMessage />
                </a>
              </li>
            </div> */}

            <div className={`${classes.dropdown} ${openDrop ? "show" : ""}`}>
              <button
                className={`btn dropdown-toggle ${classes.dropdownAnchor}`}
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={openDrop}
                onClick={openDropFunc}
              >
                {" "}
                <FaUserCircle size={25} color="var(--main-color)" />
                {user?.role}
                {/* {user?.role === "1" && "Admin"}
                {user?.role === "2" && "Analyser"}
                {user?.role === "3" && "Monitor"} */}
              </button>
              <div
                className={`dropdown-menu ${openDrop ? "show" : ""} ${
                  classes.dropDownnn
                }`}
                aria-labelledby="dropdownMenuButton"
              >
                {/* <div className="dropdown-divider"></div> */}
                <span className="dropdown-item" onClick={logoutHandler}>
                  Logout
                </span>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
