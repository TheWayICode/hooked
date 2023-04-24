import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import 'mapbox-gl/dist/mapbox-gl.css';

const databaseUrl = 'postgres://hooked_user:hooked_pw@srv-captain--hooked-data/postgres';
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App databaseUrl={databaseUrl}/>
  </React.StrictMode>
);

reportWebVitals();
