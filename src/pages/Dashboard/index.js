import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import IncidentsPage from './Incident';
import UserProfile from './UserProfile';
import CompanyMachines from './CompanyMachines';
import MainLayout from '../../components/Dashboard/MainLayout';
import UserManagment from './UsersManagment';
import Production from './Production';
import Reports from './Reports';
import Companies from './Companies';
import UsersByCompany from './UsersByCompany';
import NotFound from '../NotFound';

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
          <Route path="Reports" element={<Reports />} />
          <Route path="users-by-company" element={<UsersByCompany />} />
          <Route path="companies" element={<Companies />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
};

export default DashboardRoutes;