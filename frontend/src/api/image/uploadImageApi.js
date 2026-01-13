import { baseUrl } from "../baseUrl";

export const uploadImageApi = async (id, data) => {
    try {
        const url = baseUrl + `/api/v1/image/add/${id}`;
        console.log(url)
        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            body: data
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};