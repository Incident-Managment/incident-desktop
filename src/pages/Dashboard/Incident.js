import React, { useState } from 'react';
import { Table, Tag, Typography, Space, Input, Select, Drawer, List, Tooltip, Button, DatePicker } from 'antd';
import { formatDistanceToNow, isAfter, isBefore } from 'date-fns';
import { FileText, UserCheck, Ban, MessageCircle } from 'lucide-react';
import { useIncidents } from '../../hooks/IncidentsHooks/Incidents.hooks';
import AssignTaskPopover from '../../components/Dashboard/Options';
import CancelIncidentModal from '../../components/Incidents/cancelIncidents';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

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
    case 'Cancelado': return 'red';
    default: return 'yellow';
  }
};

export default function Incidents() {
  const {
    incidents,
    drawerVisible,
    statusHistory,
    handleIncidentClick,
    closeDrawer,
    handleCancelIncident,
    cancelModalVisible,
    setCancelModalVisible,
    techniqueComments,
    handleTechniqueCommentsClick,
    closeTechniqueDrawer,
  } = useIncidents();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterDateRange, setFilterDateRange] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [commentsDrawerVisible, setCommentsDrawerVisible] = useState(false);

  const handleSearch = (value) => setSearchTerm(value);
  const handleFilterChange = (value) => setFilterStatus(value);
  const handlePriorityChange = (value) => setFilterPriority(value);
  const handleDateRangeChange = (dates) => setFilterDateRange(dates || []);
  const handleYearChange = (year) => setSelectedYear(year);

  const openDrawer = (incidentId) => {
    setSelectedIncident(incidentId);
    handleIncidentClick(incidentId);
  };

  const openCancelModal = (incidentId) => {
    setSelectedIncident(incidentId);
    setCancelModalVisible(true);
  };

  const confirmCancel = (incidentId, comments) => {
    const cachedUser = localStorage.getItem('user');
    if (!cachedUser) {
      console.error('User data not found in cache');
      return;
    }
    const parsedUser = JSON.parse(cachedUser);
    const userId = parsedUser.user.id;

    if (incidentId) {
      handleCancelIncident({ incident_id: incidentId, comments, user_id: userId });
      setCancelModalVisible(false);
    }
  };

  const openCommentsDrawer = (incidentId) => {
    setSelectedIncident(incidentId);
    handleTechniqueCommentsClick(incidentId);
    setCommentsDrawerVisible(true);
  };

  const closeCommentsDrawer = () => {
    closeTechniqueDrawer();
    setCommentsDrawerVisible(false);
  };

  const availableYears = [...new Set(incidents.map((incident) => new Date(incident.creation_date).getFullYear().toString()))].sort((a, b) => b - a);

  const filteredIncidents = incidents
    .filter((incident) => {
      const incidentYear = new Date(incident.creation_date).getFullYear().toString();
      const matchesYear = incidentYear === selectedYear;
      const matchesSearchTerm = incident.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus ? incident.status === filterStatus : true;
      const matchesPriority = filterPriority ? incident.priority === filterPriority : true;
      const matchesDateRange = (() => {
        if (!filterDateRange.length) return true;
        const incidentDate = new Date(incident.creation_date);
        return isAfter(incidentDate, filterDateRange[0]) && isBefore(incidentDate, filterDateRange[1]);
      })();
      return matchesYear && matchesSearchTerm && matchesStatus && matchesPriority && matchesDateRange;
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
      title: 'Operador',
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
      render: (date) => {
        const adjustedDate = new Date(date);
        adjustedDate.setHours(adjustedDate.getHours() + 7);
        return <Text>{formatDistanceToNow(adjustedDate, { addSuffix: true })}</Text>;
      },
    },
    {
      title: 'Tecnico Asignado',
      dataIndex: 'assigned_task',
      key: 'assigned_task',
      render: (assignedTask) => <Text>{assignedTask ? assignedTask.assigned_user_name : 'Sin asignar'}</Text>,
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
          {record.status === 'En Espera' && (
            <Tooltip title="Cancelar Incidencia">
              <Button type="text" icon={<Ban size={18} />} onClick={() => openCancelModal(record.id)} />
            </Tooltip>
          )}
          {record.commentstechnique !== null && 
            (
              <Tooltip title="Ver comentarios del técnico">
                <Button type="text" icon={<MessageCircle size={18} />} onClick={() => openCommentsDrawer(record.id)} />
              </Tooltip>
            )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      <Title level={1} style={{ marginBottom: '2rem' }}>Incidencias</Title>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <Search placeholder="Buscar incidencias" onSearch={handleSearch} style={{ width: '200px' }} />
        <Select placeholder="Seleccionar año" onChange={handleYearChange} value={selectedYear} style={{ width: '200px' }}>
          {availableYears.map((year) => (
            <Option key={year} value={year}>{year}</Option>
          ))}
        </Select>
        <Select placeholder="Filtrar por estado" onChange={handleFilterChange} style={{ width: '200px' }}>
          <Option value="">Todos</Option>
          <Option value="En Espera">En Espera</Option>
          <Option value="En Progreso">En Progreso</Option>
          <Option value="Resuelto">Resuelto</Option>
        </Select>
        <Select placeholder="Filtrar por prioridad" onChange={handlePriorityChange} style={{ width: '200px' }}>
          <Option value="">Todas</Option>
          <Option value="Alta">Alta</Option>
          <Option value="Media">Media</Option>
          <Option value="Baja">Baja</Option>
        </Select>
        <RangePicker placeholder={['Fecha inicio', 'Fecha fin']} onChange={handleDateRangeChange} style={{ width: '400px' }} />
      </div>
      <Table
        columns={columns}
        dataSource={filteredIncidents}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 1200 }}
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
      <Drawer
        title="Comentarios del Técnico"
        placement="right"
        onClose={closeCommentsDrawer}
        open={commentsDrawerVisible}
        width={400}
      >
          <List
            dataSource={techniqueComments}
            renderItem={(item) => (
              <List.Item>
                <Text>{item.key}</Text>
              </List.Item>
            )}
          />
      </Drawer>
      <CancelIncidentModal
        visible={cancelModalVisible}
        onCancel={() => setCancelModalVisible(false)}
        onConfirm={confirmCancel}
        selectedIncident={selectedIncident}
      />
    </div>
  );
}