import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../services/auth'

export default function Login() {
  const [username, setusername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    try {
      await auth.login(username, password)
      navigate('/employees')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="username" type="username" value={username} onChange={e => setusername(e.target.value)} required />
        <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}