import { fetchData } from "../config/api";

export const getMachinesByCompany = async (companyId) => {
    try {
        // Asegurándonos de pasar el parámetro companyId en la URL
        const machinesByCompany = await fetchData(`machines/getMachinesGlobal?companyId=${companyId}`);
        return machinesByCompany;  // Retornamos las máquinas obtenidas
    } catch (error) {
        console.error("Error fetching machines by company:", error.message);
        throw error; // Lanzamos el error para que se pueda manejar donde se llama a esta función
    }
};

export const getMachinesByType = async (typeId) => {
    try {
        // Asegurándonos de pasar el parámetro typeId en la URL
        const machinesByType = await fetchData(`machines/getMachinesGlobal?typeId=${typeId}`);
        return machinesByType;  // Retornamos las máquinas obtenidas
    } catch (error) {
        console.error("Error fetching machines by type:", error.message);
        throw error;
    }
};
