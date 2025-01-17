import React, { useState } from 'react';
import { Layout, Avatar, Typography } from 'antd';
import { User } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import DashboardMenu from './DashboardMenu';
import '../../assets/styles/Dashboard/Dashboard.css';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const MainLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState('1');

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Sider width={240} theme="light">
        <div
          style={{
            height: 64,
            margin: '16px',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 8,
          }}
        />
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
          <Title level={4} style={{ margin: 0 }}>
            Professional Dashboard
          </Title>
          <Avatar size={40} style={{ backgroundColor: '#87d068' }} icon={<User />} />
        </Header>
        <Content style={{ margin: '24px 16px', background: '#fff', borderRadius: 8, padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;