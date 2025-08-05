import axios from "axios";
import Button from "../../components/custom/MyButton";
import CodeForm from "../../components/forms/CodeForm";
import AfterForm from "../../components/forms/AfterForm";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { createPortal } from "react-dom";

export default function ModalPassResetVerify({scale }) {
  const passResetUser = JSON.parse(localStorage.getItem("passResetUser"));
  const [codeError, setCodeError] = useState("");
  const [userCode, setUserCode] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [searchParams] = useSearchParams("");
  const apiUrl = import.meta.env.VITE_API_URL;
console.log(passResetUser.email);
  const handleVerify = async (event) => {
    event.preventDefault();
    if (!passResetUser) {
      setCodeError("An error with your primary data please register again!");
    }
    setFormValid(false);
    setVerifying(true);
    try {
      const request = await axios.post(`${apiUrl}/verify-pass-reset`, {
        email: passResetUser.email,
        code: userCode,
      });
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
      const request = await axios.put(`${apiUrl}/pass-reset-stop`, {
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
    customStyleMain: `w-max h-max`,
  };

  const btnProps = {
    handleClick: handleVerify,
    formValid: formValid,
    doing: verifying,
  };

  return createPortal(
    <>
      <div
        className={`inset-0 fixed flex justify-center items-center bg-black/80  transition-all ease-in-out duration-300 ${scale?"scale-100 opacity-100":"scale-95 opacity-0"}`}
      >
        <CodeForm {...formProps}>
          <Button {...btnProps}>{verifying ? "" : "Verify Reset"}</Button>
          <AfterForm
            question={"Don't want to reset?"}
            hyperLink={"Get back to sign-in"}
            handleClick={stopResetPass}
            href={"/sign-in"}
          />
        </CodeForm>
      </div>
    </>,
    document.body
  );
}
