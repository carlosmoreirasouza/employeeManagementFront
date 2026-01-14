import React, { useEffect, useState } from 'react'
import { api } from '../services/api'
import { auth } from '../services/auth'
import EmployeeForm from '../components/EmployeeForm'

export default function Employees() {
  const [employees, setEmployees] = useState([])
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState(null)

  async function load() {
    try {
      const data = await api.getEmployees()
      setEmployees(data || [])
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => { load() }, [])

  async function handleCreate(e) {
    try {
      await api.createEmployee(e)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleUpdate(id, e) {
    try {
      await api.updateEmployee(id, e)
      setEditing(null)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Confirmar exclusão?')) return
    try {
      await api.deleteEmployee(id)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  function logout() {
    auth.logout()
    window.location.href = '/login'
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Employees</h2>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Criar funcionário</h3>
      <EmployeeForm onSubmit={handleCreate} submitLabel="Create" />

      <h3>Lista</h3>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Documento</th>
            <th>BirthDate</th>
            <th>Role</th>
            <th>Phones</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{(emp.firstName || '') + ' ' + (emp.lastName || '')}</td>
              <td>{emp.email}</td>
              <td>{emp.document}</td>
              <td>{emp.birthDate ? new Date(emp.birthDate).toLocaleDateString() : ''}</td>
              <td>{emp.role}</td>
              <td>{[emp.phone1, emp.phone2].filter(Boolean).join(' / ')}</td>
              <td>
                <button onClick={() => setEditing(emp)}>Editar</button>
                <button onClick={() => handleDelete(emp.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <>
          <h3>Editar</h3>
          <EmployeeForm
            initial={editing}
            onSubmit={(values) => handleUpdate(editing.id, values)}
            submitLabel="Save"
            onCancel={() => setEditing(null)}
          />
        </>
      )}
    </div>
  )
}