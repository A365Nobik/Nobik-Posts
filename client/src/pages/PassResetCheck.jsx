import axios from "axios";
import Button from "../components/MyButton";
import CodeForm from "../components/CodeForm";
import AfterForm from "../components/AfterForm";
import { useState } from "react";
import { useSearchParams } from "react-router";


export default function PassResetCheck() {
  const passResetUser = JSON.parse(localStorage.getItem("passResetUser"));
  const [codeError, setCodeError] = useState("");
  const [userCode, setUserCode] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [searchParams] = useSearchParams("");

  const handleVerify = async (event) => {
    event.preventDefault();
    if (!passResetUser) {
      setCodeError("An error with your primary data please register again!");
    }
    setFormValid(false);
    setVerifying(true);
    try {
      const request = await axios.post(
        "http://localhost:4200/verify-pass-reset",
        {
          id: passResetUser.id,
          code: userCode,
        }
      );
      localStorage.removeItem("passResetUser");
      localStorage.setItem(
        "primaryUserPassoword",
        JSON.stringify(request.data[0])
      );
      location.href = "/password-reset";
    } catch (error) {
      setFormValid(true);
      setVerifying(false);
      console.log(error);
      setCodeError(error.response.data);
    }
  };
  const stopResetPass = async () => {
    localStorage.removeItem("passResetUser");
    try {
      const request = await axios.put(`http://localhost:4200/pass-reset-stop`, {
        id: passResetUser.id,
      });
      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const formProps = {
    title: "Verify Reset",
    user: passResetUser,
    userCode: userCode,
    setUserCode: setUserCode,
    codeError: codeError,
    setCodeError: setCodeError,
    searchParams: searchParams,
    setFormValid: setFormValid,
  };

  const btnProps = {
    handleClick: handleVerify,
    formValid: formValid,
    doing: verifying,
  };

  return (
    <>
      <title>Password Reset</title>
      <CodeForm {...formProps}>
        <Button {...btnProps}>{verifying ? "" : "Verify Reset"}</Button>
        <AfterForm
          question={"Don't want to reset?"}
          hyperLink={"Get back to sign-in"}
          handleClick={stopResetPass}
          href={"/sign-in"}
        />
      </CodeForm>
    </>
  );
}
