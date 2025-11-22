import axios from 'axios'

const api = axios.create({
  baseURL:'http://localhost:3000',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
})

api.interceptors.request.use(config => {
  try {
    const token = localStorage.getItem('auth_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  } catch {}
  return config
})

// Response interceptor to handle authentication errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token is invalid or expired, clear auth data
      try {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user_email')
        // Redirect to login if not already there
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
          window.location.href = '/login'
        }
      } catch {}
    }
    return Promise.reject(error)
  }
)

export default api