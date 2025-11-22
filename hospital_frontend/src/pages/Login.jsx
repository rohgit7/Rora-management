import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const tryLogin = async body => {
    try {
      const res = await api.post('/api/login', body)
      return { ok: true, status: res.status, token: res?.data?.token, user: res?.data?.user }
    } catch (err) {
      return { ok: false, status: err?.response?.status, message: err?.response?.data?.message }
    }
  }

  const onSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')
    const result = await tryLogin({ email, password })
    if (result.ok) {
      try {
        if (result.token) localStorage.setItem('auth_token', result.token)
        const em = result?.user?.email || email
        localStorage.setItem('auth_user_email', em)
      } catch {}
      setMessage('Logged in')
      navigate('/dashboard')
    } else {
      setError(result?.message || (result.status === 404 ? 'User not found. Please register.' : 'Login failed'))
    }
    setLoading(false)
  }

  return (
    <div className="card" style={{ maxWidth: 520, margin: '40px auto' }}>
      <div className="card-header">
        <div className="card-title">Login</div>
      </div>
      <form className="form-grid" onSubmit={onSubmit}>
        <div className="form-row">
          <div className="label">Email</div>
          <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-row">
          <div className="label">Password</div>
          <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div>
          <button className="btn primary" type="submit" disabled={loading}>Login</button>
          <button type="button" className="btn" style={{ marginLeft: 8 }} onClick={() => navigate('/register')}>Create account</button>
        </div>
        {error && <div className="state error">{error}</div>}
        {message && <div className="state">{message}</div>}
      </form>
    </div>
  )
}