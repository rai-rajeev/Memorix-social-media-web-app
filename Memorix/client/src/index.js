import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { StyledEngineProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
const clientId=process.env.REACT_APP_GoogleClientID;
root.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <GoogleOAuthProvider clientId={clientId} className="google-auth-provider">
        <App />
      </GoogleOAuthProvider>
    </StyledEngineProvider>
  </Provider>
);
reportWebVitals();
