import React, { useEffect, useState, useMemo } from "react";
import { Card, Tooltip as AntTooltip, Button, Tabs } from "antd";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Area } from "recharts";
import { HelpCircle } from "lucide-react";
import { useIncidents } from '../../../../hooks/IncidentsHooks/Incidents.hooks';

const { TabPane } = Tabs;

const IncidentComparison = () => {
  const { incidentsByStatus } = useIncidents();
  const [data, setData] = useState({});
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const monthOrder = useMemo(() => ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"], []);

  useEffect(() => {
    if (incidentsByStatus && incidentsByStatus.incidentsData) {
      const incidentsData = incidentsByStatus.incidentsData;
      const yearMap = {};

      Object.keys(incidentsData).forEach((year) => {
        const yearData = incidentsData[year];
        const monthMap = {};

        Object.keys(yearData).forEach((month) => {
          const monthData = yearData[month].weekly || {};
          const weekMap = new Map();

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

          const transformedData = Array.from(weekMap.values())
            .sort((a, b) => parseInt(a.name.split(" ")[1]) - parseInt(b.name.split(" ")[1]))
            .map((week) => {
              return {
                name: week.name,
                ...Object.keys(yearData).reduce((acc, month) => {
                  acc[`${month} En Espera`] = week[month]?.enEspera || 0;
                  acc[`${month} En Progreso`] = week[month]?.enProgreso || 0;
                  acc[`${month} Resuelto`] = week[month]?.resuelto || 0;
                  acc[`${month} Cancelado`] = week[month]?.cancelado || 0;
                  return acc;
                }, {}),
              };
            });

          monthMap[month] = transformedData;
        });

        yearMap[year] = Object.keys(monthMap)
          .sort((a, b) => monthOrder.indexOf(a.toLowerCase()) - monthOrder.indexOf(b.toLowerCase()))
          .reduce((acc, month) => {
            acc[month] = monthMap[month];
            return acc;
          }, {});
      });

      setData(yearMap);
      if (!selectedYear && Object.keys(yearMap).length > 0) {
        setSelectedYear("2025");
        setSelectedMonth("enero");
      }
    }
  }, [incidentsByStatus, selectedYear, monthOrder]);

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
      <Tabs activeKey={selectedYear} onChange={(year) => { setSelectedYear(year); setSelectedMonth(null); }}>
        {Object.keys(data).map((year) => (
          <TabPane tab={year} key={year}>
            <Tabs activeKey={selectedMonth} onChange={setSelectedMonth}>
              {Object.keys(data[year]).map((month) => (
                <TabPane tab={month} key={month}>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={data[year][month]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip position={{ y: 0 }} />
                        <Legend />
                        {["En Espera", "En Progreso", "Resuelto", "Cancelado"].map((status, index) => (
                          <Area
                            key={`${month}-${status}`}
                            type="monotone"
                            dataKey={`${month} ${status}`}
                            stroke={index % 2 === 0 ? "#8884d8" : "#82ca9d"}
                            fillOpacity={0.3}
                            fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"}
                            name={`${month} - ${status}`}
                          />
                        ))}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabPane>
              ))}
            </Tabs>
          </TabPane>
        ))}
      </Tabs>
    </Card>
  );
};

export default IncidentComparison;