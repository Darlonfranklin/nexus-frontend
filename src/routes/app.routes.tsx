import { Route, Routes } from "react-router-dom";
import DrawerMenu from "../components/Drawer";
import Customer from "../pages/customer";
import List from "../pages/customer/list";
import CustomerEdit from "../pages/customer/edit";

const AppRoutes: React.FC = () => {
  return (
    <DrawerMenu>
      <Routes>
        <Route path="/cadastros">
          <Route path="cliente" element={<Customer />} />
          <Route path="cliente/listar" element={<List />} />
          <Route path="cliente/editar/:id" element={<CustomerEdit />} />
        </Route>
      </Routes>
    </DrawerMenu>
  );
};

export default AppRoutes;
