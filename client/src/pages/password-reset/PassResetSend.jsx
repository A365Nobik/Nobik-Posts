import NavBar from "../../components/layout/NavBar";
import BasicForm from "../../components/forms/BasicForm";
import InputWrapper from "../components/InputWrapper";
import { MdEmail } from "react-icons/md";
import { useState, useEffect } from "react";
import Button from "../../components/custom/MyButton";
import axios from "axios";
import MyInput from "../../components/custom/MyInput";

export default function PasswordResetSend() {
  const [email, setEmail] = useState(null);
  const [emailDirty, setEmailnDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email should to be filled");
  const [reqError, setReqError] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [sending, setSending] = useState(false);
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

  const blurHandler = (event) => {
    switch (event.target.name) {
      case "email": {
        setEmailnDirty(true);
        break;
      }
    }
  };

  useEffect(() => {
    if (emailError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError]);

  const sendPassResetLink = async (event) => {
    setFormValid(false);
    setSending(true);
    event.preventDefault();
    try {
      const request = await axios.post(`${apiUrl}/pass-reset-send`, {
        email: email,
      });
      localStorage.setItem("passResetUser", JSON.stringify(request.data[0]));
      location.href = "/verify-reset";
    } catch (error) {
      setFormValid(true);
      setSending(false);
      console.log(error);
      setReqError(error.response.data);
    }
  };

  const btnProps = {
    formValid: formValid,
    handleClick: sendPassResetLink,
    doing: sending,
  };

  const wrapperCustomStyle = `w-120 h-80`;

  return (
    <>
      <title>Password Reset</title>
      <NavBar />
      <BasicForm title={"Password Reset"} customStyleWrapp={wrapperCustomStyle}>
        <h1 className="text-3xl w-2/3 text-center ">
          To reset your password please enter email
        </h1>
        {reqError ? (
          <div className="border-2 border-red-500 p-1 font-medium rounded-md">
            {reqError}
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
        <Button {...btnProps}>{sending ? "" : "Reset password"}</Button>
      </BasicForm>
    </>
  );
}
