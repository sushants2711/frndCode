import { baseUrl } from "../baseUrl";

export const createAlbumApi = async (data) => {
    try {
        const url = baseUrl + "/api/v1/album/add";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
        });

        const result = await response.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    };
};