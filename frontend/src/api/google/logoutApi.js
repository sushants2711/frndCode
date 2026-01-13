import { baseUrl } from "../baseUrl";

export const logoutApi = async () => {
    try {
        const url = baseUrl + "/api/v1/google/logout";

        const response = await fetch(url, {
            method: "POST",
            credentials: "include"
        });

        const result = await response.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    };
};