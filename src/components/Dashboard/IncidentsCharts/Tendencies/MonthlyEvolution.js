import React from 'react';
import { Card } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useIncidents } from '../../../../hooks/IncidentsHooks/Incidents.hooks';

const MonthlyEvolutionChart = () => {
  const { monthlyEvolution} = useIncidents();

  const monthlyData = Object.keys(monthlyEvolution).map((month) => ({
    month,
    total: monthlyEvolution[month].totalIncidents,
    finalizados: monthlyEvolution[month].totalResolved,
  }));

  return (
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
  );
};

export default MonthlyEvolutionChart;