import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProject } from '../api/projects.js'
import { deleteTask, getTasks } from '../api/tasks.js'
import Pagination from '../components/Pagination.jsx'
import StatusFilter from '../components/StatusFilter.jsx'
import TaskTable from '../components/TaskTable.jsx'

function TasksPage() {
  const { projectId } = useParams()

  // the project itself, loaded separately so a wrong id gives a real 404 message
  const [project, setProject] = useState(null)
  const [projectError, setProjectError] = useState(null)

  const [status, setStatus] = useState('') // '' = all statuses
  const [page, setPage] = useState(0)
  const [data, setData] = useState(null) // PageResponseDto of tasks
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteError, setDeleteError] = useState(null)
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    let ignore = false
    getProject(projectId)
      .then((result) => {
        if (!ignore) setProject(result)
      })
      .catch((err) => {
        if (!ignore) setProjectError(err.message)
      })
    return () => {
      ignore = true
    }
  }, [projectId])

  useEffect(() => {
    // ignore answers that arrive after the filter or page has changed again
    let ignore = false
    getTasks({ projectId, status, page })
      .then((result) => {
        if (!ignore) setData(result)
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
  }, [projectId, status, page, reloadCount])

  // loading/error are reset here, in the event that triggers a new load, not inside the effect
  function startLoading() {
    setLoading(true)
    setError(null)
  }

  function handleStatusChange(newStatus) {
    startLoading()
    setStatus(newStatus)
    setPage(0)
  }

  function handlePageChange(newPage) {
    startLoading()
    setPage(newPage)
  }

  async function handleDelete(task) {
    if (!window.confirm(`Delete task "${task.title}"?`)) return
    setDeleteError(null)
    try {
      await deleteTask(task.id)
      // deleting the last task on a later page would leave that page empty, so step back one page
      const goBack = data.content.length === 1 && page > 0
      startLoading()
      if (goBack) setPage(page - 1)
      else setReloadCount((count) => count + 1)
    } catch (err) {
      setDeleteError(err.message)
    }
  }

  if (projectError) {
    return (
      <section>
        <Link to="/projects">← Back to projects</Link>
        <p className="error">{projectError}</p>
      </section>
    )
  }

  return (
    <section>
      <Link to="/projects">← Back to projects</Link>
      <h1>{project ? project.name : 'Loading project...'}</h1>
      <Link className="button-link" to={`/projects/${projectId}/tasks/new`}>
        New task
      </Link>

      <StatusFilter value={status} onChange={handleStatusChange} />
      {deleteError && <p className="error">{deleteError}</p>}

      {loading && <p>Loading tasks...</p>}
      {!loading && error && <p className="error">{error}</p>}
      {!loading && !error && data && data.content.length === 0 && (
        <p>{status ? `No tasks with status ${status}.` : 'No tasks in this project yet.'}</p>
      )}
      {!loading && !error && data && data.content.length > 0 && (
        <>
          <TaskTable tasks={data.content} onDelete={handleDelete} />
          <Pagination page={data.page} totalPages={data.totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </section>
  )
}

export default TasksPage
