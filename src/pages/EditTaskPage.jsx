import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getTask, updateTask } from '../api/tasks.js'
import TaskForm from '../components/TaskForm.jsx'

// the backend sends null for empty fields, but form inputs need strings
function toFormValues(task) {
  return {
    title: task.title ?? '',
    description: task.description ?? '',
    status: task.status ?? '',
    priority: task.priority ?? '',
    dueDate: task.dueDate ?? '',
    assignee: task.assignee ?? '',
  }
}

function EditTaskPage() {
  const { projectId, taskId } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false
    getTask(taskId)
      .then((result) => {
        if (!ignore) setTask(result)
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })
    return () => {
      ignore = true
    }
  }, [taskId])

  function backToList() {
    navigate(`/projects/${projectId}/tasks`)
  }

  async function handleSubmit(values) {
    // projectId comes from the loaded task, so the task stays in its real project
    await updateTask(task.id, task.projectId, values)
    backToList()
  }

  if (loading) return <p>Loading task...</p>

  if (error) {
    return (
      <section>
        <Link to={`/projects/${projectId}/tasks`}>← Back to tasks</Link>
        <p className="error">{error}</p>
      </section>
    )
  }

  return (
    <section>
      <h1>Edit task</h1>
      <TaskForm
        initialValues={toFormValues(task)}
        submitLabel="Save changes"
        onSubmit={handleSubmit}
        onCancel={backToList}
      />
    </section>
  )
}

export default EditTaskPage
