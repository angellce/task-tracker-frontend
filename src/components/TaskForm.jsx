import { useState } from 'react'
import { fieldErrorsByName } from '../api/client.js'
import { TASK_PRIORITIES, TASK_STATUSES } from '../api/tasks.js'

// Used for both creating and editing. onSubmit(values) must return a Promise;
// if it rejects with an ApiError, the errors are shown in the form.
function TaskForm({ initialValues, submitLabel, onSubmit, onCancel }) {
  const [values, setValues] = useState(initialValues)
  const [fieldErrors, setFieldErrors] = useState({})
  const [generalError, setGeneralError] = useState(null)
  const [saving, setSaving] = useState(false)

  // one change handler for all inputs, using each input's name attribute
  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setFieldErrors({})
    setGeneralError(null)
    try {
      await onSubmit(values) // the page navigates away on success
    } catch (err) {
      if (err.fieldErrors.length > 0) {
        setFieldErrors(fieldErrorsByName(err))
      } else {
        setGeneralError(err.message)
      }
      setSaving(false)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {generalError && <p className="error">{generalError}</p>}

      <label htmlFor="title">Title</label>
      <input id="title" name="title" value={values.title} onChange={handleChange} />
      {fieldErrors.title && <p className="field-error">{fieldErrors.title}</p>}

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={values.description}
        onChange={handleChange}
      />
      {fieldErrors.description && <p className="field-error">{fieldErrors.description}</p>}

      <label htmlFor="status">Status</label>
      <select id="status" name="status" value={values.status} onChange={handleChange}>
        <option value="">(none)</option>
        {TASK_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      {fieldErrors.status && <p className="field-error">{fieldErrors.status}</p>}

      <label htmlFor="priority">Priority</label>
      <select id="priority" name="priority" value={values.priority} onChange={handleChange}>
        <option value="">(none)</option>
        {TASK_PRIORITIES.map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </select>
      {fieldErrors.priority && <p className="field-error">{fieldErrors.priority}</p>}

      <label htmlFor="dueDate">Due date</label>
      <input id="dueDate" name="dueDate" type="date" value={values.dueDate} onChange={handleChange} />
      {fieldErrors.dueDate && <p className="field-error">{fieldErrors.dueDate}</p>}

      <label htmlFor="assignee">Assignee</label>
      <input id="assignee" name="assignee" value={values.assignee} onChange={handleChange} />
      {fieldErrors.assignee && <p className="field-error">{fieldErrors.assignee}</p>}

      <div className="form-buttons">
        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : submitLabel}
        </button>
        <button type="button" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default TaskForm
