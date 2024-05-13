import { Navigate, Route, Routes } from "react-router-dom";
import DrawerMenu from "../components/Drawer";
import Customer from "../pages/customer";
import List from "../pages/customer/list";
import CustomerEdit from "../pages/customer/edit";
import Dashboard from "../pages/dashboard";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import LoginPage from "../pages/login";

const AppRoutes: React.FC = () => {
  const [cookies, setCookie] = useCookies(["dashboardRoute"]);

  useEffect(() => {
    const token = localStorage.getItem("@nexus.application:token");
    const logged = localStorage.getItem("@nexus.application:logged");

    if (token && logged && !cookies.dashboardRoute) {
      setCookie("dashboardRoute", { path: "/dashboard" });
    }
  }, [cookies.dashboardRoute, setCookie]);

  return (
    <DrawerMenu>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastros">
          <Route path="cliente" element={<Customer />} />
          <Route path="cliente/listar" element={<List />} />
          <Route path="cliente/editar/:id" element={<CustomerEdit />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
          element={
            <Navigate to={cookies.dashboardRoute || "/dashboard"} replace />
          }
        />
      </Routes>
    </DrawerMenu>
  );
};

export default AppRoutes;
