import axios from "axios";
import BasicForm from "../../components/forms/BasicForm";
import Button from "../../components/custom/MyButton";
import MyInput from "../../components/custom/MyInput";
import { useState, useEffect } from "react";

export default function PassReset() {
  const [password, setPassword] = useState(null);
  const [passwordError, setPasswordError] = useState(
    "Password should to be filled"
  );
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [changing, setChanging] = useState(false);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("primaryUserPassoword"));
  const apiUrl = import.meta.env.API_URL;

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
      case "password": {
        setPasswordDirty(true);
        break;
      }
    }
  };

  useEffect(() => {
    if (passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [passwordError]);

  const updatePassword = async (event) => {
    event.preventDefault();
    setChanging(true);
    setFormValid(false);
    try {
      const request = await axios.post(`${apiUrl}/update-pass`, {
        id: user.id,
        newPass: password,
      });
      console.log(request.data[0]);
      localStorage.removeItem("primaryUserPassoword");
      localStorage.setItem("user", JSON.stringify(request.data[0]));
      location.href = "/sign-in";
    } catch (error) {
      setFormValid(true);
      setChanging(false);
      console.log(error);
      setError(error.response.data);
    }
  };

  const btnProps = {
    formValid: formValid,
    handleClick: updatePassword,
    doing: changing,
  };

  return (
    <>
      <title>Password Reset</title>
      <BasicForm title={"New Password"}>
        <p className="text-2xl  text-center">Please enter the new password</p>
        {error ? (
          <div className="border-2 border-red-500 p-1 font-medium rounded-md">
            {error}
          </div>
        ) : (
          ""
        )}
        <MyInput
          label={"Password"}
          handler={passwordHandler}
          blur={blurHandler}
          type={"password"}
          dirty={passwordDirty}
          error={passwordError}
        />
        <Button {...btnProps}>{changing ? "" : "Update"}</Button>
      </BasicForm>
    </>
  );
}
