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
} from "antd"
import {
  BarChart2,
  PieChartIcon,
  LineChartIcon,
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
  ComposedChart,
} from "recharts"
import dayjs from "dayjs"
import "dayjs/locale/es"
import '../../assets/styles/Dashboard/Dashboard.css';
import { TotalIncidentsCard, ResolvedIncidentsCard, AverageResolutionTimeCard, IncidentEfficiencyCard } from '../../components/Dashboard/cards/KSICardComponent';
import IncidencesByStatus from "../../components/Dashboard/IncidentsCharts/IncidentByStatus"
import ActiveIncidents from "../../components/Dashboard/IncidentsCharts/ActiveIncidents"
import IncidentComparison from "../../components/Dashboard/IncidentsCharts/IncidentComparation"
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



const Dashboard = () => {
  const [viewMode, setViewMode] = useState("weekly")

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
            <TotalIncidentsCard/>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <ResolvedIncidentsCard />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <AverageResolutionTimeCard />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <IncidentEfficiencyCard/>
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
                <IncidentComparison />
                </Col>

                <Col xs={24} lg={8}>
                  <Card
                    title="Problemas Más Comunes del Dia de Hoy"
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

              <Row gutter={[16, 16]} style={{ marginTop: "25px" }}>
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
                    <ActiveIncidents />
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