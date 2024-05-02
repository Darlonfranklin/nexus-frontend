import { Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import AppRoutes from "./app.routes";
import LoginPage from "../pages/login";

const AuthRoutes: React.FC = () => {
  const { logged } = useAuth();
  return (
    <Routes>
      <Route path="*" element={logged ? <AppRoutes /> : <LoginPage />} />
    </Routes>
  );
};

export default AuthRoutes;
