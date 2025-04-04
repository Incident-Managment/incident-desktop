import { fetchData, postData, putData } from "../config/api";

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

export const createMachines = async (data) => {
    try {
        const machines = await postData("machines/createMachines", data);
        return machines;
    } catch (error) {
        console.error("Error creating machine:", error.message);
        throw error;
    }
}

export const getMachineTypes = async () => {
    try {
        const machineTypes = await fetchData("machine_types/findMachineTypes");
        return machineTypes;
    } catch (error) {
        console.error("Error fetching machine types:", error.message);
        throw error;
    }
}

export const createMachineTypes = async (data) => {
    try {
        const machineTypes = await postData("machines/createMachineType", data);
        return machineTypes;
    } catch (error) {
        console.error("Error creating machine type:", error.message);
        throw error;
    }
}

export const getCompaniesGlobal = async () => {
    try {
        const companies = await fetchData("companies/getCompaniesGlobal");
        return companies;
    } catch (error) {
        console.error("Error fetching companies:", error.message);
        throw error;
    }
}

export const createCompanies = async (data) => {
    try {
        const companies = await postData("companies/createCompanies", data);
        return companies;
    } catch (error) {
        console.error("Error creating company:", error.message);
        throw error;
    }
}

export const editCompany = async (data) => {
    try {
        const companies = await putData("companies/editCompany", data);
        return companies;
    } catch (error) {
        console.error("Error editing company:", error.message);
        throw error;
    }
}