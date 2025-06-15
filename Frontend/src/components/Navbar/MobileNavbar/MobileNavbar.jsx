import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdDashboard, MdOutlineContentPaste, MdSell } from "react-icons/md";
import { RiAdminFill, RiLockPasswordFill } from "react-icons/ri";
import { VscThreeBars } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Get } from "../../../AxiosFunction/AxiosFunction";
import { BaseUrl } from "../../../Config/apiUrl";
import { logo } from "../../../Constant/ImagePath";
import { isSignout } from "../../../redux/authSlice";
import ErrorShowModal from "../../../Modals/ErrorShowModal";
import classes from "./MobileNavbar.module.css";

const RenderComponent = ({ text, path, icon, onClick }) => {
  const navigate = useNavigate();
  const location = useLocation()?.pathname;
  return (
    <List
      onClick={() => {
        navigate(path);
        onClick();
      }}
      className={location == path && classes.activeMain}
    >
      <ListItem key={text} disablePadding>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default function MobileNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorShowModa, setErrorShowModa] = useState(false);
  const [errorShowModa2, setErrorShowModa2] = useState(false);
  const { isLogin, user } = useSelector((state) => state?.authReducer);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const handleLogout = async () => {
    const apiUrl = BaseUrl(`logout`);
    const response = await Get(apiUrl);
    if (response !== undefined) {
      dispatch(isSignout());
      toast.success("Logout Successfully");
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.logoBg}>
        <div onClick={() => navigate("/")} className={classes.sideLogoMain}>
          <div className={classes.logoMian}>
            <img src={logo} />
          </div>
          {/* <h3>
            Let's <span>Learn</span>
          </h3> */}
        </div>
      </div>
      <RenderComponent
        text={"Home"}
        path={"/"}
        icon={<AiFillHome size={18} color="var(--main-color)" />}
      />
      <RenderComponent
        text={"About Us"}
        path={"/about-us"}
        icon={<MdOutlineContentPaste size={18} color="var(--main-color)" />}
      />
      <RenderComponent
        text={"Become a tutor"}
        onClick={() => {
          if (!isLogin) {
            navigate("/signup");
          } else if (user?.role === "student") {
            setErrorShowModa(true);
          } else {
            setErrorShowModa2(true);
          }
        }}
        icon={<MdOutlineContentPaste size={18} color="var(--main-color)" />}
      />
      <RenderComponent
        text={"Find Tutors"}
        path={`${"/find-tutors"}/${"bba"}`}
        icon={<MdOutlineContentPaste size={18} color="var(--main-color)" />}
      />
      <RenderComponent
        text={"Contact Us"}
        path={"/contact-us"}
        icon={<FaPhoneAlt size={18} color="var(--main-color)" />}
      />
      <Divider style={{ background: "var(--heading-color)" }} />
      {isLogin ? (
        <>
          {user?.roleForAdmin == "admin" && (
            <RenderComponent
              text={"Admin Panel"}
              path={"/users"}
              icon={<RiAdminFill size={18} color="var(--main-color)" />}
            />
          )}
          <RenderComponent
            text={"Dashboard"}
            path={
              user?.role == "tutor" ? "/tutor-dashboard" : "/student-dashboard"
            }
            icon={<MdDashboard size={18} color="var(--main-color)" />}
          />
          <RenderComponent
            text={"Update Profile"}
            path={"/update-profile"}
            icon={<ImProfile size={18} color="var(--main-color)" />}
          />
          <RenderComponent
            text={"Chat"}
            path={"/chat"}
            icon={<ImProfile size={18} color="var(--main-color)" />}
          />
          {user?.role == "tutor" && (
            <RenderComponent
              text={"My Sell Courses"}
              path={"/sell-courses"}
              icon={<MdSell size={18} color="var(--main-color)" />}
            />
          )}
          <RenderComponent
            text={"Update Password"}
            path={"/update-password"}
            icon={<RiLockPasswordFill size={18} color="var(--main-color)" />}
          />
          <Divider style={{ background: "var(--heading-color)" }} />
          <RenderComponent
            text={"Logout"}
            onClick={handleLogout}
            icon={<BiLogOut size={18} color="var(--main-color)" />}
          />
        </>
      ) : (
        <>
          <RenderComponent
            text={"Login"}
            path={"/login"}
            icon={<AiFillHome size={18} color="var(--main-color)" />}
          />
          <RenderComponent
            text={"Signup"}
            path={"/signup"}
            icon={<AiFillHome size={18} color="var(--main-color)" />}
          />
        </>
      )}
    </Box>
  );

  return (
    <>
      <style>
        {`
      .MuiListItemIcon-root{
        min-width: 30px !important;
      }
      .MuiTypography-root.MuiTypography-body1.MuiListItemText-primary{
        color:var(--heading-color) !important;
        font-size:13px !important;
      }
      .MuiList-root.MuiList-padding{
        padding-top: 0px !important;
    padding-bottom: 0px !important;
      }
      .MuiButtonBase-root.MuiListItemButton-root.MuiListItemButton-gutters.MuiListItemButton-root.MuiListItemButton-gutters{
        padding-top: 4px !important;
        padding-bottom: 4px !important;
      }
      `}
      </style>
      <Container>
        <div className={classes.main}>
          <div onClick={() => navigate("/")} className={classes.sideLogoMain}>
            <div className={classes.logoMian}>
              <img src={logo} />
            </div>
            {/* <h3 className={classes.logoHeadColor}>
              Let's <span>Learn</span>
            </h3> */}
          </div>
          <React.Fragment key={"right"}>
            <Button onClick={toggleDrawer("right", true)}>
              <VscThreeBars size={25} color="#000" />
            </Button>
            <Drawer
              anchor={"right"}
              open={state["right"]}
              onClose={toggleDrawer("right", false)}
            >
              {list("right")}
            </Drawer>
          </React.Fragment>
        </div>
      </Container>
      {errorShowModa && (
        <ErrorShowModal
          heading={"You're Logged in as a Student"}
          text={"Register as a tutor to become a tutor"}
          setShow={setErrorShowModa}
          show={errorShowModa}
        />
      )}
      {errorShowModa2 && (
        <ErrorShowModal
          heading={"You're also Logged in as a tutor"}
          // text={"Register as a tutor to become a tutor"}
          setShow={setErrorShowModa2}
          show={errorShowModa2}
        />
      )}
    </>
  );
}
