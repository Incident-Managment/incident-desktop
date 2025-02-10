import React from 'react';
import { Card, Typography, Row, Col, Space, Tag, Drawer, List, Button } from 'antd';
import { formatDistanceToNow } from 'date-fns';
import { AlertCircle, CheckCircle2, Clock, Cog, FileText, HardDrive, User } from 'lucide-react';
import { useIncidents } from '../../hooks/IncidentsHooks/Incidents.hooks';
import AssignTaskPopover from '../../components/Dashboard/Options';

const { Title, Text } = Typography;

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
  const {
    incidents,
    drawerVisible,
    statusHistory,
    selectedIncident,
    handleIncidentClick,
    closeDrawer,
  } = useIncidents();

  return (
    <div style={{ minHeight: '100vh' }}>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Tag color={getPriorityColor(incident.priority)}>{incident.priority}</Tag>
                    <Tag color={getStatusColor(incident.status)}>{incident.status}</Tag>
                  </div>
                  <Title level={4}>{incident.title}</Title>
                  <Text type="secondary" style={{ marginBottom: '1rem' }}>{incident.description}</Text>
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
                  {incident.assigned_task ? (
                    <Text type="secondary">Tarea asignada a: {incident.assigned_task.assigned_user_id}</Text>
                  ) : (
                    <div onClick={(e) => e.stopPropagation()}>
                      <AssignTaskPopover incidentId={incident.id} companyId={incident.company_id} />
                    </div>
                  )}
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