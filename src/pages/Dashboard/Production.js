import React, { useState } from "react";
import { Table, Typography, Button, Input, Switch } from "antd";
import { Circle, ChevronDown, ChevronUp } from "lucide-react";
import styled from "styled-components";
import { useProductionPhases } from "../../hooks/ProductionHooks/production.hooks";
import CreateProductionPhaseModal from "../../components/Production/createProductionPhase";

const { Title, Text } = Typography;

const PhaseIcon = styled.div`
  margin-right: 8px;
`;

const StyledTable = styled(Table)`
  margin-top: 20px;
`;

export default function ProductionTimelineEnhanced() {
  const cachedData = JSON.parse(localStorage.getItem("user"));
  const companyId = cachedData?.user?.company?.id;

  const {
    phases,
    selectedPhase,
    newName,
    newActive,
    setSelectedPhase,
    setNewName,
    setNewOrder,
    setNewActive,
    handleUpdatePhase,
  } = useProductionPhases(companyId);

  const [expandedPhase, setExpandedPhase] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePhaseClick = (phaseId) => {
    if (expandedPhase === phaseId) {
      setExpandedPhase(null);
    } else {
      setExpandedPhase(phaseId);
      const selected = phases.find((phase) => phase.id === phaseId);
      setSelectedPhase(selected);
      setNewOrder(selected.phase_order);
      setNewName(selected.name);
    }
  };

  const handleToggleActive = (checked) => {
    setNewActive(checked);
  };

  const handleSaveChanges = () => {
    handleUpdatePhase({
      ...selectedPhase,
      name: newName,
    });
  };

  const columns = [
    {
      title: "Fase de Producción",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <PhaseIcon>
            <Circle size={24} />
          </PhaseIcon>
          <span style={{ cursor: "pointer" }} onClick={() => handlePhaseClick(record.id)}>
            {text}
          </span>
        </div>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text, record) => (
        <Button
          type="text"
          icon={expandedPhase === record.id ? <ChevronUp /> : <ChevronDown />}
          onClick={() => handlePhaseClick(record.id)}
        />
      ),
    },
  ];

  const expandedRowRender = () => (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <Text strong>Nombre: </Text>
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ width: 200 }}
        />
      </div>
      <Button type="primary" onClick={handleSaveChanges}>
        Guardar Cambios
      </Button>
    </div>
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: window.innerWidth < 768 ? "column" : "row", // Cambia la dirección en pantallas pequeñas
          justifyContent: "space-between",
          alignItems: window.innerWidth < 768 ? "flex-start" : "center", // Alinea los elementos en pantallas pequeñas
          gap: "1rem", // Espaciado entre elementos
        }}
      >
        <Title style={{ marginBottom: window.innerWidth < 768 ? "1rem" : "0" }}>
          Línea Temporal de Producción
        </Title>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginTop: window.innerWidth < 768 ? 0 : 15 }}
        >
          Añadir Fase de Producción
        </Button>
      </div>
      
        <StyledTable
          columns={columns}
          dataSource={phases}
          rowKey="id"
          expandable={{
            expandedRowRender,
            expandedRowKeys: expandedPhase ? [expandedPhase] : [],
          }}
        />


      <CreateProductionPhaseModal
        companyId={companyId}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </div>
  );
}
