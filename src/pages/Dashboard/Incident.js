import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Input, Button, Typography } from 'antd';
import { Search, PlusCircle } from 'lucide-react';

const { Title } = Typography;
const { Column } = Table;

const IncidentsPage = () => {
  const [incidents, setIncidents] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setIncidents([
      { id: 1, title: 'Fallo en la máquina de corte', status: 'En Espera', priority: 'Alta', assignedTo: 'Jose Ramirez', createdAt: '2025-01-16 10:00:00' },
      { id: 2, title: 'Defecto en el ensamblaje de componentes', status: 'En Progreso', priority: 'Media', assignedTo: 'Hector Zamorano', createdAt: '2025-01-16 11:00:00' },
      { id: 3, title: 'Problema en la inspección de calidad', status: 'Resuelto', priority: 'Baja', assignedTo: 'Jorge Padilla', createdAt: '2025-01-16 12:00:00' },
    ]);
  }, []);

  const filteredIncidents = incidents.filter((incident) =>
    incident.title.toLowerCase().includes(searchText.toLowerCase()) ||
    incident.assignedTo.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Title level={3}>Incidents</Title>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search incidents"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<Search size={18} />}
        />
        <Button type="primary" icon={<PlusCircle size={18} />}>New Incident</Button>
      </Space>
      <Table dataSource={filteredIncidents} rowKey="id" bordered>
        <Column title="Title" dataIndex="title" key="title" />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(status) => (
            <Tag color={status === 'Resuelto' ? 'green' : status === 'En Progreso' ? 'blue' : 'gold'}>
              {status}
            </Tag>
          )}
        />
        <Column title="Priority" dataIndex="priority" key="priority" />
        <Column title="Assigned To" dataIndex="assignedTo" key="assignedTo" />
        <Column title="Created At" dataIndex="createdAt" key="createdAt" />
      </Table>
    </div>
  );
};

export default IncidentsPage;