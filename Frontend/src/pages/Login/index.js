import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth/authSlice";
import { baseURL } from "../../Config/apiUrl";
import { POST } from "../../axios/axiosFunctions";
import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import "../../global.css";
import styles from "./Login.module.css";
import LogoMain from "../../assets/logo.png";
import Input from "../../components/Input/Input";

const Login = () => {
  const [inputEmail, setinputEmail] = useState("");
  const [inputPassword, setinputPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async () => {
    const params = {
      email: inputEmail,
      password: inputPassword,
    };

    for (let i in params) {
      if (!params[i]) {
        toast.error(`Please fill the ${i} field!`);
        return;
      }
    }
    if (inputEmail) {
      if (!inputEmail.includes("@")) {
        toast.error(`Invalid email field!`);
        return;
      }
    }
    setSubmitting(true);
    const response = await POST(baseURL("api/login/"), params);
    if (response !== undefined) {
      toast.success(`Logged in successfully!`);
      dispatch(authActions.login(response?.data?.authenticatedUser));
      navigate("/");
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.mainLoginContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.leftLogoContainer}>
          <img src={LogoMain} alt="Logo" />
        </div>
      </div>
      <div className={`${styles.Card}`}>
        <h2 className={styles.headingLogin}>Login</h2>
        <div>
          <div
            className={`${styles.leftLogoContainer} ${styles.logoContainer}`}
          >
            <img src={LogoMain} alt="Logo" />
          </div>
          <Input
            setter={setinputEmail}
            value={inputEmail}
            label={"Username"}
            type={"email"}
            placeholder={"Email"}
            className={`${styles.input}`}
            labelClass={styles.label}
          />
        </div>

        <Input
          setter={setinputPassword}
          value={inputPassword}
          label={"Password"}
          type={"password"}
          placeholder={"Password"}
            labelClass={styles.label}
            className={`${styles.input}`}
        ></Input>

        <Button
          onClick={loginHandler}
          customStyle={{ width: "100%", padding: ".5rem 0", cursor: "pointer" }}
          disable={submitting}
        >
          {submitting ? "Please wait..." : "Login"}
        </Button>
      </div>
    </div>
  );
};

export default Login;
