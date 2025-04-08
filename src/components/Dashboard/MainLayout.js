/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { Layout, Avatar, Typography, Popover, Button, Drawer, Tooltip } from 'antd';
import { Outlet } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import DashboardMenu from './DashboardMenu';
import useUserProfile from '../../hooks/DashboardHooks/UserProfile.hooks';
import Image from '../../assets/images/techsolutions.webp';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const MainLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState('1');
  const [companyName, setCompanyName] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { user } = useUserProfile();

  useEffect(() => {
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      const parsedUser = JSON.parse(cachedUser);
      if (parsedUser.user && parsedUser.user.company && parsedUser.user.company.name) {
        setCompanyName(parsedUser.user.company.name);
      }
    }

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial screen size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  const popoverContent = (
    <div>
      <p>{user?.name}</p>
      <Button type="primary" onClick={handleLogout}>Cerrar Sesion</Button>
    </div>
  );

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <Layout css={css`min-height: 100vh; background: #f0f2f5;`}>
      <Sider
        width={240}
        theme="light"
        css={css`
          position: fixed;
          height: 100vh;
          overflow: auto;
          @media (max-width: 768px) {
            display: none;
          }
        `}
      >
        <div
          css={css`
            height: 64px;
            margin: 16px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <img src={Image} alt="Tech Solutions Logo" css={css`width: 75%; height: auto; border-radius: 8px;`} />
        </div>
        <DashboardMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      </Sider>
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={toggleDrawer}
        visible={drawerVisible}
        css={css`
          @media (min-width: 769px) {
            display: none;
          }
        `}
      >
        <DashboardMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      </Drawer>

      <Layout
        css={css`
          margin-left: ${isSmallScreen ? '0' : '240px'};
          transition: margin-left 0.3s ease;
        `}
      >
        <Header
          css={css`
            background: #fff;
            padding: 0 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
          `}
        >
          <Tooltip title={isSmallScreen ? companyName : ''}>
            <Title level={6} css={css`margin-top: 2;`}>
              {isSmallScreen && companyName.length > 10 ? `${companyName.substring(0, 10)}...` : companyName}
            </Title>
          </Tooltip>
          <div css={css`display: flex; align-items: center;`}>
            <Popover content={popoverContent} title="Info">
              <Avatar
                size={40}
                css={css`background-color: #1890ff; cursor: pointer; margin-right: 16px;`}
                icon={
                  <div
                    style={{
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {user?.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </div>
                }
              />
            </Popover>
            <Button
              type="primary"
              icon={<MenuOutlined />}
              onClick={toggleDrawer}
              css={css`
                @media (min-width: 769px) {
                  display: none;
                }
              `}
            />
          </div>
        </Header>
        <Content css={css`margin: 24px 16px; background: #fff; border-radius: 8px; padding: 24px;`}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;