import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { FileProvider } from "./context/fileContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FileProvider>
      <Router>
        <App />
      </Router>
    </FileProvider>
  </StrictMode>
);
