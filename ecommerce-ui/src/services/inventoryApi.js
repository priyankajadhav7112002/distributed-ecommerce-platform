import api from "../api/axiosConfig";

export const getInventory = async () => {
    const response = await api.get("/api/inventory");
    return response.data;
};

export const createInventory = async (inventory) => {
    const response = await api.post("/api/inventory", inventory);
    return response.data;
};