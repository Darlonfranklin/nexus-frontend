import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/app.routes";
import { Fragment } from "react/jsx-runtime";

function App() {
  return (
    <Fragment>
      <ToastContainer position="top-right" autoClose={1000} />
      <AppRoutes />
    </Fragment>
  );
}

export default App;
