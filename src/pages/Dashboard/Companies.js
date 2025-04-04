import React, { useState } from 'react';
import { Table, Space, Button, Spin, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useGetCompaniesGlobal } from '../../hooks/CompaniesHooks/companies.hooks';
import CreateCompaniesModal from '../../components/Companies/createCompaniesModal';
import EditCompaniesModal from '../../components/Companies/editCompaniesModal';

const CompaniesList = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { data: companies, isLoading: loading, isError, error } = useGetCompaniesGlobal();
  const { Title } = Typography;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Dirección',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Teléfono',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setIsEditModalVisible(true);
  };

  const handleAdd = () => {
    setIsCreateModalVisible(true);
  };

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: window.innerWidth < 768 ? "column" : "row",
          justifyContent: "space-between",
          alignItems: window.innerWidth < 768 ? "flex-start" : "center",
          gap: "1rem",
        }}
      >
        <Title style={{ marginBottom: window.innerWidth < 768 ? "1rem" : "0" }}>
          Empresas
        </Title>
        <Button
          type="primary"
          style={{ marginTop: window.innerWidth < 768 ? 0 : 15 }}
          onClick={handleAdd}
        >
          Añadir Empresa
        </Button>
      </div>
      
      <Spin spinning={loading}>
        <Table
          style={{ marginTop: '2rem' }}
          columns={columns}
          dataSource={companies || []}
          rowKey="id"
          pagination={pagination}
          onChange={(pagination) => setPagination(pagination)}
        />
      </Spin>

      <CreateCompaniesModal
        isVisible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
      />

      <EditCompaniesModal
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        company={selectedCompany}
      />
    </div>
  );
};

export default CompaniesList;