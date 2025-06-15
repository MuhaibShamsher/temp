import { CgLogOut } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoAlarmSharp, IoClose } from "react-icons/io5";
import { MdComputer, MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo_main.jpg";
import classes from "./Sidebar.module.css";
import { GoAlertFill } from "react-icons/go";

const Sidebar = () => {
  const logOutHandler = () => {};
  return (
    <div className={classes.container}>
      <aside className={classes.aside}>
        <div className={classes.top}>
          <div className={classes.logo}>
            <img src={logo} />
          </div>
          <div className={classes.closeBtn}>
            <IoClose />
          </div>
        </div>
        <div className={classes.sidebar}>
          <NavLink to="/">
            {" "}
            <MdDashboard />
            <h3>Dashboard</h3>
          </NavLink>
          <NavLink to="/threats">
            {" "}
            <MdComputer />
            <h3>Threats</h3>
          </NavLink>
          <NavLink to="/alerts">
            {" "}
            <GoAlertFill />
            <h3>Alerts</h3>
          </NavLink>
          <NavLink to="/users">
            {" "}
            <FaUsers />
            <h3>Users</h3>
          </NavLink>
          <NavLink to="/settings">
            {" "}
            <IoMdSettings />
            <h3>Settings</h3>
          </NavLink>
        </div>
        <div className={classes.logoutContainer}>
          <NavLink to="/login" onClick={logOutHandler}>
            {" "}
            <CgLogOut />
            <h3>Logout</h3>
          </NavLink>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
