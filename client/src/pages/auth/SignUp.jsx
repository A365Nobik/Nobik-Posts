import { useState, useEffect } from "react";
import NavBar from "../../components/layout/NavBar";
import axios from "axios";
import Button from "../../components/custom/MyButton";
import BasicForm from "../../components/forms/BasicForm";
import AfterForm from "../../components/forms/AfterForm";
import MyInput from "../../components/custom/MyInput";
import EmailVerify from "../../components/modal/EmailVerifyModal";

export default function Register() {
  const [login, setLogin] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginError, setLoginError] = useState("Login should to be filled");
  const [emailError, setEmailError] = useState("Email should to be filled");
  const [passwordError, setPasswordError] = useState(
    "Password should to be filled"
  );
  const [loginDirty, setLoginDirty] = useState(false);
  const [emailDirty, setEmailnDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [modalScale, setModalScale] = useState(0);
  const [registerError, setRegisterError] = useState("");
  const [registering, setRegistering] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const apiUrl = import.meta.env.API_URL;

  const loginHandler = (event) => {
    setLogin(event.target.value);
    if (event.target.value.length > 0) {
      setLoginError("");
    } else {
      setLoginError("Login should to be filled");
    }
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(event.target.value).toLowerCase())) {
      setEmailError("Incorrect Email format");
    } else if (event.target.value === null) {
      setEmailError("Email should to be filled");
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < 6) {
      setPasswordError("Password should to have min 6 symbols");
    } else if (!event.target.value) {
      setPasswordError("Password should to be filled");
    } else {
      setPasswordError("");
    }
  };

  const blurHandler = (event) => {
    switch (event.target.name) {
      case "login": {
        setLoginDirty(true);
        break;
      }
      case "email": {
        setEmailnDirty(true);
        break;
      }
      case "password": {
        setPasswordDirty(true);
        break;
      }
    }
  };
  useEffect(() => {
    if (loginError || emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [loginError, emailError, passwordError]);

  useEffect(() => {
    if (user) {
      setModalScale(0);
      setTimeout(() => {
        setEmailModal(false);
      }, 350);
    }
  }, [user]);

  const registerUser = async (event) => {
    event.preventDefault();
    setFormValid(false);
    setRegistering(true);
    try {
      const request = await axios.post(`${apiUrl}/register`, {
        login: login,
        email: email,
        password: password,
      });
      console.log(request.data);
      localStorage.setItem("primaryUser", JSON.stringify(request.data));
      setEmailModal(true);
      setTimeout(() => {
        setModalScale(100);
      }, 350);
    } catch (error) {
      console.log(error);
      setRegisterError(error.response.data);
      setFormValid(true);
      setRegistering(false);
    }
  };
  const btnProps = {
    formValid: formValid,
    handleClick: registerUser,
    doing: registering,
  };

  const afProps = {
    question: "Already have an account?",
    hyperLink: "Sign In",
    href: "/sign-in",
    customStyle: "mt-5 ",
  };

  const wrapperCustomStyle = `w-120 h-130`;
  return (
    <>
      <title>Sign-Up</title>
      <NavBar />
      <BasicForm customStyleWrapp={wrapperCustomStyle}>
        <h1 className="text-4xl w-2/3 text-center mb-10">Sign-up</h1>
        {registerError ? (
          <div className="flex justify-center items-center border-2 w-100 border-red-500 p-1  rounded-md text-center overflow-auto">
            <p className="w-100">{registerError}</p>
          </div>
        ) : (
          ""
        )}
        <MyInput
          label={"Username"}
          handler={loginHandler}
          blur={blurHandler}
          type={"text"}
          dirty={loginDirty}
          error={loginError}
        />
        <MyInput
          label={"Email"}
          handler={emailHandler}
          blur={blurHandler}
          type={"email"}
          dirty={emailDirty}
          error={emailError}
        />
        <MyInput
          label={"Password"}
          handler={passwordHandler}
          blur={blurHandler}
          type={"password"}
          dirty={passwordDirty}
          error={passwordError}
        />
        <Button {...btnProps}>{registering ? "" : "Register"}</Button>
        <AfterForm {...afProps} />
      </BasicForm>
      {emailModal ? (
        <>
          <EmailVerify scale={modalScale} setScale={setModalScale} />
        </>
      ) : (
        ""
      )}
    </>
  );
}
