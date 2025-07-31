import axios from "axios";
import Button from "../components/MyButton";
import CodeForm from "../components/CodeForm";
import AfterForm from "../components/AfterForm";
import { useState, useEffect, useCallback } from "react";

export default function Verify() {
  const [userCode, setUserCode] = useState("");
  const [formValid, setFormValid] = useState(false);
  const primaryUser = JSON.parse(localStorage.getItem("primaryUser"));
  const apiUrl = import.meta.env.API_URL;
  const [codeError, setCodeError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const endOfSession = localStorage.getItem("endOfSession");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4200/user/${primaryUser.id}`
        );
        if (!response.data[0])
          setCodeError("Session is over! Please register again");
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, [primaryUser, apiUrl]);

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
  }, [endOfSession]);

  const handleVerify = async (event) => {
    event.preventDefault();
    if (!primaryUser) {
      setCodeError("An error with your primary data please register again!");
    }
    setFormValid(false);
    setVerifying(true);
    try {
      const request = await axios.post("http://localhost:4200/verify", {
        id: primaryUser.id,
        code: userCode,
      });
      console.log(request.data[0]);
      localStorage.removeItem("primaryUser");
      localStorage.setItem("user", JSON.stringify(request.data[0]));
    } catch (error) {
      setFormValid(true);
      setVerifying(false);
      console.log(error);
      setCodeError(error.response.data);
    }
  };

  const removeUser = useCallback(async () => {
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
  },[primaryUser,endOfSession]);

  const formProps = {
    title: "Vetify Account",
    user: primaryUser,
    userCode: userCode,
    setUserCode: setUserCode,
    codeError: codeError,
    setCodeError: setCodeError,
    setFormValid: setFormValid,
    endOfSession: endOfSession,
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

  return (
    <>
      <title>Verify</title>
      <CodeForm {...formProps}>
        <Button {...btnProps}>{verifying ? "" : "Verify account"}</Button>
        <AfterForm {...afProps} />
      </CodeForm>
    </>
  );
}
