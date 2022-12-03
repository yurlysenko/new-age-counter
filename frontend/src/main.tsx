import { createRoot } from "react-dom/client";
import "./styles/global.scss";
import { StrictMode } from "react";
import { AuthContextProvider } from "./context/auth";
import { IndexPage } from "./pages";
import { Navbar } from "./views/navbar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <Navbar />
      <IndexPage />
    </AuthContextProvider>
  </StrictMode>
);
