import { useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { createInventory } from "../../services/inventoryApi";
import { useNavigate } from "react-router-dom";

export const CreateInventory = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        productName: "",
        availableQuantity: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createInventory(formData);

        alert("Inventory Added");

        navigate("/inventory");
    };

    return (
        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">
                Add Inventory
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow max-w-xl"
            >

                <input
                    name="productName"
                    placeholder="Product Name"
                    className="border w-full p-3 mb-5 rounded"
                    onChange={handleChange}
                />

                <input
                    name="availableQuantity"
                    type="number"
                    placeholder="Quantity"
                    className="border w-full p-3 mb-5 rounded"
                    onChange={handleChange}
                />

                <button className="bg-green-600 text-white px-5 py-3 rounded">
                    Add Inventory
                </button>

            </form>

        </DashboardLayout>
    );
};