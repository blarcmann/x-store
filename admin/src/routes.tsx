import { useRoutes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Users from "./pages/Users";
import DashboardLayout from "./sections/dashboard";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

const Main = () => {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "app", element: <Dashboard /> },
        { path: "user", element: <Users /> },
        { path: "products", element: <Products /> },
      ],
    },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
};
export default Main;
