import React from 'react'
import { FaBell, FaBoxes, FaCreditCard, FaHome, FaShoppingCart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {

    const menu = [
        {
            title:"Dashboard",
            path:"/dashboard",
            icon: <FaHome/>
        },

        {
            title: "Orders",
            path: "/orders",
            icon: <FaShoppingCart/>
        },

        {
            title: "Inventory",
            path: "/inventory",
            icon: <FaBoxes/>
        },

        {
            title: "Payments",
            path: "/payments",
            icon: <FaCreditCard/>
        },

        {
            title: "Notifications",
            path: "/notifications",
            icon: <FaBell/>
        }
    ];



  return (
    <aside className='w-64 bg-slate-900 shadow min-h-screen text-white '>

        <div className="ttext-2xl font-bold p-6 border-b border-slate-700">

                Ecommerce

            </div>

        <ul className="mt-4">

                {

                    menu.map((item) => (

                        <li key={item.path}>

                            <NavLink

                                to={item.path}

                                className={({ isActive }) =>

                                    `flex items-center gap-3 px-6 py-4 transition
                                    ${isActive
                                        ? "bg-blue-600"
                                        : "hover:bg-slate-800"
                                    }`

                                }

                            >

                                {item.icon}

                                {item.title}

                            </NavLink>

                        </li>

                    ))

                }

            </ul>
       
    </aside>
  );
};
