import { useState } from "react";
import { Circle, ChevronDown, ChevronUp, Settings, Plus } from "lucide-react";
import { Card, Typography, Button, Input, Switch, List, Collapse, Tooltip, Spin, Select } from "antd";
import styled from "styled-components";
import { useProductionPhases, usePhasesAndMachines } from "../../hooks/ProductionHooks/production.hooks";

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

// Estilos
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  min-height: 100vh;
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PhaseCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const PhaseHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #2668ff; /* Cambiado a un azul más oscuro */
  color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const PhaseIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  color: #2668ff; /* Cambiado a un azul más oscuro */
  margin-right: 16px;
`;

const PhaseDetails = styled.div`
  padding: 16px;
`;

const MachinesList = styled(List)`
  margin-top: 16px;
`;

const StyledCollapse = styled(Collapse)`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export default function ProductionTimelineEnhanced() {
  const cachedData = JSON.parse(localStorage.getItem("user"));
  const companyId = cachedData?.user?.company?.id;

  const {
    phases,
    selectedPhase,
    newName,
    newOrder,
    newActive,
    setSelectedPhase,
    setNewName,
    setNewOrder,
    setNewActive,
    handleUpdatePhase,
    handleAddMachineToPhase,
    error,
    isLoading,
    machines,
    isLoadingMachines,
    selectedMachine,
    setSelectedMachine,
  } = useProductionPhases(companyId);

  const [expandedPhase, setExpandedPhase] = useState(null);

  const { phasesAndMachines, isLoadingPhasesAndMachines } = usePhasesAndMachines(
    expandedPhase,
    companyId,
  );

  const handlePhaseClick = (phaseId) => {
    if (expandedPhase === phaseId) {
      setExpandedPhase(null);
    } else {
      setExpandedPhase(phaseId);
      const selected = phases.find((phase) => phase.id === phaseId);
      setSelectedPhase(selected);
      setNewOrder(selected.phase_order);
      setNewActive(selected.is_active);
      setNewName(selected.name);
    }
  };

  if (isLoading)
    return (
      <LoadingOverlay>
        <Spin size="large" />
      </LoadingOverlay>
    );
  if (error)
    return (
      <Container>
        <Text type="danger">Error al cargar las fases de producción</Text>
      </Container>
    );

  return (
    <Container>
      <Title>Línea Temporal de Producción</Title>
      <TimelineContainer>
        {phases.map((phase) => (
          <PhaseCard key={phase.id}>
            <PhaseHeader>
              <div style={{ display: "flex", alignItems: "center" }}>
                <PhaseIcon>
                  <Circle size={24} />
                </PhaseIcon>
                <Title level={4} style={{ color: "white", margin: 0 }}>
                  {phase.name}
                </Title>
              </div>
              <Button
                type="text"
                icon={expandedPhase === phase.id ? <ChevronUp color="white" /> : <ChevronDown color="white" />}
                onClick={() => handlePhaseClick(phase.id)}
              />
            </PhaseHeader>
            <StyledCollapse activeKey={expandedPhase === phase.id ? ["1"] : []}>
              <Panel key="1" showArrow={false}>
                <PhaseDetails>
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>Orden: </Text>
                    <Input
                      type="number"
                      value={newOrder}
                      onChange={(e) => setNewOrder(e.target.value)}
                      style={{ width: 100 }}
                    />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>Estado: </Text>
                    <Switch checked={newActive} onChange={(checked) => setNewActive(checked)} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>Nombre: </Text>
                    <Input value={newName} onChange={(e) => setNewName(e.target.value)} style={{ width: 200 }} />
                  </div>
                  <Button
                    type="primary"
                    onClick={() => {
                      handleUpdatePhase(selectedPhase);
                    }}
                  >
                    Guardar Cambios
                  </Button>
                </PhaseDetails>
                <MachinesList
                  header={<Title level={5}>Máquinas Asignadas</Title>}
                  loading={isLoadingPhasesAndMachines}
                  dataSource={phasesAndMachines}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      actions={[
                        <Tooltip title="Configurar máquina" key="config">
                          <Button icon={<Settings size={16} />} />
                        </Tooltip>,
                      ]}
                    >
                      <List.Item.Meta title={item.machine_name} />
                    </List.Item>
                  )}
                />
                <Select
                  placeholder="Seleccionar máquina"
                  style={{ width: 200, marginTop: 16 }}
                  onChange={(value) => setSelectedMachine(value)}
                  loading={isLoadingMachines}
                >
                  {machines.map((machine) => (
                    <Option key={machine.name} value={machine.id}>
                      {machine.name}
                    </Option>
                  ))}
                </Select>
                <Button
                  type="dashed"
                  icon={<Plus size={16} />}
                  style={{ marginTop: 16 }}
                  onClick={handleAddMachineToPhase}
                  disabled={!selectedMachine}
                >
                  Añadir Máquina
                </Button>
              </Panel>
            </StyledCollapse>
          </PhaseCard>
        ))}
      </TimelineContainer>
    </Container>
  );
}