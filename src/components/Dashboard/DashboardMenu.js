import React from 'react';
import { Menu } from 'antd';
import { Home, AlertCircle, BarChart2, Users, UserCog, Cog, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardMenu = ({ selectedMenu, setSelectedMenu }) => {
  const menuItems = [
    {
      key: '1',
      icon: <Home size={20} />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: '2',
      icon: <AlertCircle size={20} />,
      label: <Link to="/dashboard/incidents">Incidentes</Link>,
    },
    {
      key: '3',
      icon: <BarChart2 size={20} />,
      label: <Link to="/dashboard/production">Produccion</Link>,
    },
    {
      key: '7',
      icon: <Cog size={20} />,
      label: <Link to="/dashboard/company-machines">Maquinas</Link>,
    },
    {
      key: '4',
      icon: <UserCog size={20} />,
      label: <Link to="/dashboard/users-managment">Usuarios Globales</Link>,
    },
    {
      key: '5',
      icon: <Users size={20} />,
      label: <Link to="/dashboard/user-profile">Perfil</Link>,
    },
    {
      key: '6',
      icon: <Newspaper size={20} />,
      label: <Link to="/dashboard/reports">Reportes</Link>,
    }
  ];

  return (
    <Menu
      mode="inline"
      onSelect={({ key }) => setSelectedMenu(key)}
      style={{ borderRight: 0 }}
      items={menuItems}
    />
  );
};

export default DashboardMenu;