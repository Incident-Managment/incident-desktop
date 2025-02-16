import React, { useState } from 'react';
import { Typography, Table, Button, Space, Input } from 'antd';
import { Plus, MoreHorizontal } from 'lucide-react';
import { useGetUsers } from '../../hooks/UsersHooks/users.hooks';
import CreateUserModal from '../../components/Users/createUsers'; // Import the modal
import { formatDate } from '../../utils/date-format';
const { Title } = Typography;

const UserManagement = () => {
  const { data: users, isLoading, error } = useGetUsers();
  const [setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Resetear
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <span>{filtered ? '🔍' : '🔍'}</span>,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  });

  const columns = [
    {
      title: 'Nombre Completo',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <div
            style={{
              backgroundColor: '#f0f0f0',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}
          >
            {record.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </div>
          <span>{text}</span>
        </Space>
      ),
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Correo Electrónico',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Rol de Usuario',
      dataIndex: ['role', 'name'],
      key: 'role',
      render: (text) => (
        <span
          style={{
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            color: 'blue',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '12px',
          }}
        >
          {text}
        </span>
      ),
      ...getColumnSearchProps('role.name'),
    },
    {
      title: 'Fecha de Creación',
      dataIndex: 'creation_date',
      key: 'creation_date',
      render: (text) => formatDate(text),
      sorter: (a, b) => new Date(a.creation_date) - new Date(b.creation_date),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => <Button icon={<MoreHorizontal size={16} />} />,
    },
  ];

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los datos</div>;

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2}>Gestión de Usuarios</Title>
        <Button type="primary" icon={<Plus size={16} />} onClick={() => setIsModalOpen(true)}>
          Nuevo Usuario
        </Button>
      </div>
      <Table dataSource={users} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateUser={(user) => {
          // Handle user creation logic here
          setIsModalOpen(false);
        }}
      />
    </Space>
  );
};

export default UserManagement;