import React from "react";
import { List, Avatar, Tag, Typography, Card } from "antd";
import { AlertCircle, CheckCircle, Clock, Activity } from "lucide-react";
import { useIncidents } from "../../../../hooks/IncidentsHooks/Incidents.hooks";

const { Text } = Typography;

export const getStatusIcon = (status) => {
    switch (status) {
        case "Resuelto":
            return <CheckCircle size={16} className="status-resolved" />
        case "En Progreso":
            return <Activity size={16} className="status-progress" />
        case "Pendiente":
            return <Clock size={16} className="status-pending" />
        default:
            return <AlertCircle size={16} />
    }
}

export const getStatusColor = (status) => {
    switch (status) {
        case "Resuelto":
            return "#52c41a"
        case "En Progreso":
            return "#1890ff"
        case "Pendiente":
            return "#faad14"
        default:
            return "#8c8c8c"
    }
}

const ActiveIncidents = () => {
    const { incidents } = useIncidents();

    const activeIncidents = incidents
        .filter(
            (incident) =>
                (incident.priority === "Alta" || incident.priority === "Media" || incident.priority === "Baja") &&
                (incident.status === "En Espera" || incident.status === "En Progreso") &&
                incident.status !== "Cancelado" &&
                incident.status !== "Resuelto"
        )
        .sort((a, b) => 
            new Date(b.creation_date).setHours(new Date(b.creation_date).getHours() + 7) - 
            new Date(a.creation_date).setHours(new Date(a.creation_date).getHours() + 7)
        );
    
    return (
        <Card title="Incidencias Activas" className="active-incidents-card">
        <List
            className="active-incidents-list"
            itemLayout="horizontal"
            dataSource={activeIncidents}
            style={{ maxHeight: '345px', overflowY: 'auto' }}
            renderItem={(item) => {
                const adjustedDate = new Date(item.creation_date);
                adjustedDate.setHours(adjustedDate.getHours() + 7);
        
                return (
                    <List.Item actions={[]}>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    icon={getStatusIcon(item.status)}
                                    style={{
                                        backgroundColor:
                                            item.status === "Resuelto" ? "#f6ffed" : item.status === "En Progreso" ? "#e6f7ff" : "#fffbe6",
                                        color: getStatusColor(item.status),
                                    }}
                                />
                            }
                            title={
                                <div>
                                    <Text strong>{item.title}</Text>
                                    <Tag color={getStatusColor(item.status)} style={{ marginLeft: "8px" }}>
                                        {item.status}
                                    </Tag>
                                    <Tag color={item.priority === "Alta" ? "red" : item.priority === "Media" ? "orange" : "green"}>
                                        {item.priority}
                                    </Tag>
                                </div>
                            }
                            description={
                                <div>
                                    <Text type="secondary">{item.description}</Text>
                                    <div className="incident-meta">
                                        <Tag color="default">{item.category}</Tag>
                                        <Text type="secondary" style={{ display: "block" }}>
                                            Fecha: {adjustedDate.toLocaleString()}
                                        </Text>
                                    </div>
                                </div>
                            }
                        />
                    </List.Item>
                );
            }}
        />
    </Card>
    );
};

export default ActiveIncidents;