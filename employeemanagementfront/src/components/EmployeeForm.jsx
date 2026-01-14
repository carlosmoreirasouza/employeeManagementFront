import React, { useEffect, useState } from 'react'

export default function EmployeeForm({ initial = null, onSubmit, submitLabel = 'Save', onCancel = null }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [document, setDocument] = useState('')
  const [birthDate, setBirthDate] = useState('') // yyyy-MM-dd
  const [role, setRole] = useState('')
  const [password, setPassword] = useState('')
  const [phone1, setPhone1] = useState('')
  const [phone2, setPhone2] = useState('')

  useEffect(() => {
    if (initial) {
      setFirstName(initial.firstName || '')
      setLastName(initial.lastName || '')
      setEmail(initial.email || '')
      setDocument(initial.document || '')
      // Aceita strings ISO ou Date-like; transforma em yyyy-MM-dd para input[type=date]
      if (initial.birthDate) {
        const d = new Date(initial.birthDate)
        if (!Number.isNaN(d.getTime())) {
          const yyyy = d.getFullYear()
          const mm = String(d.getMonth() + 1).padStart(2, '0')
          const dd = String(d.getDate()).padStart(2, '0')
          setBirthDate(`${yyyy}-${mm}-${dd}`)
        } else {
          setBirthDate(initial.birthDate)
        }
      } else {
        setBirthDate('')
      }
      setRole(initial.role || '')
      setPhone1(initial.phone1 || '')
      setPhone2(initial.phone2 || '')
      // Não preencher password por segurança
      setPassword('')
    } else {
      setFirstName('')
      setLastName('')
      setEmail('')
      setDocument('')
      setBirthDate('')
      setRole('')
      setPhone1('')
      setPhone2('')
      setPassword('')
    }
  }, [initial])

  function submit(e) {
    e.preventDefault()
    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      document: document.trim(),
      birthDate: birthDate || null,
      role: role.trim(),
      // O backend deve receber e hashear a senha; aqui é enviado no campo passwordHash conforme solicitado.
      passwordHash: password || '',
      phone1: phone1.trim() || null,
      phone2: phone2.trim() || null
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 12 }}>
      <div className="form-row">
        <input placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
        <input placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} required />
      </div>

      <div className="form-row">
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Document" value={document} onChange={e => setDocument(e.target.value)} required />
      </div>

      <div className="form-row">
        <input placeholder="Phone 1" value={phone1} onChange={e => setPhone1(e.target.value)} />
        <input placeholder="Phone 2" value={phone2} onChange={e => setPhone2(e.target.value)} />
      </div>

      <div className="form-row">
        <input placeholder="Birth date" type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
        <input placeholder="Role" value={role} onChange={e => setRole(e.target.value)} />
      </div>

      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

      <div>
        <button type="submit">{submitLabel}</button>
        {onCancel && <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancelar</button>}
      </div>
    </form>
  )
}