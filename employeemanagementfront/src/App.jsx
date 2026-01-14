import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Employees from './pages/Employees'
import { auth } from './services/auth'
import './App.css'

function PrivateRoute({ children }) {
  return auth.isAuthenticated() ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/employees/*"
        element={
          <PrivateRoute>
            <Employees />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/employees" replace />} />
    </Routes>
  )
}
