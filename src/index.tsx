import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles.scss";
import Navbar from "./components/Navbar";
import App from "./App";

const container = document.getElementById("app");

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Navbar />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.log("Unable to find the element");
}
