import { useNavigate, useParams } from 'react-router-dom'
import { createTask } from '../api/tasks.js'
import TaskForm from '../components/TaskForm.jsx'

const EMPTY_TASK = {
  title: '',
  description: '',
  status: 'TODO',
  priority: 'MEDIUM',
  dueDate: '',
  assignee: '',
}

function NewTaskPage() {
  const { projectId } = useParams()
  const navigate = useNavigate()

  function backToList() {
    navigate(`/projects/${projectId}/tasks`)
  }

  async function handleSubmit(values) {
    await createTask(projectId, values)
    backToList()
  }

  return (
    <section>
      <h1>New task</h1>
      <TaskForm
        initialValues={EMPTY_TASK}
        submitLabel="Create task"
        onSubmit={handleSubmit}
        onCancel={backToList}
      />
    </section>
  )
}

export default NewTaskPage
