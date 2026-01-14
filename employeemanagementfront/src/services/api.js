const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:44367'

export function getToken() {
  return localStorage.getItem('token') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

export function setToken(token) {
  if (typeof token !== 'string') return
  localStorage.setItem('token', token)
}

export function clearToken() {
  localStorage.removeItem('token')
}

function authHeader() {
  try {
    const token = getToken()
    if (!token) return {}

    const trimmed = token.trim()
    if (!trimmed) return {}

    if (trimmed.toLowerCase().startsWith('bearer ')) {
      return { Authorization: trimmed }
    }

    return { Authorization: `Bearer ${trimmed}` }
  } catch (err) {
    console.error('authHeader error:', err)
    return {}
  }
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...authHeader(),
    ...(options.headers || {})
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  const text = await res.text()
  const data = text ? JSON.parse(text) : null

  if (!res.ok) {
      const error = data?.title || res.statusText || 'Erro na requisição'
    throw new Error(error)
  }
  return data
}

export const api = {
  login: (body) => request('/api/auth', { method: 'POST', body: JSON.stringify(body) }),
  getEmployees: () => request('/api/employees'),
  getEmployeeById: (id) => request(`/api/employees/${id}`),
  createEmployee: (employee) => request('/api/employees', { method: 'POST', body: JSON.stringify(employee) }),
  updateEmployee: (id, employee) => request(`/api/employees/${id}`, { method: 'PUT', body: JSON.stringify(employee) }),
  deleteEmployee: (id) => request(`/api/employees/${id}`, { method: 'DELETE' })
}
