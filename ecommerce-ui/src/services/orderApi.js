import api from "../api/axiosConfig";

export const createOrder = async (order) => {

    const response = await api.post(
        "/api/orders",
        order
    );

    return response.data;
};

export const getOrders = async () => {

    const response =
        await api.get("/api/orders");

    return response.data;
};

export const getDashboardStats = async () => {
    const response = await api.get("/api/orders/dashboard");
    return response.data;
};