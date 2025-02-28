import { fetchData,postData } from "../config/api";

export const assigned_tasks = async (incident_id, assigned_user_id,company_id,assignment_date) => {
    try {
        const data = await postData("tasks/create", { incident_id, assigned_user_id,company_id,assignment_date });
        return data;
    } catch (error) {
        console.error("Error logging in:", error.message);
        throw error;
    }
};

export const featureTechnicians = async () => {
    try {
        const data = await fetchData("assigned_tasks/featureTechnicians");
        return data;
    } catch (error) {
        console.error("Error logging in:", error.message);
        throw error;
    }
}
