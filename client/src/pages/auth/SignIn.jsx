import { useState, useEffect } from "react";
import NavBar from "../../components/layout/navigation/NavBar";
import Button from "../../components/custom/MyButton";
import MyInput from "../../components/custom/MyInput";
import BasicForm from "../../components/forms/BasicForm";
import AfterForm from "../../components/forms/AfterForm";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailError, setEmailError] = useState("Email should to be filled");
  const [passwordError, setPasswordError] = useState(
    "Password should to be filled"
  );
  const [emailDirty, setEmailnDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [logining, setLogining] = useState(false);
  const apiUrl = import.meta.env.API_URL;

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
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const loginUser = async (e) => {
    e.preventDefault();
    setLogining(true);
    setFormValid(false);
    try {
      const request = await axios.post(`${apiUrl}/login`, {
        email: email,
        password: password,
      });
      console.log(request.data[0]);
    } catch (error) {
      setLogining(false);
      setFormValid(true);
      console.log(error);
      setLoginError(error.response.data);
    }
  };

  const btnProps = {
    formValid: formValid,
    handleClick: loginUser,
    doing: logining,
  };

  const afProps2 = {
    question: "Don't have an account?",
    hyperLink: "Sign Up",
    href: "/sign-up",
  };

  const wrapperCustomStyle = `w-120 h-130`;
  return (
    <>
      <title>Sign-In</title>
      <BasicForm customStyleWrapp={wrapperCustomStyle}>
        <h1 className="text-4xl w-2/3 text-center mb-10">Sign-In</h1>
        {loginError ? (
          <div className="flex justify-center items-center border-2 w-100 border-red-500 p-1  rounded-md text-center overflow-auto">
            <p className="w-100">{loginError}</p>
          </div>
        ) : (
          ""
        )}
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
        >
          <a
            className="transition-colors text-[var(--text-primary)] hover:text-blue-500"
            href="/reset-send"
          >
            Forgot Password
          </a>
        </MyInput>
        <Button {...btnProps}>{logining ? "" : "Login"}</Button>
        <AfterForm {...afProps2} />
      </BasicForm>
    </>
  );
}
