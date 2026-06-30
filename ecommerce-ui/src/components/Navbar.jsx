import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

export const Navbar = () => {

    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = ()=>{

        logout();
        navigate('/');
        
    }
  return (
    <nav className='bg-white shadow flex justify-between items-center px-8 py-4'>
        <h2 className="text-xl font-bold">

                    Ecommerce Admin Dashboard

                </h2>
        <div className='flex items-center gap-6'>
            <FaUserCircle
              size={34}
              className='text-gray-600'
            />
        
        <button 
            onClick={handleLogout}
            className='bg-red-500 hover:bg-red-800 text-white rounded px-4 py-2'>
            Logout
        </button>
        </div>
    </nav>
  )
}
