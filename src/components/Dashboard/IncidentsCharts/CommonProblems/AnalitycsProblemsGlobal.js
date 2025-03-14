import React from "react"
import { Row, Col, Typography, List, Card, Divider } from "antd"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { useIncidents } from '../../../../hooks/IncidentsHooks/Incidents.hooks';

const { Title, Paragraph } = Typography

const CommonIssuesAnalysis = () => {
  const { mostCommonProblems } = useIncidents();


  const commonIssuesData = Object.keys(mostCommonProblems).map((key) => ({
    name: key,
    value: mostCommonProblems[key].count,
    percentage: mostCommonProblems[key].percentage,
    color: key === "Mantenimiento" ? "#1890ff" : key === "Calidad" ? "#13c2c2" : "#a476e3",
  }));

  return (
    <Card className="common-issues-card">
      <div className="issues-header">
        <Title level={4}>Análisis de Problemas Más Comunes</Title>
        <Paragraph>
          Este análisis muestra los tipos de problemas más frecuentes reportados en las incidencias,
          permitiendo identificar áreas que requieren atención prioritaria.
        </Paragraph>
      </div>

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
                      description={`Porcentaje: ${item.percentage}%`}
                    />
                    <div className="issue-percentage">
                      {item.percentage}%
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
      </div>

      <Divider />
    </Card>
  )
}

export default CommonIssuesAnalysis