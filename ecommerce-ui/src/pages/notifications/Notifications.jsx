import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { getNotifications } from "../../services/notificationApi";
import { FaBell } from "react-icons/fa";

export const Notifications = () => {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {

    try {

      const data = await getNotifications();

      setNotifications(data);

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

          Notifications

        </h1>

        <button
          onClick={fetchNotifications}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Refresh
        </button>

      </div>

      {

        loading ?

          <p>Loading...</p>

          :

          notifications.length === 0 ?

            <div className="bg-white rounded-xl shadow p-10 text-center">

              <FaBell
                size={50}
                className="mx-auto text-gray-400 mb-4"
              />

              <h2 className="text-xl font-semibold">

                No Notifications

              </h2>

              <p className="text-gray-500 mt-2">

                Notifications will appear here after orders are confirmed.

              </p>

            </div>

            :

            <div className="space-y-5">

              {

                notifications.map((notification) => (

                  <div
                    key={notification.id}
                    className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600"
                  >

                    <div className="flex justify-between items-start">

                      <div className="space-y-2">

                        <h2 className="text-xl font-bold">
                          📧 {notification.subject}
                        </h2>

                        <p>
                          <span className="font-semibold">
                            Order ID:
                          </span>{" "}
                          {notification.orderId}
                        </p>

                        <p>
                          <span className="font-semibold">
                            Recipient:
                          </span>{" "}
                          {notification.email}
                        </p>

                        <p className="text-gray-700">
                          {notification.message}
                        </p>

                      </div>

                      <span
                        className={`px-4 py-2 rounded-full font-semibold
                    ${notification.status === "SENT"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {notification.status}
                      </span>

                    </div>

                  </div>

                ))

              }

            </div>

      }

    </DashboardLayout>

  );
};