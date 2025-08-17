import { useState, useEffect } from "react";
import axios from "axios";
import BasicForm from "../../components/forms/BasicForm";
import AfterForm from "../../components/forms/AfterForm";
import { MyInput, MyButton, MyError } from "../../components/custom/";
import { EmailVerify } from "../../components/modal";
import ReCAPTCHA from "react-google-recaptcha";

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
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [modalScale, setModalScale] = useState(0);
  const [registerError, setRegisterError] = useState("");
  const [registering, setRegistering] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const apiUrl = import.meta.env.VITE_API_URL;
  const siteKey=import.meta.env.VITE_RECAPTCHA_SITE_KEY
  const [captcha, setCaptcha] = useState(null);
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
      case "username": {
        setLoginDirty(true);
        break;
      }
      case "email": {
        setEmailDirty(true);
        break;
      }
      case "password": {
        setPasswordDirty(true);
        break;
      }
    }
  };
  useEffect(() => {
    if (loginError || emailError || passwordError||!captcha) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [loginError, emailError, passwordError,captcha]);

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
      setModalScale(0);
      setTimeout(() => {
        setModalScale(100);
      }, 400);
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
      <BasicForm customStyleWrapp={wrapperCustomStyle}>
        <h1 className="text-4xl w-2/3 text-center mb-10">Sign-up</h1>
        <MyError anyError={registerError} />

        <MyInput
          label={"Username"}
          onChange={loginHandler}
          onBlur={blurHandler}
          type={"text"}
          dirty={loginDirty}
          error={loginError}
        />
        <MyInput
          label={"Email"}
          onChange={emailHandler}
          onBlur={blurHandler}
          type={"email"}
          dirty={emailDirty}
          error={emailError}
        />
        <MyInput
          label={"Password"}
          onChange={passwordHandler}
          onBlur={blurHandler}
          type={"new-password"}
          dirty={passwordDirty}
          error={passwordError}
        />
        <ReCAPTCHA onChange={(token)=>setCaptcha(token)} sitekey={siteKey}/>
        <MyButton {...btnProps}>{registering ? "" : "Register"} </MyButton>
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
