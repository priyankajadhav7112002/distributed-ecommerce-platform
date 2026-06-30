import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export const DashboardLayout = ({ children
}) => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 p-8'>
          {children}
        </main>
      </div>

    </div>
  )
}
