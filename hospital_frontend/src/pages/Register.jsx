import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'
import { userSchema} from '../forms/schemas'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const tryRegister = async body => {
    try { await api.post('/api/register', body); return { ok: true } } catch (err) { return { ok: false, message: err?.response?.data?.message } }
  }

  const tryLogin = async body => {
    try {
      const res = await api.post('/api/login', body)
      return { ok: true, token: res?.data?.token, user: res?.data?.user }
    } catch (err) {
      return { ok: false, message: err?.response?.data?.message }
    }
  }

  const onSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')
    const result = await tryRegister({ name, email, password })
    if (result.ok) {
      const login = await tryLogin({ email, password })
      if (login.ok) {
        try {
          if (login.token) localStorage.setItem('auth_token', login.token)
          localStorage.setItem('auth_user_email', login?.user?.email || email)
        } catch {}
        setMessage('Registered and logged in')
        navigate('/dashboard')
      } else {
        setMessage('Registered');
        navigate('/login')
      }
    } else {
      setError(result?.message || 'Registration failed')
    }
    setLoading(false)
  }

  return (
    <div className="card" style={{ maxWidth: 520, margin: '40px auto' }}>
      <div className="card-header">
        <div className="card-title">Register</div>
      </div>
      <form className="form-grid" onSubmit={onSubmit}>
        <div className="form-row">
          <div className="label">Name</div>
          <input className="input" type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="form-row">
          <div className="label">Email</div>
          <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-row">
          <div className="label">Password</div>
          <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div>
          <button className="btn primary" type="submit" disabled={loading}>Register</button>
        </div>
        {error && <div className="state error">{error}</div>}
        {message && <div className="state">{message}</div>}
      </form>
    </div>
  )
}