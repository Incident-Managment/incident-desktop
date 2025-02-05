"use client";

import React, { useState, useEffect } from "react";
import { Circle } from "lucide-react";
import { Card, Typography, Button, Input, Switch, message } from "antd";
import styled from "styled-components";

const { Title, Text } = Typography;

const fetchData = async (companyId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/productionPhasesByCompany?companyId=${companyId}`
    );

    if (!response.ok) {
      throw new Error("Error al obtener las fases de producción");
    }

    const phasesData = await response.json();

    return phasesData.map((phase) => ({
      id: phase.id,
      name: phase.name,
      order: phase.phase_order,
      isActive: phase.is_active,
    }));
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
};

const updatePhase = async (companyId, phaseId, updatedData) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/updateProductionPhase`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyId,
          phaseId,
          ...updatedData,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar la fase");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar la fase:", error);
    return null;
  }
};

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
  const [phases, setPhases] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [newName, setNewName] = useState("");
  const [newOrder, setNewOrder] = useState("");
  const [newActive, setNewActive] = useState(false);
  const cachedData = JSON.parse(localStorage.getItem("user"));
  const companyId = cachedData?.user?.company?.id;

  useEffect(() => {
    if (companyId) {
      fetchData(companyId).then((data) => setPhases(data));
    }
  }, [companyId]);

  const handleUpdatePhase = async () => {
    if (!selectedPhase) return;

    const updatedData = {
        name: newName.trim() !== "" ? newName : selectedPhase.name,
        phase_order: newOrder !== "" ? parseInt(newOrder, 10) : selectedPhase.order,
        is_active: newActive,
    };

    // Evitar actualizar si no hay cambios
    if (
        updatedData.name === selectedPhase.name &&
        updatedData.phase_order === selectedPhase.order &&
        updatedData.is_active === selectedPhase.isActive
    ) {
        message.info("No se han realizado cambios.");
        return;
    }

    const updatedPhase = await updatePhase(companyId, selectedPhase.id, updatedData);

    if (updatedPhase) {
        message.success("Fase actualizada correctamente");

        // Volver a cargar las fases para reflejar el cambio en el orden
        const updatedPhases = await fetchData(companyId);
        setPhases(updatedPhases); // Se actualiza el estado con los nuevos datos

        // Cerrar el modal de edición
        setSelectedPhase(null);
    } else {
        message.error("Error al actualizar la fase");
    }
};


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
                  setNewOrder(phase.order);
                  setNewActive(phase.isActive);
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
