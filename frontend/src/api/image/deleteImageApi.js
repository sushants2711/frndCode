import { baseUrl } from "../baseUrl";

export const deleteImageApi = async (albumId, imageId) => {
    try {
        const url = baseUrl + `/api/v1/image/delete/${albumId}/${imageId}`;

        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include"
        });

        const result = await response.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    };
};