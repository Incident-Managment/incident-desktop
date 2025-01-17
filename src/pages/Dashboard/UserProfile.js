import React from 'react';
import { Typography, Descriptions } from 'antd';

const { Title } = Typography;

const sampleUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'Administrator',
};

const UserProfile = ({ user = sampleUser }) => {
  return (
    <div>
      <Title level={3}>User Profile</Title>
      <Descriptions bordered>
        <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default UserProfile;