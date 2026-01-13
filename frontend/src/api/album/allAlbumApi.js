import { baseUrl } from "../baseUrl";


export const allAlbumApi = async (name) => {
    try {
        const url = name ? baseUrl + `/api/v1/album/all?name=${name}` : baseUrl + `/api/v1/album/all`;

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
