import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Statistic, List, Tag, Progress, Space } from 'antd';
import { AlertCircle, CheckCircle, Clock, Activity } from 'lucide-react';
import '../../assets/styles/Dashboard/Dashboard.css';

const { Title, Text } = Typography;

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [productionPhases, setProductionPhases] = useState([]);

  useEffect(() => {
    setIncidents([
      { id: 1, title: 'Fallo en la máquina de corte', status: 'En Espera', priority: 'Alta' },
      { id: 2, title: 'Defecto en el ensamblaje de componentes', status: 'En Progreso', priority: 'Media' },
      { id: 3, title: 'Problema en la inspección de calidad', status: 'Resuelto', priority: 'Baja' },
    ]);

    setProductionPhases([
      { id: 1, name: 'Preparación y Configuración', progress: 75 },
      { id: 2, name: 'Ensamblaje de Componentes', progress: 50 },
      { id: 3, name: 'Inspección de Calidad', progress: 25 },
      { id: 4, name: 'Empaque y Almacenaje', progress: 10 },
    ]);    
  }, []);

  return (
          <div>
            <Title level={3} style={{ marginBottom: 16, color: '#555' }}>
              Dashboard & Estadisticas
            </Title>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Total Incidents"
                    value={incidents.length}
                    prefix={<AlertCircle size={24} />}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Resolved Incidents"
                    value={incidents.filter((i) => i.status === 'Resuelto').length}
                    prefix={<CheckCircle size={24} />}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Average Resolution Time"
                    value={2.5}
                    suffix="hours"
                    prefix={<Clock size={24} />}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Production Efficiency"
                    value={89}
                    suffix="%"
                    prefix={<Activity size={24} />}
                  />
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Card title="Recent Incidents" bordered={false}>
                  <List
                    itemLayout="horizontal"
                    dataSource={incidents}
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