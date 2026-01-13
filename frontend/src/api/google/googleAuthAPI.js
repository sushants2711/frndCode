import axios from "axios";
import { baseUrl } from "../baseUrl";

export const googleAuthLogin = async (code) => {
    try {
        if (!code) {
            throw new Error("Google code not found");
        }

        const url = `${baseUrl}/api/v1/google?code=${code}`;
        const response = await axios.get(url, { withCredentials: true });
        return response.data;

    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
