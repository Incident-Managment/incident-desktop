import { fetchData, postData } from "../config/api";

export const getIncidentsByCompany = async (companyId) => {
    try {
        const incidentsByCompany = await fetchData(`incidentsByCompany?companyId=${companyId}`);
        return incidentsByCompany;
    } catch (error) {
        console.error("Error fetching incidents:", error.message);
        throw error;
    }
};

export const getIncidentStatusHistory = async (incidentId) => {
    try {
        const statusHistory = await fetchData(`incidentStatusHistoryByIncident?incidentId=${incidentId}`);
        return statusHistory;
    } catch (error) {
        console.error("Error fetching incident status history:", error.message);
        throw error;
    }
}