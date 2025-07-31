import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/auth/SignUp";
import Login from "./pages/auth/SignIn";
import NotFound from "./pages/NotFound";
import PasswordResetSend from "./pages/password-reset/PassResetSend";
import PassReset from "./pages/password-reset/PassReset";

export default function Mainroutes({ children }) {
  const primaryUserPassoword = JSON.parse(
    localStorage.getItem("primaryUserPassoword")
  );

  return (
    <>
      {children}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="reset-send" element={<PasswordResetSend />} />
        {primaryUserPassoword ? (
          <Route path="/password-reset" element={<PassReset />} />
        ) : (
          ""
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
