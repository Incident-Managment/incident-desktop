import React, { useState } from 'react';
import { Table, Tag, Typography, Space, Input, Select, Drawer, List, Tooltip, Button } from 'antd';
import { formatDistanceToNow, subDays, subMonths, isAfter } from 'date-fns';
import { AlertCircle, CheckCircle2, FileText, UserCheck } from 'lucide-react';
import { useIncidents } from '../../hooks/IncidentsHooks/Incidents.hooks';
import AssignTaskPopover from '../../components/Dashboard/Options';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Alta': return 'red';
    case 'Media': return 'orange';
    default: return 'green';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'En Espera': return 'yellow';
    case 'En Progreso': return 'blue';
    case 'Resuelto': return 'green';
    default: return 'yellow';
  }
};

export default function Incidents() {
  const { incidents, drawerVisible, statusHistory, handleIncidentClick, closeDrawer } = useIncidents();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterDateRange, setFilterDateRange] = useState('');
  const [, setSelectedIncident] = useState(null);

  const handleSearch = (value) => setSearchTerm(value);
  const handleFilterChange = (value) => setFilterStatus(value);
  const handlePriorityChange = (value) => setFilterPriority(value);
  const handleDateRangeChange = (value) => setFilterDateRange(value);

  const openDrawer = (incidentId) => {
    setSelectedIncident(incidentId);
    handleIncidentClick(incidentId);
  };

  const filteredIncidents = incidents
    .filter((incident) => {
      const matchesSearchTerm = incident.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus ? incident.status === filterStatus : true;
      const matchesPriority = filterPriority ? incident.priority === filterPriority : true;
      const matchesDateRange = (() => {
        if (!filterDateRange) return true;
        const incidentDate = new Date(incident.creation_date);
        switch (filterDateRange) {
          case 'today':
            return isAfter(incidentDate, subDays(new Date(), 1));
          case 'yesterday':
            return isAfter(incidentDate, subDays(new Date(), 2)) && !isAfter(incidentDate, subDays(new Date(), 1));
          case 'lastMonth':
            return isAfter(incidentDate, subMonths(new Date(), 1));
          default:
            return true;
        }
      })();
      return matchesSearchTerm && matchesStatus && matchesPriority && matchesDateRange;
    })
    .sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));

  const columns = [
    {
      title: 'Prioridad',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => <Tag color={getPriorityColor(priority)}>{priority}</Tag>,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Usuario',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Máquina',
      dataIndex: 'machine',
      key: 'machine',
    },
    {
      title: 'Categoría',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Fase de Producción',
      dataIndex: 'production_phase',
      key: 'production_phase',
    },
    {
      title: 'Creado',
      dataIndex: 'creation_date',
      key: 'creation_date',
      render: (date) => <Text>{formatDistanceToNow(new Date(date), { addSuffix: true })}</Text>,
    },
    {
      title: 'Última Actualización',
      dataIndex: 'update_date',
      key: 'update_date',
      render: (date, record) => (
        <Space>
          {record.status === 'Resuelto' ? <CheckCircle2 size={16} color="green" /> : <AlertCircle size={16} color="orange" />}
          <Text>{formatDistanceToNow(new Date(date), { addSuffix: true })}</Text>
        </Space>
      ),
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record) => (
        <Space>
          {record.status === 'En Espera' && !record.assigned_task && (
            <Tooltip title="Asignar tarea">
              <AssignTaskPopover incidentId={record.id} companyId={record.company_id}>
                <Button type="text" icon={<UserCheck size={18} />} />
              </AssignTaskPopover>
            </Tooltip>
          )}
          <Tooltip title="Ver historial">
            <Button type="text" icon={<FileText size={18} />} onClick={() => openDrawer(record.id)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      <Title level={1} style={{ marginBottom: '2rem' }}>Incidencias</Title>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <Search placeholder="Buscar incidencias" onSearch={handleSearch} style={{ width: 200 }} />
        <Select placeholder="Filtrar por estado" onChange={handleFilterChange} style={{ width: 200 }}>
          <Option value="">Todos</Option>
          <Option value="En Espera">En Espera</Option>
          <Option value="En Progreso">En Progreso</Option>
          <Option value="Resuelto">Resuelto</Option>
        </Select>
        <Select placeholder="Filtrar por prioridad" onChange={handlePriorityChange} style={{ width: 200 }}>
          <Option value="">Todas</Option>
          <Option value="Alta">Alta</Option>
          <Option value="Media">Media</Option>
          <Option value="Baja">Baja</Option>
        </Select>
        <Select placeholder="Filtrar por fecha" onChange={handleDateRangeChange} style={{ width: 200 }}>
          <Option value="">Todas</Option>
          <Option value="today">Hoy</Option>
          <Option value="yesterday">Ayer</Option>
          <Option value="lastMonth">Último Mes</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={filteredIncidents}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
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
                title={`De: ${item.previous_status?.name || 'Creación'} a ${item.new_status.name}`}
                description={<Text>{item.comment}</Text>}
              />
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );
}