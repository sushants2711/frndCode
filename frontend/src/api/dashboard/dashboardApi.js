import { baseUrl } from "../baseUrl";


export const getAllDashboardApi = async () => {
    try {
        const url = baseUrl + "/api/v1/dashboard/all";

        const response = await fetch(url, {
            method: "GET",
            credentials: "include"
        });

        const result = await response.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    };
};