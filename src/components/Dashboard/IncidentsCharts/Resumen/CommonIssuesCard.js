import React from 'react';
import { Card, Button } from 'antd';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useIncidents } from '../../../../hooks/IncidentsHooks/Incidents.hooks';

const CommonIssuesCard = () => {
  const { commonProblemsPercentageToday } = useIncidents();

  const commonIssuesData = Object.keys(commonProblemsPercentageToday).map((key) => ({
    name: key,
    value: parseFloat(commonProblemsPercentageToday[key].percentage),
    count: commonProblemsPercentageToday[key].count,
    color: getColorForCategory(key),
  }));

  return (
    <Card
      title="Problemas Más Comunes del Dia de Hoy"
      className="chart-card"
    >
      <ResponsiveContainer width="100%" height={346}>
        <PieChart>
          <Pie
            data={commonIssuesData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {commonIssuesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value, _name, props) => [`${value}%`, `Count: ${props.payload.count}`]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

const getColorForCategory = (category) => {
  const colors = {
    Mantenimiento: '#1890ff',
    Calidad: '#13c2c2',
    Producción: '#a476e3',
  };
  return colors[category] || '#8884d8';
};

export default CommonIssuesCard;