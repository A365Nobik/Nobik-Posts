import { Route, Routes, useNavigate } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/auth/SignUp";
import Login from "./pages/auth/SignIn";
import NotFound from "./pages/NotFound";
import PasswordResetSend from "./pages/password-reset/PassResetSend";
import PassResetCheck from "./pages/password-reset/PassResetCheck";
import PassReset from "./pages/password-reset/PassReset";
import { useEffect } from "react";

export default function Mainroutes() {
  let navigate = useNavigate();
  const primaryUserPassoword = JSON.parse(
    localStorage.getItem("primaryUserPassoword")
  );
  const passResetUser = JSON.parse(localStorage.getItem("passResetUser"));

  useEffect(() => {
    if (passResetUser && typeof passResetUser === "object")
      navigate("/verify-reset");
  }, [passResetUser, navigate]);

  useEffect(() => {
    if (primaryUserPassoword && typeof primaryUserPassoword === "object")
      navigate("/password-reset");
  }, [primaryUserPassoword, navigate]);

  return (
    <>
      <Routes>
        {!passResetUser ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="reset-send" element={<PasswordResetSend />} />
          </>
        ) : (
          ""
        )}
        {primaryUserPassoword ? (
          <Route path="/password-reset" element={<PassReset />} />
        ) : (
          ""
        )}
        {passResetUser ? (
          <Route path="/verify-reset" element={<PassResetCheck />} />
        ) : (
          ""
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
