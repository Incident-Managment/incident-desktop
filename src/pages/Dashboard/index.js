import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import IncidentsPage from './Incident';
import UserProfile from './UserProfile';
import MainLayout from '../../components/Dashboard/MainLayout';

const DashboardRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="incidents" element={<IncidentsPage />} />
          <Route path="user-profile" element={<UserProfile />} />
        </Route>
      </Routes>
  );
};

export default DashboardRoutes;