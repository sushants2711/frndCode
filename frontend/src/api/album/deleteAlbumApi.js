import { baseUrl } from "../baseUrl";

export const deleteAlbumApi = async (id) => {
    try {
        const url = baseUrl + `/api/v1/album/delete-album/${id}`;

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