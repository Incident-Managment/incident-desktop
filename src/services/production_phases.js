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