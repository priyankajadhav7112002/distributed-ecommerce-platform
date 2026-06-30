import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { StatCard } from "../../components/StatCard";
import { getDashboardStats } from "../../services/orderApi";

export const Dashboard = () => {

    const [stats, setStats] = useState({
        totalOrders: 0,
        confirmedOrders: 0,
        createdOrders: 0
    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getDashboardStats();
            setStats(data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <StatCard
                    title="Total Orders"
                    value={stats.totalOrders}
                    color="bg-blue-600"
                />

                <StatCard
                    title="Confirmed Orders"
                    value={stats.confirmedOrders}
                    color="bg-green-600"
                />

                <StatCard
                    title="Created Orders"
                    value={stats.createdOrders}
                    color="bg-orange-500"
                />

            </div>

        </DashboardLayout>

    );

};