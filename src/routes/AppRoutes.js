import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import DashboardRoutes from '../pages/Dashboard';
import PrivateRoute from './PrivateRoute'; // Importa el componente PrivateRoute

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/*" element={ <PrivateRoute> <DashboardRoutes /> </PrivateRoute> }/>
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  </Router>
);

export default AppRoutes;