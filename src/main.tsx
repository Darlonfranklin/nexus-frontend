import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GlobalStyles from "./styles/GlobalStyles.ts";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/auth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GlobalStyles />
    <ToastContainer position="top-right" autoClose={1000} />
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
