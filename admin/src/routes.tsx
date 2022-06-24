import { useRoutes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Users from "./pages/Users";
import DashboardLayout from './sections/dashboard';

const Main = () => {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <Dashboard /> },
        { path: 'user', element: <Users /> },
        { path: 'products', element: <Products /> },
      ],
    },
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
};
export default Main;
