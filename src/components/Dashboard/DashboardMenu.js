import React from 'react';
import { Menu } from 'antd';
import { Home, AlertCircle, BarChart2, Users, UserCog, Cog, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardMenu = ({ selectedMenu, setSelectedMenu }) => {
  const cachedUser = localStorage.getItem('user');
  if (!cachedUser) {
    throw new Error('User data not found in cache');
  }
  const parsedUser = JSON.parse(cachedUser);
  if (!parsedUser.user || !parsedUser.user.company || !parsedUser.user.company.id || !parsedUser.user.email) {
    throw new Error('Invalid user data in cache');
  }
  const role_id = parsedUser.user.role.id;
  const allMenuItems = [
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
      key: '8',
      icon: <UserCog size={20} />,
      label: <Link to="/dashboard/users-by-company">Mis Usuarios</Link>,
    },
    {
      key: '4',
      icon: <UserCog size={20} />,
      label: <Link to="/dashboard/users-managment">Usuarios Globales</Link>,
    },
    {
      key: '6',
      icon: <Newspaper size={20} />,
      label: <Link to="/dashboard/reports">Reportes</Link>,
    },
    {
      key: '5',
      icon: <Users size={20} />,
      label: <Link to="/dashboard/user-profile">Perfil</Link>,
    },
    {
      key: '9',
      icon: <Users size={20} />,
      label: <Link to="/dashboard/companies">Empresas</Link>,
    },
  ];

  const filterMenuItems = (role_id) => {
    switch (role_id) {
      case 1:
        return allMenuItems;
      case 2:
        return allMenuItems.filter(item => !['4', '9'].includes(item.key));
      case 5:
        return allMenuItems.filter(item => item.key !== '4');
      case 3:
        return allMenuItems.filter(item => ['1', '2', '3', '7', '5'].includes(item.key));
      case 4:
        return allMenuItems.filter(item => ['4', '9'].includes(item.key));
        default:
        return [];
    }
  };

  const menuItems = filterMenuItems(role_id);

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