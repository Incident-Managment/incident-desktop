import { fetchData, postData } from "../config/api";

export const getProductionPhasesByCompany = async (companyId) => {
    try {
        const productionPhasesByCompany = await fetchData(`productionPhasesByCompany?companyId=${companyId}`);
        return productionPhasesByCompany;
    } catch (error) {
        console.error("Error fetching production phases:", error.message);
        throw error;
    }
};

export const updateProductionPhase = async (data) => {
    try {
        const updatedProductionPhase = await postData(`production_phases/update`, data);
        return updatedProductionPhase;
    } catch (error) {
        console.error("Error updating production phase:", error.message);
        throw error;
    }
};

export const getPhasesAndMachines = async (phase_id,companyId) => {
    try {
        const phasesAndMachines = await fetchData(`phases_machine/getMachinesByPhase?phase_id=${phase_id}&company_id=${companyId}`);
        return phasesAndMachines;
    }
    catch (error) {
        console.error("Error fetching phases and machines:", error.message);
        throw error;
    }
}

export const createProductionPhase = async (data) => {
    try {
        const createdProductionPhase = await postData(`production_phases/createProductionPhase`, data);
        return createdProductionPhase;
    } catch (error) {
        console.error("Error creating production phase:", error.message);
        throw error;
    }
}

export const addMachineToPhase = async (data) => {
    try {
        const addedMachine = await postData(`phases_machine/addMachinesToPhase`, data);
        return addedMachine;
    }
    catch (error) {
        console.error("Error adding machine to phase:", error.message);
        throw error;
    }
}