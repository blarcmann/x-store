import { useRoutes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from './sections/dashboard';

const Main = () => {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <Dashboard /> },
      ],
    },
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
};
export default Main;
