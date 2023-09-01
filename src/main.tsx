import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-auth-kit";
import App from "./App";
import theme from "./theme";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "./i18n/config";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AuthProvider
        authType="cookie"
        authName="_auth"
        cookieDomain={window.location.hostname}
        cookieSecure={false} // enable for https
      >
        <App />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
