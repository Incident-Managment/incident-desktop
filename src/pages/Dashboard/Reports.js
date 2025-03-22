import React from "react";
import { Typography } from "antd";
import IncidentsByDateRange from "../../components/Reports/IncidentsByDateRange";

export default function Reports() {
    const { Title } = Typography;

    return (
        <div>
            <Title>Reportes</Title>
            <IncidentsByDateRange />
        </div>
    );
}