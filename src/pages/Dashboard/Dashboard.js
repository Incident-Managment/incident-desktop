'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Statistic, List, Tag, Progress, Space } from 'antd';
import { AlertCircle, CheckCircle, Clock, Activity } from 'lucide-react';
import '../../assets/styles/Dashboard/Dashboard.css';
import { useCountIncidentsByCompany } from '../../hooks/DashboardHooks/counts.hooks';
import { useIncidents } from '../../hooks/IncidentsHooks/Incidents.hooks';
const { Title, Text } = Typography;

const Dashboard = () => {
  const [productionPhases, setProductionPhases] = useState([]);
  const { count, resolvedCount, averageResolutionTime, incidentEfficiency, loading, error } = useCountIncidentsByCompany();
  const { recentIncidents } = useIncidents();

  useEffect(() => {
    setProductionPhases([
      { id: 1, name: 'Preparación y Configuración', progress: 75 },
      { id: 2, name: 'Ensamblaje de Componentes', progress: 50 },
      { id: 3, name: 'Inspección de Calidad', progress: 25 },
      { id: 4, name: 'Empaque y Almacenaje', progress: 10 },
    ]);
  }, []);

  const cardStyle = {
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px 0 rgba(0,0,0,0.02)',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
  };

  const cardContentStyle = {
    padding: '20px',
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: '2rem', marginLeft: "15px" }}>Dashboard & Estadisticas</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card style={cardStyle} bodyStyle={cardContentStyle} hoverable>
            <Statistic
              title={<Text strong>Total Incidents</Text>}
              value={loading ? 'Loading...' : error ? 'Error' : count}
              prefix={<AlertCircle size={24} style={{ marginRight: '8px', color: '#1890ff' }} />}
              valueStyle={{ color: '#262626' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card style={cardStyle} bodyStyle={cardContentStyle} hoverable>
            <Statistic
              title={<Text strong>Resolved Incidents</Text>}
              value={loading ? 'Loading...' : error ? 'Error' : resolvedCount}
              prefix={<CheckCircle size={24} style={{ marginRight: '8px', color: '#52c41a' }} />}
              valueStyle={{ color: '#262626' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card style={cardStyle} bodyStyle={cardContentStyle} hoverable>
            <Statistic
              title={<Text strong>Average Resolution Time</Text>}
              value={loading ? 'Loading...' : error ? 'Error' : averageResolutionTime.toFixed(2)}
              suffix="hours"
              prefix={<Clock size={24} style={{ marginRight: '8px', color: '#faad14' }} />}
              valueStyle={{ color: '#262626' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card style={cardStyle} bodyStyle={cardContentStyle} hoverable>
            <Statistic
              title={<Text strong>Production Efficiency</Text>}
              value={loading ? 'Loading...' : error ? 'Error' : incidentEfficiency.toFixed(2)}
              suffix="%"
              prefix={<Activity size={24} style={{ marginRight: '8px', color: '#722ed1' }} />}
              valueStyle={{ color: '#262626' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="Recent Incidents" bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={recentIncidents}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<Text strong>{item.title}</Text>}
                    description={
                      <Space>
                        <Tag color={item.status === 'Resuelto' ? 'green' : item.status === 'En Progreso' ? 'blue' : 'gold'}>
                          {item.status}
                        </Tag>
                        <Tag color={item.priority === 'Alta' ? 'red' : item.priority === 'Media' ? 'orange' : 'blue'}>
                          {item.priority}
                        </Tag>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Production Phases" bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={productionPhases}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<Text strong>{item.name}</Text>}
                    description={<Progress percent={item.progress} status="active" />}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;