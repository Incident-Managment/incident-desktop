import React, { useState } from "react";
import { DatePicker, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useIncidents } from "../../hooks/IncidentsHooks/Incidents.hooks";

export default function IncidentsByDateRange() {
    const { fetchIncidentsByDateRange } = useIncidents();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [, setIncidents] = useState([]);

    const handleFetchIncidents = async () => {
        if (startDate && endDate) {
            const data = await fetchIncidentsByDateRange(startDate, endDate);
            if (Array.isArray(data)) {
                setIncidents(data);
            } else {
                console.error("Fetched data is not an array:", data);
            }
        }
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Incidents Report</h3>
            <div style={styles.dateContainer}>
                <DatePicker
                    placeholder="Start Date"
                    format="DD/MM/YYYY"
                    onChange={(date) => setStartDate(date)}
                    style={styles.datePicker}
                />
                <span style={styles.separator}>to</span>
                <DatePicker
                    placeholder="End Date"
                    format="DD/MM/YYYY"
                    onChange={(date) => setEndDate(date)}
                    style={styles.datePicker}
                />
                <Button
                    type="text"
                    icon={<DownloadOutlined style={styles.icon} />}
                    onClick={handleFetchIncidents}
                />
            </div>
        </div>
    );
}

const styles = {
    container: {
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "25px",
        margin: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    title: {
        fontWeight: "bold",
        fontSize: "25px",
    },
    dateContainer: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    datePicker: {
        width: "200px",
    },
    separator: {
        margin: "0 10px",
        color: "#888",
    },
    icon: {
        color: "#1890ff",
        fontSize: "25px",
        cursor: "pointer",
    },
};