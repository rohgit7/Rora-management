import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Stethoscope, Calendar, Home, CreditCard, Pill, Ambulance, Activity, ArrowRight } from 'lucide-react'
import api from '../lib/api'

export default function Landing() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    scheduledAppointments: 0,
    availableRooms: 0,
    pendingBills: 0,
    lowStockMedicines: 0,
    ambulancesAvailable: 0
  })
  const [upcoming, setUpcoming] = useState([])
  const [billing, setBilling] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
    setLoading(true)
    api.get('/api/summary')
      .then(res => {
        const stats = res.data?.stats || {}
        const upcoming = res.data?.upcoming || []
        const billing = res.data?.billing || []
        setStats({
          patients: stats.patients || 0,
          doctors: stats.doctors || 0,
          scheduledAppointments: stats.scheduledAppointments || 0,
          availableRooms: stats.availableRooms || 0,
          pendingBills: stats.pendingBills || 0,
          lowStockMedicines: stats.lowStockMedicines || 0,
          ambulancesAvailable: stats.ambulancesAvailable || 0
        })
        setUpcoming(upcoming)
        setBilling(billing)
      })
      .catch(err => setError(err?.response?.data?.message || 'Failed to load summary'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="landing">
      <div className="hero">
        <div>
          <div className="hero-title">Welcome to RORA Hospital</div>
          <div className="hero-sub">Monitor operations and access key modules</div>
        </div>
        <div className="hero-actions">
          <Link to="/dashboard" className="btn primary"><ArrowRight size={16} style={{ marginRight: 8 }} /> Open Dashboard</Link>
          <Link to="/patients" className="btn"><Users size={16} style={{ marginRight: 8 }} /> Quick Patients</Link>
        </div>
      </div>

      {loading && <div className="state">Loading</div>}
      {!loading && error && <div className="state error">{error}</div>}
      {!loading && !error && (
        <>
          <div className="stats-grid" style={{ marginTop: 16 }}>
            <div className="stat-card">
              <Users size={24} color="#3b82f6" />
              <div>
                <div className="stat-title">Patients</div>
                <div className="stat-value">{stats.patients}</div>
                <div className="stat-trend">+2.1% this week</div>
              </div>
            </div>
            <div className="stat-card">
              <Stethoscope size={24} color="#3b82f6" />
              <div>
                <div className="stat-title">Doctors</div>
                <div className="stat-value">{stats.doctors}</div>
                <div className="stat-trend">Active on-duty</div>
              </div>
            </div>
            <div className="stat-card">
              <Calendar size={24} color="#3b82f6" />
              <div>
                <div className="stat-title">Scheduled Appointments</div>
                <div className="stat-value">{stats.scheduledAppointments}</div>
                <div className="stat-trend">Today</div>
              </div>
            </div>
            <div className="stat-card">
              <Home size={24} color="#3b82f6" />
              <div>
                <div className="stat-title">Available Rooms</div>
                <div className="stat-value">{stats.availableRooms}</div>
                <div className="stat-trend">Ready</div>
              </div>
            </div>
            <div className="stat-card">
              <CreditCard size={24} color="#3b82f6" />
              <div>
                <div className="stat-title">Pending Bills</div>
                <div className="stat-value">{stats.pendingBills}</div>
                <div className="stat-trend">Awaiting payment</div>
              </div>
            </div>
            <div className="stat-card">
              <Pill size={24} color="#3b82f6" />
              <div>
                <div className="stat-title">Low Stock Medicines</div>
                <div className="stat-value">{stats.lowStockMedicines}</div>
                <div className="stat-trend">Restock soon</div>
              </div>
            </div>
            <div className="stat-card">
              <Ambulance size={24} color="#3b82f6" />
              <div>
                <div className="stat-title">Ambulances Available</div>
                <div className="stat-value">{stats.ambulancesAvailable}</div>
                <div className="stat-trend">On standby</div>
              </div>
            </div>
            <div className="stat-card">
              <Activity size={24} color="#3b82f6" />
              <div>
                <div className="stat-title">System Health</div>
                <div className="stat-value">OK</div>
                <div className="stat-trend">All services operational</div>
              </div>
            </div>
          </div>

          <div className="subgrid">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Upcoming Appointments</div>
                <Link to="/appointments" className="btn ghost">View All</Link>
              </div>
              <div className="table landing-table">
                <div className="table-header">
                  <div className="th">Patient</div>
                  <div className="th">Doctor</div>
                  <div className="th">Date</div>
                  <div className="th">Status</div>
                </div>
                {upcoming.map((a, i) => (
                  <div key={i} className="tr">
                    <div className="td">{String(a.patient_name ?? a.patient_id ?? '')}</div>
                    <div className="td">{String(a.doctor_name ?? a.doctor_id ?? '')}</div>
                    <div className="td">{new Date(a.appointment_date || a.date).toLocaleString()}</div>
                    <div className="td">{String(a.status ?? '')}</div>
                  </div>
                ))}
                {upcoming.length === 0 && <div className="state">No upcoming items</div>}
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Recent Billing</div>
                <Link to="/billing" className="btn ghost">View All</Link>
              </div>
              <div className="table landing-table">
                <div className="table-header">
                  <div className="th">Patient</div>
                  <div className="th">Amount</div>
                  <div className="th">Status</div>
                  <div className="th">Date</div>
                </div>
                {billing.map((b, i) => (
                  <div key={i} className="tr">
                    <div className="td">{String(b.patient_name ?? b.patient_id ?? '')}</div>
                    <div className="td">{String(b.amount ?? '')}</div>
                    <div className="td">{String(b.status ?? '')}</div>
                    <div className="td">{String(b.date ?? '')}</div>
                  </div>
                ))}
                {billing.length === 0 && <div className="state">No billing records</div>}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div className="grid">
              <Link to="/patients" className="tile"><div className="tile-title"><Users size={18} /> Patients</div><div className="tile-desc">Manage patient records</div></Link>
              <Link to="/appointments" className="tile"><div className="tile-title"><Calendar size={18} /> Appointments</div><div className="tile-desc">Scheduling and tracking</div></Link>
              <Link to="/rooms" className="tile"><div className="tile-title"><Home size={18} /> Rooms</div><div className="tile-desc">Inventory and availability</div></Link>
              <Link to="/billing" className="tile"><div className="tile-title"><CreditCard size={18} /> Billing</div><div className="tile-desc">Invoices and payments</div></Link>
              <Link to="/medicines" className="tile"><div className="tile-title"><Pill size={18} /> Medicine</div><div className="tile-desc">Stock and expiry</div></Link>
              <Link to="/ambulance" className="tile"><div className="tile-title"><Ambulance size={18} /> Ambulance</div><div className="tile-desc">Fleet status and logs</div></Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}