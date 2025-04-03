import React, { useState, useEffect, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useIncidents } from "../../../../hooks/IncidentsHooks/Incidents.hooks";

const YearlyComparisonChart = () => {
  const [data, setData] = useState([]);
  const { incidentsByStatus } = useIncidents();

  const monthsOrder = useMemo(
    () => [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ],
    []
  );

  const selectedYear = useMemo(() => {
    if (incidentsByStatus && incidentsByStatus.incidentsData) {
      const availableYears = Object.keys(incidentsByStatus.incidentsData).map(Number);
      return Math.max(...availableYears).toString();
    }
    return "2025";
  }, [incidentsByStatus]);

  useEffect(() => {
    if (incidentsByStatus && incidentsByStatus.incidentsData) {
      const currentYearData = incidentsByStatus.incidentsData[selectedYear] || {};
      const previousYearData = incidentsByStatus.incidentsData[(parseInt(selectedYear) - 1).toString()] || {};

      const transformedData = monthsOrder.map((month) => {
        const currentMonthData = currentYearData[month]?.monthly || {};
        const previousMonthData = previousYearData[month]?.monthly || {};

        return {
          month: month.slice(0, 3),
          actual: Object.values(currentMonthData).reduce((sum, count) => sum + count, 0),
          anterior: Object.values(previousMonthData).reduce((sum, count) => sum + count, 0),
        };
      });

      setData(transformedData);
    } else {
      setData([]);
    }
  }, [incidentsByStatus, selectedYear, monthsOrder]);

  return (
    <div
      className="yearly-comparison"
      style={{
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                borderColor: "#ddd",
                color: "#333",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
              itemStyle={{ color: "#333" }}
            />
            <Bar
              dataKey="actual"
              name="Año Actual"
              fill="#3566ff"
              barSize={40}
            />
            <Bar
              dataKey="anterior"
              name="Año Anterior"
              fill="#8a35ff"
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p style={{ color: "#666", textAlign: "center", marginTop: "20px" }}>
          No hay datos disponibles para mostrar.
        </p>
      )}
    </div>
  );
};

export default YearlyComparisonChart;