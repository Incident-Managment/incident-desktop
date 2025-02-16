import { fetchData } from "../config/api";

export const getRolesGlobal = async () => {
    try {
        const roles = await fetchData("roles/getRolesGlobal");
        return roles;
    } catch (error) {
        console.error("Error fetching roles:", error.message);
        throw error;
    }
}