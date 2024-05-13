import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AppRoutes from "./app.routes";
import LoginPage from "../pages/login";
import { useAuth } from "../contexts/auth";
import { Fragment, useEffect, useState } from "react";

const AuthRoutes: React.FC = () => {
  const navigate = useNavigate();
  const { logged } = useAuth();

  const [log, setLog] = useState<boolean>(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("@nexus.application:token");
      const logged = localStorage.getItem("@nexus.application:logged");

      if (!token || logged !== "true") {
        setLog(false);
        navigate("/login");
      } else {
        setLog(true);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [logged, log]);

  useEffect(() => {
    if (!logged) {
      if (!window.location.reload) window.location.reload();
    }
  }, [logged]);

  return (
    <Fragment>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
          element={logged ? <AppRoutes /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Fragment>
  );
};

export default AuthRoutes;
