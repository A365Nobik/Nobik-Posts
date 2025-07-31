import axios from "axios";
import Button from "../custom/MyButton.jsx";
import CodeForm from "../forms/CodeForm.jsx";
import AfterForm from "../forms/AfterForm.jsx";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function EmailVerify({ scale, setScale }) {
  const [userCode, setUserCode] = useState("");
  const [formValid, setFormValid] = useState(false);
  const primaryUser = JSON.parse(localStorage.getItem("primaryUser"));
  const apiUrl = import.meta.env.VITE_API_URL;
  const [codeError, setCodeError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const endOfSession = localStorage.getItem("endOfSession");

  useEffect(() => {
    const registerDate = new Date(primaryUser?.created_at);
    if (endOfSession) return;
    const sessionChecker = setInterval(() => {
      const sessionTime = (new Date() - registerDate) / 1000 / 60;
      if (sessionTime >= 15) {
        localStorage.setItem("endOfSession", true);
        setCodeError("Session is over! Please register again");
        console.log("error");
      }
    }, 60000);
    return () => clearInterval(sessionChecker);
  }, [endOfSession, primaryUser]);

  useEffect(() => {
    if (userCode.length === 6) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
    if (codeError && !endOfSession && userCode.length < 6) {
      setCodeError("");
    }
  }, [userCode, codeError, endOfSession]);

  useEffect(() => {
    if (endOfSession) {
      setCodeError("Session is over! Please register again");
      removeUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endOfSession]);

  const handleVerify = async (event) => {
    event.preventDefault();
    if (!primaryUser) {
      setCodeError("An error with your primary data please register again!");
    }
    setFormValid(false);
    setVerifying(true);
    try {
      const request = await axios.post(`${apiUrl}/verify`, {
        email: primaryUser.email,
        code: userCode,
      });
      console.log(request.data[0]);
      localStorage.removeItem("primaryUser");
      localStorage.setItem("user", JSON.stringify(request.data[0]));
      setScale(0);
    } catch (error) {
      setFormValid(true);
      setVerifying(false);
      console.log(error);
      setCodeError(error.response.data);
    }
  };

  const removeUser = async () => {
    localStorage.removeItem("primaryUser");
    if (endOfSession) localStorage.removeItem("endOfSession");
    try {
      const request = await axios.delete(
        `http://localhost:4200/delete/${primaryUser.id}`
      );
      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const formProps = {
    title: "Vetify Account",
    user: primaryUser,
    userCode: userCode,
    setUserCode: setUserCode,
    codeError: codeError,
    setCodeError: setCodeError,
    setFormValid: setFormValid,
    endOfSession: endOfSession,
    customStyleMain: `w-max h-max`,
  };

  const btnProps = {
    formValid: formValid,
    handleClick: handleVerify,
    doing: verifying,
  };

  const afProps = {
    question: "Made a mistake while register?",
    hyperLink: "Sign-up again",
    href: "/sign-up",
    handleClick: removeUser,
  };

  return createPortal(
    <>
      <div
        className={`inset-0 fixed flex justify-center items-center bg-black/80 transition-transform duration-400 scale-${scale}`}
      >
        <CodeForm {...formProps}>
          <Button {...btnProps}>{verifying ? "" : "Verify account"}</Button>
          <AfterForm {...afProps} />
        </CodeForm>
      </div>
    </>,
    document.body
  );
}
