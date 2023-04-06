import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      {/* <AuthProvider tokenUrl={`${process.env.REACT_APP_HOOKED_API_HOST}/token`}>
        <App />
      </AuthProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
