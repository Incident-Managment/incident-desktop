import { fetchData } from "../config/api";

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
        const statusHistory = await fetchData(`incidents/incidentStatusHistoryByIncident?incidentId=${incidentId}`);
        return statusHistory;
    } catch (error) {
        console.error("Error fetching incident status history:", error.message);
        throw error;
    }
}

export const getCountIncidentsByCompany = async (companyId) => {
    try {
        const countIncidentsByCompany = await fetchData(`incidents/countIncidentsByCompany?companyId=${companyId}`);
        return countIncidentsByCompany;
    }
    catch (error) {
        console.error("Error fetching incidents:", error.message);
        throw error;
    }
}

export const getCountIncidentsResolvedByCompany = async (companyId) => {
    try {
        const countIncidentsByCompany = await fetchData(`incidents/countIncidentsResolvedByCompany?companyId=${companyId}`);
        return countIncidentsByCompany;
    }
    catch (error) {
        console.error("Error fetching incidents:", error.message);
        throw error;
    }
}

export const averageResolutionTimeByCompany = async (companyId) => {
    try {
        const countIncidentsByCompany = await fetchData(`incidents/averageResolutionTimeByCompany?companyId=${companyId}`);
        return countIncidentsByCompany;
    }
    catch (error) {
        console.error("Error fetching incidents:", error.message);
        throw error;
    }
}

export const incidentEfficiencyByCompany = async (companyId) => {
    try {
        const countIncidentsByCompany = await fetchData(`incidents/incidentEfficiencyByCompany?companyId=${companyId}`);
        return countIncidentsByCompany;
    }
    catch (error) {
        console.error("Error fetching incidents:", error.message);
        throw error;
    }
}

