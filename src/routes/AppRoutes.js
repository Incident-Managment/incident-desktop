import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import DashboardRoutes from "../pages/Dashboard";
import NotFound from "../pages/NotFound"; // Import the NotFound component

const isAuthenticated = () => {
  return localStorage.getItem('user') !== null;
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/*" element={isAuthenticated() ? <DashboardRoutes /> : <Navigate to="/login" />} />
      <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
    </Routes>
  </Router>
);

export default AppRoutes;