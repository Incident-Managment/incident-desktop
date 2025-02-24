import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import IncidentsPage from './Incident';
import UserProfile from './UserProfile';
import CompanyMachines from './CompanyMachines';
import MainLayout from '../../components/Dashboard/MainLayout';
import UserManagment from './UsersManagment';
import Production from './Production';

const DashboardRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="incidents" element={<IncidentsPage />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="company-machines" element={<CompanyMachines />} />
          <Route path="users-managment" element={<UserManagment />} />
          <Route path="production" element={<Production />} />
        </Route>
      </Routes>
  );
};

export default DashboardRoutes;