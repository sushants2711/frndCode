import { baseUrl } from "../baseUrl";

export const fetchSingleImageApi = async (albumId, imageId) => {
    try {
        const url = baseUrl + `/api/v1/image/single/${albumId}/${imageId}`;

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