import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { getPayments } from "../../services/paymentApi";

export const Payments = () => {

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {

        try {

            const data = await getPayments();

            setPayments(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    return (

        <DashboardLayout>

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">
                    Payments
                </h1>

                <button
                    onClick={fetchPayments}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                    Refresh
                </button>

            </div>

            {
                loading ?

                    <p>Loading...</p>

                    :

                    <table className="w-full bg-white rounded-xl shadow">

                        <thead className="bg-slate-900 text-white">

                            <tr>

                                <th className="p-4">ID</th>
                                <th>Order ID</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                payments.map(payment => (

                                    <tr
                                        key={payment.id}
                                        className="text-center border-b hover:bg-gray-50"
                                    >

                                        <td className="p-4">
                                            {payment.id}
                                        </td>

                                        <td>
                                            {payment.orderId}
                                        </td>

                                        <td>
                                            {payment.productName}
                                        </td>

                                        <td>
                                            {payment.quantity}
                                        </td>

                                        <td>

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold
                                                ${
                                                    payment.paymentStatus === "SUCCESS"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >

                                                {payment.paymentStatus}

                                            </span>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

            }

        </DashboardLayout>

    );
};