import React from 'react';
import { Card, Statistic, Typography } from 'antd';
import { AlertCircle, CheckCircle, Clock, Activity} from 'lucide-react';
import { useCountIncidentsByCompany } from '../../../hooks/DashboardHooks/counts.hooks';

const { Text } = Typography;

const TotalIncidentsCard = () => {
  const { count } = useCountIncidentsByCompany();

  return (
    <Card className="kpi-card">
      <div className="kpi-content">
        <div className="kpi-header">
          <div className="kpi-icon" style={{ backgroundColor: "#e6f7ff" }}>
            <AlertCircle size={24} style={{ color: "#1890ff" }} />
          </div>
          <Text type="secondary">Incidencias de hoy {new Date().toLocaleDateString()}</Text>       </div>
        <Statistic value={count} valueStyle={{ color: "#1890ff", fontSize: "28px" }} />
      </div>
    </Card>
  );
};

const ResolvedIncidentsCard = () => {
  const { resolvedCount  } = useCountIncidentsByCompany();

  return (
    <Card className="kpi-card">
      <div className="kpi-content">
        <div className="kpi-header">
          <div className="kpi-icon" style={{ backgroundColor: "#f6ffed" }}>
            <CheckCircle size={24} style={{ color: "#52c41a" }} />
          </div>
          <Text type="secondary">Incidencias Resueltas el dia de Hoy</Text>
        </div>
        <Statistic value={resolvedCount} valueStyle={{ color: "#52c41a", fontSize: "28px" }} />
      </div>
    </Card>
  );
};

const AverageResolutionTimeCard = () => {
  const { averageResolutionTime } = useCountIncidentsByCompany();

  return (
    <Card className="kpi-card">
      <div className="kpi-content">
        <div className="kpi-header">
          <div className="kpi-icon" style={{ backgroundColor: "#fff7e6" }}>
            <Clock size={24} style={{ color: "#faad14" }} />
          </div>
          <Text type="secondary">Tiempo Promedio</Text>
        </div>
        <Statistic
          value={averageResolutionTime.toFixed(2) + "h"}
          valueStyle={{ color: "#faad14", fontSize: "28px" }}
        />
      </div>
    </Card>
  );
};

const IncidentEfficiencyCard = () => {
  const { incidentEfficiency } = useCountIncidentsByCompany();

  return (
    <Card className="kpi-card">
      <div className="kpi-content">
        <div className="kpi-header">
          <div className="kpi-icon" style={{ backgroundColor: "#f9f0ff" }}>
            <Activity size={24} style={{ color: "#722ed1" }} />
          </div>
          <Text type="secondary">Eficiencia</Text>
        </div>
        <Statistic
          value={incidentEfficiency.toFixed(2) + "%"}
          valueStyle={{ color: "#722ed1", fontSize: "28px" }}
        />
      </div>
    </Card>
  );
};

export { TotalIncidentsCard, ResolvedIncidentsCard, AverageResolutionTimeCard, IncidentEfficiencyCard };