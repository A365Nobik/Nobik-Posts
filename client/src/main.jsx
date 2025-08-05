import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import UserProvider from "./context/UserContext";
import NavBar from "./components/layout/navigation/NavBar";
import Routes from "./routes";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <Routes>
            <NavBar />
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);

