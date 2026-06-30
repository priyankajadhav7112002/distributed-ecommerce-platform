import api from "../api/axiosConfig";

export const getPayments = async () => {
    const response = await api.get("/api/payments");
    return response.data;
};