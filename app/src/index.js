import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AnonAadhaarProvider
  // _artifactslinks={{
  //   zkey_url: "/circuit_final.zkey",
  //   vkey_url: "/vkey.json",
  //   wasm_url: "/aadhaar-verfier.wasm",
  // }}
  >
    <App />
  </AnonAadhaarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
