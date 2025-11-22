import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Users, Stethoscope, Calendar, Building2, CreditCard, Home, KeySquare, Pill, Package, Ambulance, LayoutDashboard, LogOut } from 'lucide-react'
import api from '../lib/api'

export default function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('auth_token')
        const email = localStorage.getItem('auth_user_email')
        setIsAuthenticated(!!token)
        setUserEmail(email || '')
      } catch {
        setIsAuthenticated(false)
      }
    }
    checkAuth()
    // Check auth periodically
    const interval = setInterval(checkAuth, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleLogout = async () => {
    try {
      await api.post('/api/login/logout')
    } catch {}
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user_email')
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">RORA Hospital</div>
        <nav className="nav">
          {isAuthenticated && (
            <>
              <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <LayoutDashboard size={18} /> Dashboard
              </NavLink>
              <NavLink to="/patients" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Users size={18} /> Patients
              </NavLink>
              <NavLink to="/doctors" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Stethoscope size={18} /> Doctors
              </NavLink>
              <NavLink to="/appointments" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Calendar size={18} /> Appointments
              </NavLink>
              <NavLink to="/departments" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Building2 size={18} /> Departments
              </NavLink>
              <NavLink to="/billing" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <CreditCard size={18} /> Billing
              </NavLink>
              <NavLink to="/rooms" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Home size={18} /> Rooms
              </NavLink>
              <NavLink to="/medicines" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Pill size={18} /> Medicine
              </NavLink>
              <NavLink to="/pharmacy" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Package size={18} /> Pharmacy
              </NavLink>
              <NavLink to="/ambulance" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Ambulance size={18} /> Ambulance
              </NavLink>
            </>
          )}
          {!isAuthenticated && (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <KeySquare size={18} /> Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <KeySquare size={18} /> Register
              </NavLink>
            </>
          )}
        </nav>
      </aside>
      <div className="content">
        <header className="header">
          <div className="header-title">Hospital Management</div>
          <div className="toolbar" style={{ justifySelf: 'end', display: 'flex', gap: '8px', alignItems: 'center' }}>
            {isAuthenticated && (
              <>
                <span style={{ fontSize: '0.9rem', color: '#666' }}>{userEmail}</span>
                <button onClick={handleLogout} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <LogOut size={16} /> Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <NavLink to="/login" className="btn">Login</NavLink>
                <NavLink to="/register" className="btn">Register</NavLink>
              </>
            )}
          </div>
        </header>
        <main className="main">{children}</main>
        <footer className="footer">
          <div className="footer-left">© {new Date().getFullYear()} RORA Hospital Management</div>
          <div className="footer-right">Built with Vite + React</div>
        </footer>
      </div>
    </div>
  )
}