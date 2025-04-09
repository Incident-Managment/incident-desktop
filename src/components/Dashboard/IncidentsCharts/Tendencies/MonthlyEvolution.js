import React from 'react';
import { Card } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useIncidents } from '../../../../hooks/IncidentsHooks/Incidents.hooks';

const MonthlyEvolutionChart = () => {
  const { monthlyEvolution } = useIncidents();

  const monthlyData = Object.keys(monthlyEvolution).map((month) => ({
    month,
    total: monthlyEvolution[month].totalIncidents,
    finalizados: monthlyEvolution[month].totalResolved,
  }));

  return (
    <Card title="Evolución Mensual" className="chart-card">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" name="Total Incidencias" fill="#1890ff" />
          <Bar dataKey="finalizados" name="Finalizadas" fill="#52c41a" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MonthlyEvolutionChart;