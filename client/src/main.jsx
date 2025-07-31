import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import NavBar from "./components/layout/navigation/NavBar";
import Routes from "./routes";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <NavBar/>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
