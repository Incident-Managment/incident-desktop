"use client"

import { useState } from "react"
import {
  Typography,
  Row,
  Col,
  Card,
  List,
  Button,
  Tabs,
  Select,
  Divider,
  Tooltip as AntTooltip,
} from "antd"
import {
  BarChart2,
  PieChartIcon,
  LineChartIcon,
  HelpCircle,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts"
import dayjs from "dayjs"
import "dayjs/locale/es"
import '../../assets/styles/Dashboard/Dashboard.css';
import { TotalIncidentsCard, ResolvedIncidentsCard, AverageResolutionTimeCard, IncidentEfficiencyCard } from '../../components/Dashboard/cards/KSICardComponent';
import IncidencesByStatus from "../../components/Dashboard/IncidentsCharts/IncidentByStatus"
import ActiveIncidents from "../../components/Dashboard/IncidentsCharts/ActiveIncidents"

dayjs.locale("es")

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs
const { Option } = Select

const monthlyData = [
  { month: "Ene", activos: 65, pendientes: 28, finalizados: 45, total: 138 },
  { month: "Feb", activos: 59, pendientes: 32, finalizados: 49, total: 140 },
  { month: "Mar", activos: 80, pendientes: 41, finalizados: 62, total: 183 },
  { month: "Abr", activos: 81, pendientes: 37, finalizados: 58, total: 176 },
  { month: "May", activos: 56, pendientes: 25, finalizados: 44, total: 125 },
  { month: "Jun", activos: 53, pendientes: 29, finalizados: 41, total: 123 },
]

const yearlyComparison = [
  { month: "Ene", actual: 138, anterior: 120 },
  { month: "Feb", actual: 140, anterior: 125 },
  { month: "Mar", actual: 183, anterior: 150 },
  { month: "Abr", actual: 176, anterior: 160 },
  { month: "May", actual: 125, anterior: 140 },
  { month: "Jun", actual: 123, anterior: 130 },
  { month: "Jul", actual: 0, anterior: 145 },
  { month: "Ago", actual: 0, anterior: 155 },
  { month: "Sep", actual: 0, anterior: 165 },
  { month: "Oct", actual: 0, anterior: 170 },
  { month: "Nov", actual: 0, anterior: 160 },
  { month: "Dic", actual: 0, anterior: 150 },
]

const commonIssuesData = [
  {
    name: "Error de Sistema",
    value: 31,
    color: "#1890ff",
    description: "Fallos en el sistema operativo o aplicaciones principales",
  },
  {
    name: "Fallo de Hardware",
    value: 23,
    color: "#13c2c2",
    description: "Problemas con equipos físicos como ordenadores o impresoras",
  },
  {
    name: "Problemas de Red",
    value: 23,
    color: "#fa8c16",
    description: "Fallos de conectividad o acceso a recursos compartidos",
  },
  {
    name: "Error de Software",
    value: 15,
    color: "#f5222d",
    description: "Bugs o problemas con aplicaciones específicas",
  },
  {
    name: "Problemas de Usuario",
    value: 8,
    color: "#722ed1",
    description: "Errores de configuración o uso incorrecto",
  },
]

const weeklyTrendData = [
  { name: "Sem 1", actual: 39, anterior: 35 },
  { name: "Sem 2", actual: 30, anterior: 34 },
  { name: "Sem 3", actual: 43, anterior: 32 },
  { name: "Sem 4", actual: 48, anterior: 37 },
]


const recentIncidentsData = [
  {
    id: 1,
    title: "Error en el sistema de facturación",
    description: "Los usuarios no pueden generar facturas electrónicas",
    status: { name: "En Progreso", color: "blue" },
    priority: { name: "Alta", color: "red" },
    department: "Finanzas",
    assignee: "Ana Martínez",
    created: "2023-06-10T14:30:00",
    updated: "2023-06-11T09:15:00",
    category: "Error de Sistema",
  },
  {
    id: 2,
    title: "Problema de conexión a la red",
    description: "Departamento de marketing sin conexión a internet",
    status: { name: "Resuelto", color: "green" },
    priority: { name: "Alta", color: "red" },
    department: "Marketing",
    assignee: "Carlos Ruiz",
    created: "2023-06-09T10:45:00",
    updated: "2023-06-09T12:30:00",
    category: "Problemas de Red",
  },
  {
    id: 3,
    title: "Actualización de software fallida",
    description: "Error al actualizar aplicación de diseño gráfico",
    status: { name: "Pendiente", color: "gold" },
    priority: { name: "Media", color: "orange" },
    department: "Diseño",
    assignee: "Elena Sánchez",
    created: "2023-06-08T16:20:00",
    updated: "2023-06-08T16:20:00",
    category: "Error de Software",
  },
  {
    id: 4,
    title: "Fallo en la impresora central",
    description: "La impresora del piso 3 muestra error de conexión",
    status: { name: "En Progreso", color: "blue" },
    priority: { name: "Baja", color: "green" },
    department: "Administración",
    assignee: "Javier López",
    created: "2023-06-07T11:10:00",
    updated: "2023-06-07T14:25:00",
    category: "Fallo de Hardware",
  },
  {
    id: 5,
    title: "Error en el servidor de correo",
    description: "Los correos no se están enviando correctamente",
    status: { name: "Resuelto", color: "green" },
    priority: { name: "Alta", color: "red" },
    department: "IT",
    assignee: "María Pérez",
    created: "2023-06-06T09:30:00",
    updated: "2023-06-06T13:45:00",
    category: "Error de Sistema",
  },
  {
    id: 6,
    title: "Problema con acceso a base de datos",
    description: "Usuarios no pueden acceder a la base de datos principal",
    status: { name: "Pendiente", color: "gold" },
    priority: { name: "Alta", color: "red" },
    department: "IT",
    assignee: "Carlos Ruiz",
    created: "2023-06-05T15:20:00",
    updated: "2023-06-05T16:45:00",
    category: "Error de Sistema",
  },
  {
    id: 7,
    title: "Fallo en sistema de climatización",
    description: "Temperatura elevada en sala de servidores",
    status: { name: "Resuelto", color: "green" },
    priority: { name: "Alta", color: "red" },
    department: "Infraestructura",
    assignee: "Javier López",
    created: "2023-06-04T08:30:00",
    updated: "2023-06-04T11:15:00",
    category: "Fallo de Hardware",
  },
  {
    id: 8,
    title: "Error en aplicación de contabilidad",
    description: "La aplicación se cierra inesperadamente al generar informes",
    status: { name: "En Progreso", color: "blue" },
    priority: { name: "Media", color: "orange" },
    department: "Finanzas",
    assignee: "Elena Sánchez",
    created: "2023-06-03T13:45:00",
    updated: "2023-06-03T14:30:00",
    category: "Error de Software",
  },
]


const Dashboard = () => {
  const [viewMode, setViewMode] = useState("weekly")

  const count = 66
  const resolvedCount = 3
  const averageResolutionTime = 319.71
  const incidentEfficiency = 4.55



  const renderCommonIssuesDetail = () => {
    return (
      <div className="common-issues-detail">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={commonIssuesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {commonIssuesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} incidencias`, "Cantidad"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Col>
          <Col span={12}>
            <div className="issues-list">
              <Title level={5}>Detalles de Problemas Comunes</Title>
              <List
                itemLayout="horizontal"
                dataSource={commonIssuesData}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<div className="issue-color-dot" style={{ backgroundColor: item.color }}></div>}
                      title={`${item.name} (${item.value} incidencias)`}
                      description={item.description}
                    />
                    <div className="issue-percentage">
                      {((item.value / commonIssuesData.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(1)}%
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }


  const renderYearlyComparison = () => {
    return (
      <div className="yearly-comparison">
        <div className="chart-header">
          <Title level={5}>Comparativa Anual de Incidencias</Title>
          <div className="chart-actions">
            <Select defaultValue="2023" style={{ width: 100 }} dropdownMatchSelectWidth={false}>
              <Option value="2023">2023</Option>
              <Option value="2022">2022</Option>
              <Option value="2021">2021</Option>
            </Select>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={yearlyComparison}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="actual" name="Año Actual" fill="#1890ff" />
            <Line type="monotone" dataKey="anterior" name="Año Anterior" stroke="#ff7a45" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <Title level={1} className="dashboard-title">
              Panel de Control de Incidencias
            </Title>
            <Text type="secondary">Monitoreo y análisis de incidencias en tiempo real</Text>
          </div>
        </div>
      </div>

      <>
        {/* KPI Cards */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <TotalIncidentsCard count={count} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <ResolvedIncidentsCard resolvedCount={resolvedCount} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <AverageResolutionTimeCard averageResolutionTime={averageResolutionTime} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <IncidentEfficiencyCard incidentEfficiency={incidentEfficiency} />
          </Col>
        </Row>

        <div className="dashboard-tabs">
          <Tabs defaultActiveKey="overview" size="large">
            <TabPane
              tab={
                <span>
                  <BarChart2 size={16} />
                  Resumen
                </span>
              }
              key="overview"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                  <Card
                    title="Comparativa de Incidencias"
                    className="chart-card"
                    extra={
                      <AntTooltip title="Muestra la comparación de incidencias entre el periodo actual y el anterior">
                        <Button type="text" icon={<HelpCircle size={16} />} />
                      </AntTooltip>
                    }
                  >
                    <div className="chart-container">
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={weeklyTrendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <defs>
                            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
                            </linearGradient>
                            <linearGradient id="colorAnterior" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="actual"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#colorActual)"
                            name="Periodo Actual"
                          />
                          <Area
                            type="monotone"
                            dataKey="anterior"
                            stroke="#82ca9d"
                            fillOpacity={1}
                            fill="url(#colorAnterior)"
                            name="Periodo Anterior"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </Col>

                <Col xs={24} lg={8}>
                  <Card
                    title="Problemas Más Comunes"
                    className="chart-card"
                    extra={
                      <Button type="link" onClick={() => { }}>
                        Ver detalles
                      </Button>
                    }
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={commonIssuesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {commonIssuesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} incidencias`, "Cantidad"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
              </Row>

              <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                <Col xs={24}>
                  <Card title="Incidencias por Estado" className="chart-card">
                    <IncidencesByStatus
                      viewMode={viewMode}
                      setViewMode={setViewMode}
                    />
                  </Card>
                </Col>
              </Row>

              <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                <Col xs={24}>
                  <Card title="Incidencias Activas" className="active-incidents-card">
                    <ActiveIncidents incidents={recentIncidentsData} />
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <LineChartIcon size={16} />
                  Tendencias
                </span>
              }
              key="trends"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Card title="Comparativa Anual" className="chart-card">
                    {renderYearlyComparison()}
                  </Card>
                </Col>
              </Row>

              <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                <Col xs={24} lg={12}>
                  <Card title="Evolución Mensual" className="chart-card">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="total"
                          name="Total Incidencias"
                          stroke="#1890ff"
                          activeDot={{ r: 8 }}
                        />
                        <Line type="monotone" dataKey="finalizados" name="Finalizadas" stroke="#52c41a" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>

                <Col xs={24} lg={12}>
                  <Card title="Distribución por Tipo" className="chart-card">
                    {renderCommonIssuesDetail()}
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <PieChartIcon size={16} />
                  Problemas Comunes
                </span>
              }
              key="issues"
            >
              <Card className="common-issues-card">
                <div className="issues-header">
                  <Title level={4}>Análisis de Problemas Más Comunes</Title>
                  <Paragraph>
                    Este análisis muestra los tipos de problemas más frecuentes reportados en las incidencias,
                    permitiendo identificar áreas que requieren atención prioritaria.
                  </Paragraph>
                </div>

                {renderCommonIssuesDetail()}

                <Divider />

                <div className="issues-by-department">
                  <Title level={5}>Problemas por Departamento</Title>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      layout="vertical"
                      data={[
                        { department: "IT", sistema: 12, hardware: 8, red: 10, software: 5, usuario: 2 },
                        { department: "Finanzas", sistema: 8, hardware: 4, red: 3, software: 6, usuario: 1 },
                        { department: "Marketing", sistema: 3, hardware: 5, red: 7, software: 2, usuario: 3 },
                        { department: "RRHH", sistema: 2, hardware: 3, red: 1, software: 1, usuario: 2 },
                        { department: "Operaciones", sistema: 6, hardware: 3, red: 2, software: 1, usuario: 0 },
                      ]}
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="department" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sistema" name="Error de Sistema" stackId="a" fill="#1890ff" />
                      <Bar dataKey="hardware" name="Fallo de Hardware" stackId="a" fill="#13c2c2" />
                      <Bar dataKey="red" name="Problemas de Red" stackId="a" fill="#fa8c16" />
                      <Bar dataKey="software" name="Error de Software" stackId="a" fill="#f5222d" />
                      <Bar dataKey="usuario" name="Problemas de Usuario" stackId="a" fill="#722ed1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </TabPane>
          </Tabs>
        </div>
      </>
    </div>
  )
}

export default Dashboard