import { useParams } from 'react-router-dom'

function TasksPage() {
  const { projectId } = useParams()

  return (
    <section>
      <h1>Tasks</h1>
      <p>Tasks for project {projectId} (coming in F4)</p>
    </section>
  )
}

export default TasksPage
