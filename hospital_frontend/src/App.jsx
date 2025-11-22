import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Patients from './pages/Patients'
import Doctors from './pages/Doctors'
import Appointments from './pages/Appointments'
import Departments from './pages/Departments'
import Billing from './pages/Billing'
import Rooms from './pages/Rooms'
import Medicines from './pages/Medicines'
import Pharmacy from './pages/Pharmacy'
import Ambulance from './pages/Ambulance'
import api from './lib/api'

const RequireAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null) // null = checking, true/false = result
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        if (!token) {
          setIsAuthenticated(false)
          setLoading(false)
          return
        }

        // Verify token with backend
        try {
          const res = await api.get('/api/login/verify')
          if (res.data?.valid) {
            setIsAuthenticated(true)
          } else {
            setIsAuthenticated(false)
            localStorage.removeItem('auth_token')
            localStorage.removeItem('auth_user_email')
          }
        } catch (err) {
          // Token invalid or expired
          setIsAuthenticated(false)
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_user_email')
        }
      } catch {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

const RequireGuest = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        if (!token) {
          setIsAuthenticated(false)
          setLoading(false)
          return
        }

        try {
          const res = await api.get('/api/login/verify')
          setIsAuthenticated(res.data?.valid || false)
        } catch {
          setIsAuthenticated(false)
        }
      } catch {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<RequireGuest><Login /></RequireGuest>} />
          <Route path="/register" element={<RequireGuest><Register /></RequireGuest>} />
          <Route path="/" element={<RequireAuth><Landing /></RequireAuth>} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/patients" element={<RequireAuth><Patients /></RequireAuth>} />
          <Route path="/doctors" element={<RequireAuth><Doctors /></RequireAuth>} />
          <Route path="/appointments" element={<RequireAuth><Appointments /></RequireAuth>} />
          <Route path="/departments" element={<RequireAuth><Departments /></RequireAuth>} />
          <Route path="/billing" element={<RequireAuth><Billing /></RequireAuth>} />
          <Route path="/rooms" element={<RequireAuth><Rooms /></RequireAuth>} />
          <Route path="/medicines" element={<RequireAuth><Medicines /></RequireAuth>} />
          <Route path="/pharmacy" element={<RequireAuth><Pharmacy /></RequireAuth>} />
          <Route path="/ambulance" element={<RequireAuth><Ambulance /></RequireAuth>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}