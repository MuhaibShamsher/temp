import React from "react";
import { CgDanger } from "react-icons/cg";
import { FaLaptop, FaUsers } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import { CiLogout } from "react-icons/ci";
import { useEffect, useState } from "react";
import { AiOutlineLogout, AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { logo } from "../../constants/ImagePath";
import { authActions } from "../../store/auth/authSlice";
import classes from "./SidebarSkeleton.module.css";
const RenderComponent = ({ text, icon, path }) => {
  const navigate = useNavigate();
  const location = useLocation()?.pathname;

  return (
    <div
      onClick={() => navigate(path)}
      className={location === path ? classes.activeMenu : classes.menuMain}
    >
      <div>{icon}</div>
      <p>{text}</p>
    </div>
  );
};
const SidebarSkeleton = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.authReducer);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const location = useLocation();
  const titlePage = location.pathname.replace("/", "") || "Dashboard";

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/login");
    toast.success(`Logged out successfully!`);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      <div
        className={classes.pageMain}
        onClick={() => toggle && setToggle(false)}
      >
        {!titlePage.startsWith("topology") && (
          <div
            style={windowSize < 991 && toggle ? { marginLeft: "0" } : {}}
            className={classes.leftMain}
          >
            <div onClick={() => navigate("/")} className={classes.sideLogoMain}>
              <div className={classes.logoMain}>
                <img alt="img" src={logo} />
              </div>
            </div>
            <div className={classes.renderComponents}>
              <p>General</p>
              <RenderComponent
                path={"/"}
                text={"Dashboard"}
                icon={<MdSpaceDashboard color="var(--text-color)" size={20} />}
              />
              <RenderComponent
                path={"/risks"}
                text={"Compliance Risks"}
                icon={<GoAlertFill color="var(--text-color)" size={20} />}
              />
              <RenderComponent
                path={"/assets"}
                text={"Assets"}
                icon={<FaLaptop color="var(--text-color)" size={20} />}
              />
              <p>Reports</p>
              <RenderComponent
                path={"/alerts"}
                text={"Alerts"}
                icon={<CgDanger color="var(--text-color)" size={20} />}
              />
              <p>Settings</p>
              {/* <RenderComponent
                path={"/users"}
                text={"Users"}
                icon={<FaUsers color="var(--text-color)" size={20} />}
              /> */}
              <RenderComponent
                path={"/settings"}
                text={"Settings"}
                icon={<IoMdSettings color="var(--text-color)" size={20} />}
              />
            </div>
            <div className={classes.logoutBtn} onClick={logoutHandler}>
              <AiOutlineLogout color="var(--white-color)" size={25} />
              <span>Logout</span>
            </div>
          </div>
        )}
        <div
          className={classes.rightMain}
          style={
            titlePage.startsWith("topology")
              ? {
                  width: "100vw",
                  height: "100vh",
                }
              : {}
          }
        >
          <div
            style={
              toggle
                ? { background: "rgb(0 0 0 / 30%)" }
                : { background: "unset", width: "0px", height: "0" }
            }
            className={classes.overFlow}
          ></div>
          <div className={`${[classes.header, classes.rightHeader].join(" ")}`}>
            <div
              // style={toggle ? { marginLeft: "260px" } : { marginLeft: "10px" }}
              onClick={() => setToggle(!toggle)}
              className={classes.menuBar}
            >
              <AiOutlineMenu size={20} color="var(--white-color)" />
            </div>
            <div className={classes.headerContent}>
              <div className={classes.heading}>
                {titlePage.startsWith("topology") && (
                  <IoArrowBackCircleSharp
                    cursor={"pointer"}
                    onClick={() => navigate(-1)}
                    size={30}
                    color="var(--white-color)"
                  />
                )}
                <h3 style={{ fontWeight: "bolder" }}>{titlePage}</h3>
              </div>
              <div className={classes.user}>
                <FaUserCircle size={40} color="var(--white-color)" />
                {user?.role}
                {/* {user?.role === "1" && "Admin"}
                {user?.role === "2" && "Analyser"}
                {user?.role === "3" && "Monitor"} */}
                {/* <h3>{user?.name}</h3>
                <img src={user?.avatar?.url} /> */}
              </div>
            </div>
          </div>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default SidebarSkeleton;
