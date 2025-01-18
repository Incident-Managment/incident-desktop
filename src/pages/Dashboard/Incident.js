import React, { useState, useEffect } from 'react';
import { Card, Typography, Row, Col, Space, Tag, Drawer, List } from 'antd';
import { formatDistanceToNow } from 'date-fns';
import { AlertCircle, CheckCircle2, Clock, Cog, FileText, HardDrive, User } from 'lucide-react';
import { getIncidentsByCompany, getIncidentStatusHistory } from '../../services/incident.services';

const { Title, Text } = Typography;

// Función para obtener el color de la prioridad
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Alta':
      return 'red';
    case 'Media':
      return 'orange';
    default:
      return 'green';
  }
};

// Función para obtener el color del estado
const getStatusColor = (status) => {
  switch (status) {
    case 'En Espera':
      return 'gray';
    case 'En Progreso':
      return 'blue';
    case 'Resuelto':
      return 'green';
    default:
      return 'gray';
  }
};

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [statusHistory, setStatusHistory] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const cachedUser = localStorage.getItem('user');
        if (!cachedUser) {
          throw new Error('User data not found in cache');
        }
        const parsedUser = JSON.parse(cachedUser);
        console.log('Parsed User:', parsedUser); // Log para verificar los datos del usuario
        if (!parsedUser.user || !parsedUser.user.company || !parsedUser.user.company.id) {
          throw new Error('Invalid company data in cache');
        }
        const companyId = parsedUser.user.company.id;
        console.log('Company ID:', companyId); // Log para verificar el companyId
  
        const response = await getIncidentsByCompany(companyId);
        console.log('Incidents Response:', response); // Log para verificar la respuesta de la API
        const mappedIncidents = response.map((incident) => ({
          id: incident.id,
          title: incident.title,
          description: incident.description,
          status: incident.status.name,
          priority: incident.priority.name,
          category: incident.category.name,
          user: incident.user.name,
          machine: incident.machine.name,
          production_phase: incident.production_phase.name,
          creation_date: incident.creation_date,
          update_date: incident.update_date,
        }));
        setIncidents(mappedIncidents);
      } catch (error) {
        console.error('Error fetching incidents:', error);
      }
    };
  
    fetchIncidents();
  }, []);
  
  const handleIncidentClick = async (incidentId) => {
    try {
      const history = await getIncidentStatusHistory(incidentId);
      setStatusHistory(history);
      setSelectedIncident(incidentId);
      setDrawerVisible(true);
    } catch (error) {
      console.error('Error fetching incident status history:', error);
    }
  };
  
  const closeDrawer = () => {
    setDrawerVisible(false);
    setStatusHistory([]);
    setSelectedIncident(null);
  };
  
  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2} style={{ marginBottom: '2rem' }}>Incidencias</Title>
        <Row gutter={[16, 16]} style={{ display: 'flex', flexWrap: 'wrap' }}>
          {incidents.map((incident) => (
            <Col xs={24} sm={12} lg={8} key={incident.id} style={{ display: 'flex' }}>
              <Card
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                onClick={() => handleIncidentClick(incident.id)}
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  {/* Prioridad y estado */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Tag color={getPriorityColor(incident.priority)}>{incident.priority}</Tag>
                    <Tag color={getStatusColor(incident.status)}>{incident.status}</Tag>
                  </div>
                  {/* Título */}
                  <Title level={4}>{incident.title}</Title>
                  {/* Descripción */}
                  <Text type="secondary" style={{ marginBottom: '1rem' }}>{incident.description}</Text>
                  {/* Detalles adicionales */}
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Space>
                        <User size={16} />
                        <Text type="secondary">{incident.user}</Text>
                      </Space>
                    </Col>
                    <Col span={12}>
                      <Space>
                        <HardDrive size={16} />
                        <Text type="secondary">{incident.machine}</Text>
                      </Space>
                    </Col>
                    <Col span={12}>
                      <Space>
                        <Cog size={16} />
                        <Text type="secondary">{incident.category}</Text>
                      </Space>
                    </Col>
                    <Col span={12}>
                      <Space>
                        <FileText size={16} />
                        <Text type="secondary">{incident.production_phase.split(':')[0]}</Text>
                      </Space>
                    </Col>
                  </Row>
                  {/* Fechas */}
                  <Row justify="space-between" align="middle">
                    <Space>
                      <Clock size={16} />
                      <Text type="secondary">
                        {formatDistanceToNow(new Date(incident.creation_date), { addSuffix: true })}
                      </Text>
                    </Space>
                    <Space>
                      {incident.status === 'Resuelto' ? (
                        <CheckCircle2 size={16} color="green" />
                      ) : (
                        <AlertCircle size={16} color="orange" />
                      )}
                      <Text type="secondary">
                        {formatDistanceToNow(new Date(incident.update_date), { addSuffix: true })}
                      </Text>
                    </Space>
                  </Row>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
        <Drawer
          title="Historial de Estado de la Incidencia"
          placement="right"
          onClose={closeDrawer}
          open={drawerVisible}
          width={400}
        >
          <List
            dataSource={statusHistory}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`De: ${item.previous_status.name} a ${item.new_status.name}`}
                  description={
                    <>
                      <Text>{item.comment}</Text>
                      <br />
                      <Text type="secondary">{`Actualizado por: ${item.user.name}`}</Text>
                      <br />
                      <Text type="secondary">{formatDistanceToNow(new Date(item.update_date), { addSuffix: true })}</Text>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Drawer>
      </div>
    </div>
  );
}