import { baseUrl } from "../baseUrl";

export const toggleToFavImage = async (albId, imgId) => {
    try {
        const url = baseUrl + `/api/v1/image/favorite/${albId}/${imgId}`;

        const response = await fetch(url, {
            method: "PUT",
            credentials: "include"
        });

        const result = await response.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    };
};