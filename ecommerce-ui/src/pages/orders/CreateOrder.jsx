import { useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { createOrder } from "../../services/orderApi";
import { useNavigate } from "react-router-dom";

export const CreateOrder = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        productName: "",
        quantity: "",
        price: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createOrder(formData);

            alert("Order Created Successfully");

            navigate("/orders");

        } catch (error) {

            console.log(error);

            alert("Unable to create order");

        }

    };

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">

                Create Order

            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow max-w-xl"
            >

                <input
                    className="border w-full p-3 mb-5 rounded"
                    placeholder="Product Name"
                    name="productName"
                    onChange={handleChange}
                />

                <input
                    className="border w-full p-3 mb-5 rounded"
                    placeholder="Quantity"
                    type="number"
                    name="quantity"
                    onChange={handleChange}
                />

                <input
                    className="border w-full p-3 mb-5 rounded"
                    placeholder="Price"
                    type="number"
                    name="price"
                    onChange={handleChange}
                />

                <button className="bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700">

                    Create Order

                </button>

            </form>

        </DashboardLayout>

    );

};