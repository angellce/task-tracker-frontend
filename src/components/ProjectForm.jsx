import { useState } from 'react'
import { createProject } from '../api/projects.js'

function ProjectForm({ onCreated }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [generalError, setGeneralError] = useState(null)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setFieldErrors({})
    setGeneralError(null)

    try {
      await createProject({ name, description })
      setName('')
      setDescription('')
      onCreated()
    } catch (err) {
      if (err.fieldErrors.length > 0) {
        // [{ field: 'name', message: 'must not be blank' }] -> { name: 'must not be blank' }
        const byField = {}
        for (const fe of err.fieldErrors) {
          byField[fe.field] = byField[fe.field] ? `${byField[fe.field]}, ${fe.message}` : fe.message
        }
        setFieldErrors(byField)
      } else {
        setGeneralError(err.message)
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>New project</h2>
      {generalError && <p className="error">{generalError}</p>}

      <label htmlFor="name">Name</label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      {fieldErrors.name && <p className="field-error">{fieldErrors.name}</p>}

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {fieldErrors.description && <p className="field-error">{fieldErrors.description}</p>}

      <button type="submit" disabled={saving}>
        {saving ? 'Creating...' : 'Create'}
      </button>
    </form>
  )
}

export default ProjectForm
