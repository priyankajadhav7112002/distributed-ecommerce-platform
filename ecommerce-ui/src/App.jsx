import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/auth/Login'
import { DashboardLayout } from './layouts/DashboardLayout'
import { Dashboard } from './pages/dashboard/Dashboard'
import Register from './pages/auth/Register'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Orders } from './pages/orders/Orders'
import { Inventory } from './pages/inventory/Inventory'
import { Payments } from './pages/payments/Payments'
import { Notifications } from './pages/notifications/Notifications'
import { CreateOrder } from './pages/orders/CreateOrder'
import { CreateInventory } from './pages/inventory/CreateInventory'


function App() {


  return (
    <BrowserRouter>

      <Routes>
        <Route
          path='/'
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
              <Inventory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
              <Payments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/create"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
              <CreateOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory/create"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CreateInventory />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App
