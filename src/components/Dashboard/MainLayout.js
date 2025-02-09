import React, { useState, useEffect } from 'react';
import { Layout, Avatar, Typography } from 'antd';
import { User } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import DashboardMenu from './DashboardMenu';
import '../../assets/styles/Dashboard/Dashboard.css';
import Image from '../../assets/images/techsolutions.webp';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const MainLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState('1');
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      const parsedUser = JSON.parse(cachedUser);
      if (parsedUser.user && parsedUser.user.company && parsedUser.user.company.name) {
        setCompanyName(parsedUser.user.company.name);
      }
    }
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Sider width={240} theme="light">
        <div
          style={{
            height: 64,
            margin: '16px',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={Image} alt="Tech Solutions Logo" style={{ width: '75%', height: 'auto', borderRadius: 8 }} />
        </div>
        <DashboardMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      </Sider>
      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Title level={6} style={{ margin: 0 }}>
            {companyName}
          </Title>
          <Avatar size={40} style={{ backgroundColor: '#1890ff' }} icon={<User />} />
        </Header>
        <Content style={{ margin: '24px 16px', background: '#fff', borderRadius: 8, padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;