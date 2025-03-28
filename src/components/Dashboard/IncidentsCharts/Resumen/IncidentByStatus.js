import React, { useState, useEffect, useMemo } from 'react';
import { Typography, Radio, Row, Col, Card, Statistic, Tabs } from 'antd';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { useIncidents } from '../../../../hooks/IncidentsHooks/Incidents.hooks';

const { Title } = Typography;
const { TabPane } = Tabs;

const IncidencesByStatus = ({ viewMode, setViewMode }) => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const { incidentsByStatus } = useIncidents();

  const monthsOrder = useMemo(() => [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ], []);

  useEffect(() => {
    if (incidentsByStatus && incidentsByStatus.incidentsData) {
      const incidentsData = incidentsByStatus.incidentsData;
      const years = Object.keys(incidentsData);
      if (!selectedYear && years.length > 0) {
        setSelectedYear(years.includes('2025') ? '2025' : years[0]);
      }
    }
  }, [incidentsByStatus, selectedYear]);

  useEffect(() => {
    if (incidentsByStatus && incidentsByStatus.incidentsData && selectedYear) {
      const incidentsData = incidentsByStatus.incidentsData[selectedYear];
      const transformedData = [];

      Object.keys(incidentsData).forEach((month) => {
        const monthData = incidentsData[month][viewMode] || {};

        if (viewMode === 'weekly') {
          const weeklyData = Object.entries(monthData).map(([week, statusData]) => {
            return {
              label: `${month} - Semana ${week} (${selectedYear})`,
              week: parseInt(week, 10),
              enEspera: statusData['En Espera'] || 0,
              enProgreso: statusData['En Progreso'] || 0,
              resuelto: statusData['Resuelto'] || 0,
              cancelado: statusData['Cancelado'] || 0,
            };
          });

          transformedData.push(...weeklyData);
        } else {
          transformedData.push({
            label: `${month} (${selectedYear})`,
            month: monthsOrder.indexOf(month),
            enEspera: monthData['En Espera'] || 0,
            enProgreso: monthData['En Progreso'] || 0,
            resuelto: monthData['Resuelto'] || 0,
            cancelado: monthData['Cancelado'] || 0,
          });
        }
      });

      transformedData.sort((a, b) => {
        const [monthA] = a.label.split(' - Semana ');
        const [monthB] = b.label.split(' - Semana ');
        const monthComparison = monthsOrder.indexOf(monthA) - monthsOrder.indexOf(monthB);
        if (monthComparison !== 0) return monthComparison;
        if (viewMode === 'weekly') return a.week - b.week;
        return a.month - b.month;
      });

      setData(transformedData);
    }
  }, [viewMode, incidentsByStatus, selectedYear, monthsOrder]);

  const labelKey = 'label';

  return (
    <div>
      <Tabs activeKey={selectedYear} onChange={setSelectedYear}>
        {incidentsByStatus && incidentsByStatus.incidentsData && Object.keys(incidentsByStatus.incidentsData).map(year => (
          <TabPane tab={year} key={year}>
            <div className="chart-header">
              <Title level={5}></Title>
              <Radio.Group
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                buttonStyle="solid"
                className="view-mode-toggle"
              >
                <Radio.Button value="weekly">Semanal</Radio.Button>
                <Radio.Button value="monthly">Mensual</Radio.Button>
              </Radio.Group>
            </div>
            <div className="incidences-by-status">

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={labelKey} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="enEspera" name="En Espera" fill="#1890ff" stackId="a" />
                  <Bar dataKey="enProgreso" name="En Progreso" fill="#faad14" stackId="a" />
                  <Bar dataKey="resuelto" name="Resuelto" fill="#52c41a" stackId="a" />
                  <Bar dataKey="cancelado" name="Cancelado" fill="#ff4d4f" stackId="a" />
                </BarChart>
              </ResponsiveContainer>

              <div className="status-summary">
                <Row gutter={16}>
                  <Col span={6}>
                    <Card className="status-card waiting-card">
                      <Statistic
                        title="En Espera"
                        value={data.reduce((sum, item) => sum + item.enEspera, 0)}
                        valueStyle={{ color: "#1890ff" }}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card className="status-card in-progress-card">
                      <Statistic
                        title="En Progreso"
                        value={data.reduce((sum, item) => sum + item.enProgreso, 0)}
                        valueStyle={{ color: "#faad14" }}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card className="status-card resolved-card">
                      <Statistic
                        title="Resuelto"
                        value={data.reduce((sum, item) => sum + item.resuelto, 0)}
                        valueStyle={{ color: "#52c41a" }}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card className="status-card canceled-card">
                      <Statistic
                        title="Cancelado"
                        value={data.reduce((sum, item) => sum + item.cancelado, 0)}
                        valueStyle={{ color: "#ff4d4f" }}
                      />
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default IncidencesByStatus;