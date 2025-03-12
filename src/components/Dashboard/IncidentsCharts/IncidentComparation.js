import React, { useEffect, useState } from "react";
import { Card, Tooltip as AntTooltip, Button } from "antd";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Area } from "recharts";
import { HelpCircle } from "lucide-react";
import { useIncidents } from '../../../hooks/IncidentsHooks/Incidents.hooks';

const IncidentComparison = () => {
  const { incidentsByStatus } = useIncidents();
  const [weeklyComparisonData, setWeeklyComparisonData] = useState([]);

  useEffect(() => {
    if (incidentsByStatus && incidentsByStatus.incidentsData) {
      const incidentsData = incidentsByStatus.incidentsData;
      const weekMap = new Map();
      
      Object.keys(incidentsData).forEach((month) => {
        const monthData = incidentsData[month].weekly || {};
        Object.keys(monthData).forEach((week) => {
          const key = `Semana ${week}`;
          if (!weekMap.has(key)) {
            weekMap.set(key, { name: key });
          }
          
          const currentWeekData = weekMap.get(key);
          currentWeekData[month] = {
            enEspera: monthData[week]['En Espera'] || 0,
            enProgreso: monthData[week]['En Progreso'] || 0,
            resuelto: monthData[week]['Resuelto'] || 0,
            cancelado: monthData[week]['Cancelado'] || 0,
          };
          weekMap.set(key, currentWeekData);
        });
      });

      const transformedData = Array.from(weekMap.values())
        .sort((a, b) => parseInt(a.name.split(" ")[1]) - parseInt(b.name.split(" ")[1]))
        .map((week) => {
          return {
            name: week.name,
            ...Object.keys(incidentsData).reduce((acc, month) => {
              acc[`${month} En Espera`] = week[month]?.enEspera || 0;
              acc[`${month} En Progreso`] = week[month]?.enProgreso || 0;
              acc[`${month} Resuelto`] = week[month]?.resuelto || 0;
              acc[`${month} Cancelado`] = week[month]?.cancelado || 0;
              return acc;
            }, {}),
          };
        });

      setWeeklyComparisonData(transformedData);
    }
  }, [incidentsByStatus]);

  return (
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
          <AreaChart data={weeklyComparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip position={{ y: 0 }} />
            <Legend />
            {Object.keys(incidentsByStatus.incidentsData || {}).map((month, index) => (
              ["En Espera", "En Progreso", "Resuelto", "Cancelado"].map((status) => (
                <Area
                  key={`${month}-${status}`}
                  type="monotone"
                  dataKey={`${month} ${status}`}
                  stroke={index % 2 === 0 ? "#8884d8" : "#82ca9d"}
                  fillOpacity={0.3}
                  fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"}
                  name={`${month} - ${status}`}
                />
              ))
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default IncidentComparison;