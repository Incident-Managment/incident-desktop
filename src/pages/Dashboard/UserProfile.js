import React from 'react';
import { Typography, Descriptions, Row, Col, Card, Tooltip, Spin, Alert, Avatar, Button } from 'antd';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import useUserProfile from '../../hooks/DashboardHooks/UserProfile.hooks';

const { Title, Text } = Typography;

const UserProfile = () => {
    const { user, loading, error } = useUserProfile();

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
                <Col span={6}>
                    <Avatar
                        size={100}
                        src={user.avatar || <UserOutlined />}
                        style={{
                            border: '4px solid #1890ff',
                            backgroundColor: '#f0f0f0',
                        }}
                    />
                </Col>
                <Col span={18}>
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
                    label="Company"
                >
                    <Text>{user.company.name}</Text>
                </Descriptions.Item>
                <Descriptions.Item
                    label="Account Created"
                >
                    <Text>{new Date(user.creation_date).toLocaleDateString()}</Text>
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