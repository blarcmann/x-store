import { Navigate, useRoutes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from './pages/Orders';
import DashboardLayout from "./sections/dashboard";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Account from './pages/Account';
import { Products, Product, EditProduct } from "./pages/product";

const Main = () => {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "app", element: <Dashboard /> },
        { path: "customers", element: <Customers /> },
        { path: "orders", element: <Orders /> },
        { path: "account", element: <Account /> },
        { path: "products", element: <Products /> },
        { path: "products/:id", element: <Product /> },
        { path: "products/edit/:id", element: <EditProduct /> },
      ],
    },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "/", element: <Navigate to="/dashboard/app" replace /> },
    { path: "dashboard/", element: <Navigate to="/dashboard/app" replace /> },
  ]);
};
export default Main;
