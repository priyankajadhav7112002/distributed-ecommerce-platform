import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { getInventory } from "../../services/inventoryApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Inventory = () => {

  const { role } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const data = await getInventory();
      setItems(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Inventory
        </h1>

        <div className="flex gap-3">



          {
            role === "ADMIN" && (

              <button
                onClick={() => navigate("/inventory/create")}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
              >
                + Add Inventory
              </button>

            )
          }

          <button
            onClick={fetchInventory}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Refresh
          </button>

        </div>

      </div>

      {
        loading ?

          <p>Loading...</p>

          :

          <table className="w-full bg-white rounded-xl shadow">

            <thead className="bg-slate-900 text-white">

              <tr>

                <th className="p-4">ID</th>
                <th>Product</th>
                <th>Available Quantity</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {

                items.map(item => (

                  <tr
                    key={item.id}
                    className="text-center border-b hover:bg-gray-50"
                  >

                    <td className="p-4">{item.id}</td>

                    <td>{item.productName}</td>

                    <td>{item.availableQuantity}</td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold
                                                ${item.availableQuantity === 0
                            ? "bg-red-100 text-red-700"
                            : item.availableQuantity < 10
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                      >

                        {
                          item.availableQuantity === 0
                            ? "Out of Stock"
                            : item.availableQuantity < 10
                              ? "Low Stock"
                              : "In Stock"
                        }

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