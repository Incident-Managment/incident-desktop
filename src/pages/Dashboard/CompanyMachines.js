import React, { useState, useEffect } from 'react';
import { Card, Typography, Row, Col, Space, Tag, Input, Select, Button, Divider } from 'antd';
import { HardDrive, Cog, User } from 'lucide-react';
import { getMachinesByCompany, getMachinesByType } from '../../services/company.machines';

const { Title, Text } = Typography;
const { Option } = Select;

const getMachineCategoryColor = (category) => {
  switch (category) {
    case 'Manufactura':
      return 'blue';
    case 'Mantenimiento':
      return 'green';
    default:
      return 'gray';
  }
};

const Machines = ({ companyId, typeId }) => {
  const [machines, setMachines] = useState([]);
  const [filteredMachines, setFilteredMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('');

  useEffect(() => {
    const fetchMachines = async () => {
      setLoading(true);
      setError(null);

      try {
        // Filtramos por companyId o typeId
        const result = companyId ? await getMachinesByCompany(companyId) : await getMachinesByType(typeId);
        setMachines(result);
        setFilteredMachines(result); // Inicialmente, mostramos todas las máquinas
      } catch (err) {
        setError('Error al cargar las máquinas');
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, [companyId, typeId]);

  const handleSearch = () => {
    // Filtrar por tipo, fase y nombre
    const filtered = machines.filter(machine => {
      const matchesType = selectedType ? machine.type.name === selectedType : true;
      const matchesPhase = selectedPhase ? machine.production_phases.name === selectedPhase : true;
      const matchesName = searchQuery ? machine.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
      return matchesType && matchesPhase && matchesName;
    });
    setFilteredMachines(filtered);
  };

  const handleClearFilters = () => {
    // Limpiar filtros y mostrar todas las máquinas
    setSearchQuery('');
    setSelectedType('');
    setSelectedPhase('');
    setFilteredMachines(machines); // Mostrar todas las máquinas
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2} style={{ marginBottom: '2rem', textAlign: 'center' }}>Máquinas</Title>

        {/* Filtros visibles al inicio */}
        <div style={{ marginBottom: '20px' }}>
          <Row gutter={[16, 16]} align="middle" style={{ marginBottom: '1rem' }}>
            <Col span={8}>
              <Input
                placeholder="Buscar por nombre de máquina"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onPressEnter={handleSearch}
                size="middle"
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={8}>
              <Select
                placeholder="Seleccionar tipo de máquina"
                value={selectedType}
                onChange={setSelectedType}
                size="middle"
                style={{ width: '100%' }}
              >
                <Option value="">Todos los tipos</Option>
                {machines.map((machine) => (
                  <Option key={machine.id} value={machine.type.name}>{machine.type.name}</Option>
                ))}
              </Select>
            </Col>
            <Col span={8}>
              <Select
                placeholder="Seleccionar fase de producción"
                value={selectedPhase}
                onChange={setSelectedPhase}
                size="middle"
                style={{ width: '100%' }}
              >
                <Option value="">Todas las fases</Option>
                {machines.map((machine) => (
                  <Option key={machine.id} value={machine.production_phases.name}>{machine.production_phases.name}</Option>
                ))}
              </Select>
            </Col>
          </Row>

          {/* Botones de acción */}
          <Row gutter={[16, 16]} justify="start">
            <Col>
              <Button
                type="primary"
                onClick={handleSearch}
                style={{ borderRadius: '4px', padding: '5px 20px' }}
              >
                Filtrar
              </Button>
            </Col>
            <Col>
              <Button
                onClick={handleClearFilters}
                style={{ borderRadius: '4px', backgroundColor: '#ff4d4f', color: '#fff', padding: '5px 20px' }}
              >
                Limpiar filtros
              </Button>
            </Col>
          </Row>
        </div>

        <Divider />

        {/* Mostrar las máquinas filtradas */}
        <Row gutter={[16, 16]} style={{ display: 'flex', flexWrap: 'wrap' }}>
          {filteredMachines.map((machine) => (
            <Col xs={24} sm={12} lg={8} key={machine.id} style={{ display: 'flex' }}>
              <Card
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Tag color={getMachineCategoryColor(machine.category)}>{machine.category}</Tag>
                  </div>
                  <Title level={4}>{machine.name}</Title>
                  <Text type="secondary" style={{ marginBottom: '1rem' }}>
                    {machine.description}
                  </Text>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Space>
                        <User size={16} />
                        <Text type="secondary">{machine.operator}</Text>
                      </Space>
                    </Col>
                    <Col span={12}>
                      <Space>
                        <HardDrive size={16} />
                        <Text type="secondary">{machine.type.name}</Text>
                      </Space>
                    </Col>
                    <Col span={12}>
                      <Space>
                        <Cog size={16} />
                        <Text type="secondary">{machine.production_phases.name}</Text>
                      </Space>
                    </Col>
                  </Row>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Machines;
