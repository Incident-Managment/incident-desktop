import React from 'react';
import {
  Card,
  Button,
  Alert,
  Row,
  Col,
  Statistic,
  Typography,
  Space,
  Layout,
  Divider,
} from 'antd';
import {
  BellOutlined,
  FileTextOutlined,
  PieChartOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import '../../assets/styles/Dashboard/Dashboard.css';

const { Title, Text } = Typography;
const { Content } = Layout;

export default function Dashboard() {
  return (
    <Layout className="dashboard">
      <Content className="dashboard-content">
        <Title level={2} className="dashboard-title">
          Incident Management Dashboard
        </Title>

        <Row gutter={[16, 16]} className="dashboard-stats">
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable>
              <Statistic
                title={<Text className="stat-title">Total Incidents</Text>}
                value={245}
                prefix={<FileTextOutlined style={{ color: '#3f8600' }} />}
                valueStyle={{ color: '#3f8600', fontSize: '24px' }}
              />
              <Divider />
              <div className="stat-change">
                <ArrowUpOutlined style={{ color: '#3f8600' }} /> 20% from last month
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card hoverable>
              <Statistic
                title={<Text className="stat-title">Open Incidents</Text>}
                value={42}
                prefix={<BellOutlined style={{ color: '#cf1322' }} />}
                valueStyle={{ color: '#cf1322', fontSize: '24px' }}
              />
              <Divider />
              <div className="stat-change">
                <ArrowDownOutlined style={{ color: '#cf1322' }} /> 5% from last week
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card hoverable>
              <Statistic
                title={<Text className="stat-title">Avg. Resolution Time</Text>}
                value={3.2}
                suffix="days"
                prefix={<PieChartOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ color: '#1890ff', fontSize: '24px' }}
              />
              <Divider />
              <div className="stat-change">
                <ArrowDownOutlined style={{ color: '#1890ff' }} /> 1 day from last month
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card hoverable>
              <Statistic
                title={<Text className="stat-title">Critical Incidents</Text>}
                value={5}
                prefix={<BellOutlined style={{ color: '#cf1322' }} />}
                valueStyle={{ color: '#cf1322', fontSize: '24px' }}
              />
              <Divider />
              <div className="stat-change">
                <ArrowUpOutlined style={{ color: '#cf1322' }} /> 2 from yesterday
              </div>
            </Card>
          </Col>
        </Row>

        <div className="dashboard-header">
          <Title level={3}>Recent Incidents</Title>
          <Button type="primary" icon={<PlusOutlined />} size="large" className="add-button">
            New Incident
          </Button>
        </div>

        <Space direction="vertical" className="dashboard-alerts" size="large">
          <Alert
            message={<Text strong>Network Outage</Text>}
            description={<Text>Critical - Reported 2 hours ago</Text>}
            type="error"
            showIcon
          />
          <Alert
            message={<Text strong>Database Performance Issues</Text>}
            description={<Text>High - Reported 5 hours ago</Text>}
            type="warning"
            showIcon
          />
          <Alert
            message={<Text strong>User Authentication Errors</Text>}
            description={<Text>Medium - Reported 1 day ago</Text>}
            type="info"
            showIcon
          />
        </Space>

        <div className="dashboard-footer">
          <Button type="link" size="large" className="view-all-button">
            View all incidents →
          </Button>
        </div>
      </Content>
    </Layout>
  );
}