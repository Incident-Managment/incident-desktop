import { fetchData } from "../config/api";

export const getMachinesByCompany = async (companyId) => {
    try {
        const machinesByCompany = await fetchData(`machines/getMachinesByCompany?companyId=${companyId}`);
        return machinesByCompany;
    } catch (error) {
        console.error("Error fetching machines by company:", error.message);
        throw error;
    }
};

export const getMachinesByType = async (typeId) => {
    try {
        const machinesByType = await fetchData(`machines/getMachinesGlobal?typeId=${typeId}`);
        return machinesByType;
    } catch (error) {
        console.error("Error fetching machines by type:", error.message);
        throw error;
    }
};

export const getCompaniesGlobal = async () => {
    try {
        const companies = await fetchData("companies/getCompaniesGlobal");
        return companies;
    } catch (error) {
        console.error("Error fetching companies:", error.message);
        throw error;
    }
}