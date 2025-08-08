import BasicForm from "../../components/forms/BasicForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { ModalPassResetVerify } from "../../components/modal/verifications";
import { MyButton, MyInput } from "../../components/custom";

export default function PasswordResetSend() {
  const [email, setEmail] = useState(null);
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email should to be filled");
  const [reqError, setReqError] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [sending, setSending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalScale, setModalScale] = useState(0);

  const apiUrl = import.meta.env.VITE_API_URL;

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
        setEmailDirty(true);
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
      localStorage.setItem("passResetUser", JSON.stringify(request.data));
      setIsModalOpen(true);
      setTimeout(() => {
        setModalScale(100);
      }, 350);
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

      <BasicForm title={"Password Reset"} customStyleWrapp={wrapperCustomStyle}>
        <h1 className="text-2xl  text-center ">
          To reset your password please enter your email
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
          onChange={emailHandler}
          onBlur={blurHandler}
          type={"email"}
          dirty={emailDirty}
          error={emailError}
        />
        <MyButton {...btnProps}>{sending ? "" : "Reset password"}</MyButton>
      </BasicForm>
      {isModalOpen ? (
        <ModalPassResetVerify scale={modalScale} setScale={setModalScale} />
      ) : (
        ""
      )}
    </>
  );
}
