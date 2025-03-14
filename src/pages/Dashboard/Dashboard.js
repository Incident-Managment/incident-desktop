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
} from "antd"
import {
  BarChart2,
  PieChartIcon,
  LineChartIcon,
} from "lucide-react"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
import IncidencesByStatus from "../../components/Dashboard/IncidentsCharts/Resumen/IncidentByStatus"
import ActiveIncidents from "../../components/Dashboard/IncidentsCharts//Resumen/ActiveIncidents"
import IncidentComparison from "../../components/Dashboard/IncidentsCharts/Resumen/IncidentComparation"
import MonthlyEvolutionChart from "../../components/Dashboard/IncidentsCharts/Tendencies/MonthlyEvolution";
import CommonIssuesAnalysis from "../../components/Dashboard/IncidentsCharts/CommonProblems/AnalitycsProblemsGlobal";

dayjs.locale("es")

const { Title, Text } = Typography
const { TabPane } = Tabs
const { Option } = Select

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



  const renderYearlyComparison = () => {
    return (
      <div className="yearly-comparison">
        <div className="chart-header">
          <Title level={5}>Comparativa Global de Incidencias</Title>
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
            <TotalIncidentsCard />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <ResolvedIncidentsCard />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <AverageResolutionTimeCard />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <IncidentEfficiencyCard />
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
                    <ActiveIncidents />
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
                    <IncidentComparison />
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
                  <Card title="Comparativa Global" className="chart-card">
                    {renderYearlyComparison()}
                  </Card>
                </Col>
              </Row>

              <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                <Col xs={48} lg={24}>
                  <MonthlyEvolutionChart />
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
              <CommonIssuesAnalysis />
            </TabPane>
          </Tabs>
        </div>
      </>
    </div>
  )
}

export default Dashboard