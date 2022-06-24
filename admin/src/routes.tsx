import { useRoutes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import DashboardLayout from './sections/dashboard';

const Main = () => {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <Dashboard /> },
        { path: 'user', element: <User /> },
      ],
    },
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
};
export default Main;
