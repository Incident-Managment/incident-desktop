"use client"

import React, { useState, useEffect } from "react"
import { AlertCircle, CheckCircle2, Circle, User } from 'lucide-react'
import { Card, Typography, Button, Select } from 'antd'
import styled from 'styled-components'

const { Title, Text } = Typography
const { Option } = Select

// Simulated API call to fetch data
const fetchData = async () => {
  // In a real application, this would be an API call
  return {
    phases: [
      {
        id: 1,
        name: "Fase 1: Preparación y Configuración de Equipos para la Producción de Componentes",
        order: 1,
        incidents: [
          {
            id: 1,
            title: "Fallo en la máquina de corte",
            description: "La máquina de corte dejó de funcionar correctamente",
            status: "En Espera",
            priority: "Alta",
            category: "Mantenimiento",
            assignedTechnician: null
          }
        ]
      },
      {
        id: 2,
        name: "Fase 2: Ensamblaje de Componentes en la Línea de Producción para la Creación de Productos Finales",
        order: 2,
        incidents: [
          {
            id: 2,
            title: "Defecto en el ensamblaje de componentes",
            description: "Se detectó un defecto en el ensamblaje de los productos",
            status: "En Progreso",
            priority: "Media",
            category: "Calidad",
            assignedTechnician: "Jose Ramirez"
          }
        ]
      },
      {
        id: 3,
        name: "Fase 3: Inspección de Calidad y Control de Calidad Final de los Productos Terminados",
        order: 3,
        incidents: [
          {
            id: 3,
            title: "Problema en la inspección de calidad",
            description: "El producto no pasó la inspección de calidad",
            status: "Resuelto",
            priority: "Baja",
            category: "Producción",
            assignedTechnician: null
          }
        ]
      },
      {
        id: 4,
        name: "Fase 4: Empaque y Almacenaje de Productos Terminados para Distribución y Envío",
        order: 4,
        incidents: []
      }
    ],
    technicians: [
      { id: 1, name: "Jose Ramirez" },
      { id: 2, name: "Hector Zamorano" },
      { id: 3, name: "Jorge Padilla" }
    ]
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;

  @media (min-width: 992px) {
    flex-direction: row;
  }
`

const TimelineCard = styled(Card)`
  width: 100%;

  @media (min-width: 992px) {
    width: 66%;
  }
`

const DetailsCard = styled(Card)`
  width: 100%;

  @media (min-width: 992px) {
    width: 33%;
  }
`

const PhaseContainer = styled.div`
  margin-bottom: 32px;
  position: relative;
`

const PhaseHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`

const PhaseIcon = styled.div`
  border-radius: 50%;
  padding: 8px;
  background-color: #e6f7ff;
  color: #1890ff;
  margin-right: 16px;
`

const IncidentList = styled.div`
  margin-left: 56px;
  margin-top: 8px;
`

const IncidentItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`

const TimelineLine = styled.div`
  position: absolute;
  left: 20px;
  top: 32px;
  bottom: -32px;
  width: 2px;
  background-color: #f0f0f0;
`

const DetailsSection = styled.div`
  margin-bottom: 16px;
`

export default function ProductionTimelineWithAssignments() {
  const [phases, setPhases] = useState([])
  const [technicians, setTechnicians] = useState([])
  const [selectedIncident, setSelectedIncident] = useState(null)

  useEffect(() => {
    fetchData().then(data => {
      setPhases(data.phases)
      setTechnicians(data.technicians)
    })
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case "En Espera":
        return <Circle size={16} color="#faad14" />
      case "En Progreso":
        return <AlertCircle size={16} color="#1890ff" />
      case "Resuelto":
        return <CheckCircle2 size={16} color="#52c41a" />
      default:
        return <Circle size={16} color="#d9d9d9" />
    }
  }

  const handleAssignTechnician = (incidentId, technicianName) => {
    setPhases(prevPhases =>
      prevPhases.map(phase => ({
        ...phase,
        incidents: phase.incidents.map(incident =>
          incident.id === incidentId
            ? { ...incident, assignedTechnician: technicianName }
            : incident
        )
      }))
    )
    if (selectedIncident && selectedIncident.id === incidentId) {
      setSelectedIncident({ ...selectedIncident, assignedTechnician: technicianName })
    }
  }

  return (
    <Container>
      <TimelineCard title="Línea Temporal de Producción">
        {phases.map((phase, index) => (
          <PhaseContainer key={phase.id}>
            <PhaseHeader>
              <PhaseIcon>
                <Circle size={24} />
              </PhaseIcon>
              <Title level={4}>{phase.name}</Title>
            </PhaseHeader>
            {phase.incidents.length > 0 && (
              <IncidentList>
                <Text strong>Incidentes:</Text>
                {phase.incidents.map((incident) => (
                  <IncidentItem key={incident.id}>
                    {getStatusIcon(incident.status)}
                    <Text style={{ marginLeft: 8, marginRight: 8 }}>{incident.title}</Text>
                    <Button type="link" onClick={() => setSelectedIncident(incident)}>
                      Detalles
                    </Button>
                  </IncidentItem>
                ))}
              </IncidentList>
            )}
            {index < phases.length - 1 && <TimelineLine />}
          </PhaseContainer>
        ))}
      </TimelineCard>
      
      {selectedIncident && (
        <DetailsCard title="Detalles del Incidente">
          <Title level={5}>{selectedIncident.title}</Title>
          <DetailsSection>
            <Text strong>Descripción:</Text> {selectedIncident.description}
          </DetailsSection>
          <DetailsSection>
            <Text strong>Estado:</Text> {selectedIncident.status}
          </DetailsSection>
          <DetailsSection>
            <Text strong>Prioridad:</Text> {selectedIncident.priority}
          </DetailsSection>
          <DetailsSection>
            <Text strong>Categoría:</Text> {selectedIncident.category}
          </DetailsSection>
          <DetailsSection>
            <Text strong>Técnico Asignado:</Text>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
              <User size={16} style={{ marginRight: 8 }} />
              <Select
                style={{ width: '100%' }}
                value={selectedIncident.assignedTechnician || undefined}
                onChange={(value) => handleAssignTechnician(selectedIncident.id, value)}
                placeholder="Asignar técnico"
              >
                <Option value={undefined}>Sin asignar</Option>
                {technicians.map((tech) => (
                  <Option key={tech.id} value={tech.name}>
                    {tech.name}
                  </Option>
                ))}
              </Select>
            </div>
          </DetailsSection>
        </DetailsCard>
      )}
    </Container>
  )
}

