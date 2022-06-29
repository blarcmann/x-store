import { Navigate, useRoutes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import DashboardLayout from "./sections/dashboard";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { Products, Product } from "./pages/product";

const Main = () => {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "user", element: <Users /> },
        { path: "products", element: <Products /> },
        { path: "products/:id", element: <Product /> },
      ],
    },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "/", element: <Navigate to="/dashboard" replace /> },
  ]);
};
export default Main;
