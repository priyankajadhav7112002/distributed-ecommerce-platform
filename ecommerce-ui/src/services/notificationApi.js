import api from "../api/axiosConfig";

export const getNotifications = async () => {

    const response = await api.get("/api/notifications");

    return response.data;
};