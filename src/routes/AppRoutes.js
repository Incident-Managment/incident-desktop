import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import DashboardRoutes from "../pages/Dashboard";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
    </Routes>
  </Router>
);

export default AppRoutes;