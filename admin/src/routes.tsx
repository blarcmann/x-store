import { Routes, Route } from "react-router-dom";
import Home from "./pages/Dashboard";
const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
export default Main;
