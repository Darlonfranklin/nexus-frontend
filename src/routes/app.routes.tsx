import { Navigate, Route, Routes } from "react-router-dom";
import DrawerMenu from "../components/Drawer";
import Customer from "../pages/customer";
import List from "../pages/customer/list";
import CustomerEdit from "../pages/customer/edit";
import Dashboard from "../pages/dashboard";
import Information from "../pages/customer/information";

const AppRoutes: React.FC = () => {
  return (
    <DrawerMenu>
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastros">
          <Route path="cliente" element={<Customer />} />
          <Route path="cliente/listar" element={<List />} />
          <Route path="cliente/editar/:id" element={<CustomerEdit />} />
          <Route path="cliente/informações/:id" element={<Information />} />
        </Route>
      </Routes>
    </DrawerMenu>
  );
};

export default AppRoutes;
