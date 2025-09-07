import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "./config/Firebase.ts";
import { BrowserRouter } from "react-router";
import FirebaseServices from "./config/FirebaseServices.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FirebaseAppProvider firebaseConfig = {firebaseConfig}>
      <FirebaseServices>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FirebaseServices>
    </FirebaseAppProvider>
  </StrictMode>,
)
