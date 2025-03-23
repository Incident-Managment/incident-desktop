import { fetchData, postData } from "../config/api";

export const getUsers = async () => {
    try {
        const users = await fetchData("users/usersGlobal");
        return users;
    } catch (error) {
        console.error("Error fetching users:", error.message);
        throw error;
    }
};

export const createUsers = async (data) => {
    try {
        const users = await postData("users/create", data);
        return users;
    } catch (error) {
        console.error("Error creating user:", error.message);
        throw error;
    }
}

export const updateUser = async (data) => {
    try {
        const user = await postData("users/updateUser", data);
        return user;
    } catch (error) {
        console.error("Error updating user:", error.message);
        throw error;
    }
}

export const login = async (email, password) => {
    try {
        const data = await postData("users/login", { email, password });
        return data;
    } catch (error) {
        console.error("Error logging in:", error.message);
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const user = await fetchData(`users/getUserById/${id}`);
        return user;
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error.message);
        throw error;
    }
};

export const getechniqueUsersByRoleAndCompany= async (id) => {
    try {
        const user = await fetchData(`users/techniqueUsersByRoleAndCompany`);
        return user;
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error.message);
        throw error;
    }
};

export const getUsersByCompany = async (companyId) => {
    try {
        const users = await fetchData(`users/getUsersByCompany?companyId=${companyId}`);
        return users;
    } catch (error) {
        console.error("Error fetching users:", error.message);
        throw error;
    }
}