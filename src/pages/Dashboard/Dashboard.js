"use client"

import { useState } from "react"
import {
  Typography,
  Row,
  Col,
  Card,
  Tabs,
} from "antd"
import {
  BarChart2,
  PieChartIcon,
  LineChartIcon,
} from "lucide-react"
import dayjs from "dayjs"
import "dayjs/locale/es"
import '../../assets/styles/Dashboard/Dashboard.css';
import { TotalIncidentsCard, ResolvedIncidentsCard, AverageResolutionTimeCard, IncidentEfficiencyCard } from '../../components/Dashboard/cards/KSICardComponent';
import IncidencesByStatus from "../../components/Dashboard/IncidentsCharts/Resumen/IncidentByStatus"
import ActiveIncidents from "../../components/Dashboard/IncidentsCharts//Resumen/ActiveIncidents"
import IncidentComparison from "../../components/Dashboard/IncidentsCharts/Resumen/IncidentComparation"
import MonthlyEvolutionChart from "../../components/Dashboard/IncidentsCharts/Tendencies/MonthlyEvolution";
import CommonIssuesAnalysis from "../../components/Dashboard/IncidentsCharts/CommonProblems/AnalitycsProblemsGlobal";
import CommonIssuesCard from "../../components/Dashboard/IncidentsCharts/Resumen/CommonIssuesCard"
import YearlyComparisonChart from "../../components/Dashboard/IncidentsCharts/Tendencies/YearlyComparisonChart"
dayjs.locale("es")

const { Title, Text } = Typography
const { TabPane } = Tabs

const Dashboard = () => {
  const [viewMode, setViewMode] = useState("weekly")

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
                  <CommonIssuesCard />
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
                  <Card title="Comparativa Global de Incidencias" className="chart-card">
                    <YearlyComparisonChart />
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