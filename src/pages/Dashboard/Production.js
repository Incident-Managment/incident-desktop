"use client";

import React from "react";
import { Circle } from "lucide-react";
import { Card, Typography, Button, Input, Switch, message } from "antd";
import styled from "styled-components";
import { useProductionPhases } from "../../hooks/ProductionHooks/production.hooks";

const { Title, Text } = Typography;

// Estilos
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

const TimelineCard = styled(Card)`
  width: 100%;
  @media (min-width: 992px) {
    width: 66%;
  }
`;

const DetailsCard = styled(Card)`
  width: 100%;
  @media (min-width: 992px) {
    width: 33%;
  }
`;

const PhaseContainer = styled.div`
  margin-bottom: 32px;
  position: relative;
`;

const PhaseHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const PhaseIcon = styled.div`
  border-radius: 50%;
  padding: 8px;
  background-color: #e6f7ff;
  color: #1890ff;
  margin-right: 16px;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 20px;
  top: 32px;
  bottom: -32px;
  width: 2px;
  background-color: #f0f0f0;
`;

const DetailsSection = styled.div`
  margin-bottom: 16px;
`;

export default function ProductionTimelineWithAssignments() {
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
    error,
    isLoading,
  } = useProductionPhases(companyId);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar las fases de producción</div>;

  return (
    <Container>
      <TimelineCard title="Línea Temporal de Producción">
        {phases.map((phase, index) => (
          <PhaseContainer key={phase.id}>
            <PhaseHeader>
              <div style={{ display: "flex", alignItems: "center" }}>
                <PhaseIcon>
                  <Circle size={24} />
                </PhaseIcon>
                <Title level={4}>{phase.name}</Title>
              </div>
              <Button
                type="link"
                onClick={() => {
                  setSelectedPhase(phase);
                  setNewName(phase.name);
                  setNewOrder(phase.phase_order);
                  setNewActive(phase.is_active);
                }}
              >
                Detalles
              </Button>
            </PhaseHeader>
            {index < phases.length - 1 && <TimelineLine />}
          </PhaseContainer>
        ))}
      </TimelineCard>

      {selectedPhase && (
        <DetailsCard title="Detalles de la Fase">
          <Title level={5}>{selectedPhase.name}</Title>
          <DetailsSection>
            <Text strong>Orden:</Text>
            <Input
              type="number"
              value={newOrder}
              onChange={(e) => setNewOrder(e.target.value)}
            />
          </DetailsSection>
          <DetailsSection>
            <Text strong>Estado Activo:</Text>
            <Switch checked={newActive} onChange={setNewActive} />
          </DetailsSection>
          <DetailsSection>
            <Text strong>Editar Nombre:</Text>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nuevo nombre"
            />
            <Button type="primary" onClick={handleUpdatePhase} style={{ marginTop: 8 }}>
              Guardar Cambios
            </Button>
          </DetailsSection>
          <Button danger onClick={() => setSelectedPhase(null)} style={{ marginTop: 8 }}>
            Cerrar
          </Button>
        </DetailsCard>
      )}
    </Container>
  );
}