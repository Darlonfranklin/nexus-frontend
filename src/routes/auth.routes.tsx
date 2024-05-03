import { Route, Routes, useNavigate } from "react-router-dom";
import AppRoutes from "./app.routes";
import LoginPage from "../pages/login";
import { useAuth } from "../contexts/auth";
import { useEffect } from "react";

const AuthRoutes: React.FC = () => {
  const navigate = useNavigate();
  const { logged } = useAuth();

  useEffect(() => {
    if (!logged) {
      navigate("/login");
    }
  }, [logged, navigate]);

  return (
    <Routes>
      <Route path="*" element={logged ? <AppRoutes /> : <LoginPage />} />
    </Routes>
  );
};

export default AuthRoutes;
