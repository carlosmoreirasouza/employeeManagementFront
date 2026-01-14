import { api } from './api'

export const auth = {
  async login(username, password) {
    const res = await api.login({ username, password })
    if (res?.token) {
      localStorage.setItem('token', res.token)
    }
    return res
  },
  logout() {
    localStorage.removeItem('token')
  },
  isAuthenticated() {
    return !!localStorage.getItem('token')
  },
  getToken() {
    return localStorage.getItem('token')
  }
}