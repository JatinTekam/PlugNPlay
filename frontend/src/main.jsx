import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SetDarkMode } from "./context/DarkMode.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <SetDarkMode>
      <App />
      </SetDarkMode>
    </StrictMode>
  </BrowserRouter>
);
