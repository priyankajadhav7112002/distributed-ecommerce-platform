import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../../services/orderApi';
import { useAuth } from '../../context/AuthContext';

export const Orders = () => {

  const { role } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchOrders = async () => {

    try {
      const data = await getOrders()
      setOrders(data);
    } catch (error) {

      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    fetchOrders();

  }, []);

  return (
    <DashboardLayout>

      <div className='flex justify-between items-center mb-8'>
        <h1 className="text-3xl font-bold">

          Orders

        </h1>


        {
          role === "ADMIN" && (

            <button onClick={() => navigate("/orders/create")} className='bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-lg'>
              + Create Order
            </button>

          )
        }
      </div>
      <div>
        {loading ?
          <p>Loading...</p>
          :
          <table className='w-full rounded-xl shadow bg-white'>
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-4">ID</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Status</th>

              </tr>
            </thead>

            <tbody>
              {
                orders.length === 0 ? (

                  <tr>
                    <td
                      colSpan="5"
                      className="text-center p-8 text-gray-500"
                    >
                      No Orders Found
                    </td>
                  </tr>

                ) : (
                  orders.map(order => (
                    <tr
                      key={order.id}
                      className="text-center border-b hover:bg-gray-50 transition"
                    >

                      <td className="p-4">
                        {order.id}
                      </td>

                      <td>
                        {order.productName}
                      </td>

                      <td>
                        {order.quantity}
                      </td>

                      <td>
                        ₹ {order.price.toLocaleString()}
                      </td>

                      <td>

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold
        ${order.status === "CONFIRMED"
                              ? "bg-green-100 text-green-700"
                              : order.status === "CREATED"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                        >
                          {order.status}
                        </span>

                      </td>

                    </tr>

                  )))
              }
            </tbody>
          </table>
        }
      </div>

    </DashboardLayout>
  )
}
