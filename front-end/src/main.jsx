import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-cexu7h8s3dde5fb4.us.auth0.com"
      clientId="AI5wwso6Hs1vbGu96X2gPgepcj7jVs4G"
      authorizationParams={{
        redirect_uri: "http://localhost:5173/",
        audience: "http://localhost:5000",
        scope: "openId profile email "
      }}
    >
      <MantineProvider>
        <App />
      </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
);
