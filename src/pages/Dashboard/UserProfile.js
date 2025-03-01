import React, { useState, useEffect } from 'react';
import { Typography, Descriptions, Row, Col, Card, Tooltip, Spin, Alert, Avatar, Button } from 'antd';
import { MailOutlined, PhoneOutlined, UserOutlined, ClusterOutlined } from '@ant-design/icons';
import useUserProfile from '../../hooks/DashboardHooks/UserProfile.hooks';
import { formatDate } from '../../utils/date-format';
const { Title, Text } = Typography;

const UserProfile = () => {
    const { user, loading, error } = useUserProfile();
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Check initial screen size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return <Alert message="Error" description={error.message} type="error" showIcon />;
    }

    if (!user) {
        return null;
    }

    return (
        <Card
            style={{
                maxWidth: 800,
                margin: 'auto',
                marginTop: 40,
                borderRadius: 12,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
            }}
            bordered={false}
        >
            <Row gutter={[16, 16]} align="middle">
                <Col span={isSmallScreen ? 24 : 6} style={{ textAlign: isSmallScreen ? 'center' : 'left' }}>
                    <Avatar
                        size={100}
                        style={{
                            border: 'linear-gradient(135deg, #1890ff 0%, #1c39bb 100%)',
                            background: 'linear-gradient(135deg, #1890ff 0%, #1c39bb 100%)',
                        }}
                    >
                        <div
                            style={{
                                background: '#0000',
                                borderRadius: '50%',
                                width: 32,
                                height: 32,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 28,
                                color: '#fff',
                            }}
                        >
                            {user.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .toUpperCase()}
                        </div>
                    </Avatar>
                </Col>
                <Col span={isSmallScreen ? 24 : 18} style={{ textAlign: isSmallScreen ? 'center' : 'left' }}>
                    <Title level={2} style={{ marginBottom: 5 }}>
                        {user.name}
                    </Title>
                    <Text type="secondary" style={{ fontSize: 18 }}>
                        {user.role.name}
                    </Text>
                </Col>
            </Row>

            <Descriptions
                bordered
                column={1}
                style={{
                    marginTop: 20,
                    fontSize: 16,
                    backgroundColor: '#fafafa',
                    borderRadius: 8,
                    padding: '20px',
                }}
            >
                <Descriptions.Item
                    label={<><MailOutlined style={{ marginRight: 8 }} /> Email</>}
                >
                    <Text>{user.email}</Text>
                </Descriptions.Item>
                <Descriptions.Item
                    label={<><PhoneOutlined style={{ marginRight: 8 }} /> Phone</>}
                >
                    <Text>{user.phone_number}</Text>
                </Descriptions.Item>
                <Descriptions.Item
                    label={<><ClusterOutlined style={{ marginRight: 8 }} /> Company</>}
                >
                    <Text>{user.company.name}</Text>
                </Descriptions.Item>
                <Descriptions.Item
                    label={<><UserOutlined style={{ marginRight: 8 }} /> Account Created</>}
                >
                    <Text>{formatDate(user.creation_date)}</Text>
                </Descriptions.Item>
            </Descriptions>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                <Tooltip title="Edit Profile">
                    <Button
                        type="link"
                        style={{
                            fontSize: 16,
                            color: '#1890ff',
                            fontWeight: 'bold',
                            padding: 0,
                        }}
                    >
                        Edit Profile
                    </Button>
                </Tooltip>
                <Tooltip title="Change Password">
                    <Button
                        type="link"
                        style={{
                            fontSize: 16,
                            color: '#f5222d',
                            fontWeight: 'bold',
                            padding: 0,
                        }}
                    >
                        Change Password
                    </Button>
                </Tooltip>
            </div>
        </Card>
    );
};

export default UserProfile;