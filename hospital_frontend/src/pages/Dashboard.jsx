import React from 'react'
import { Link } from 'react-router-dom'

const items = [
  { to: '/patients', title: 'Patients', desc: 'Manage patient records' },
  { to: '/doctors', title: 'Doctors', desc: 'View and manage physicians' },
  { to: '/appointments', title: 'Appointments', desc: 'Scheduling and tracking' },
  { to: '/departments', title: 'Departments', desc: 'Hospital departments' },
  { to: '/billing', title: 'Billing', desc: 'Invoices and payments' },
  { to: '/rooms', title: 'Rooms', desc: 'Room inventory' },
  { to: '/medicines', title: 'Medicine', desc: 'Drug inventory' },
  { to: '/pharmacy', title: 'Pharmacy', desc: 'Dispensing log' },
  { to: '/ambulance', title: 'Ambulance', desc: 'Fleet status' }
]

export default function Dashboard() {
  return (
    <div className="grid">
      {items.map(it => (
        <Link key={it.to} to={it.to} className="tile">
          <div className="tile-title">{it.title}</div>
          <div className="tile-desc">{it.desc}</div>
        </Link>
      ))}
    </div>
  )
}