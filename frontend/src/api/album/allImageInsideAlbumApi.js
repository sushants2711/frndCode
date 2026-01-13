import { baseUrl } from "../baseUrl";


export const allImageInsideAlbumApi = async (id) => {
    try {
        const url = baseUrl + `/api/v1/album/${id}/all-image`;

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