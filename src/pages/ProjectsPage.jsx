import { useEffect, useState } from 'react'
import { getProjects } from '../api/projects.js'
import Pagination from '../components/Pagination.jsx'
import ProjectForm from '../components/ProjectForm.jsx'
import ProjectList from '../components/ProjectList.jsx'

function ProjectsPage() {
  const [page, setPage] = useState(0)
  const [data, setData] = useState(null) // PageResponseDto: { content, page, size, totalElements, totalPages }
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    // ignore answers that arrive after the page has changed again
    let ignore = false
    getProjects(page)
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
  }, [page, reloadCount])

  // loading/error are reset here, in the event that triggers a new load, not inside the effect
  function startLoading() {
    setLoading(true)
    setError(null)
  }

  function handlePageChange(newPage) {
    startLoading()
    setPage(newPage)
  }

  function handleCreated() {
    startLoading()
    setPage(0) // newest project is on the first page
    setReloadCount((count) => count + 1)
  }

  return (
    <section>
      <h1>Projects</h1>
      <ProjectForm onCreated={handleCreated} />

      {loading && <p>Loading projects...</p>}
      {!loading && error && <p className="error">{error}</p>}
      {!loading && !error && data && data.content.length === 0 && <p>No projects yet.</p>}
      {!loading && !error && data && data.content.length > 0 && (
        <>
          <ProjectList projects={data.content} />
          <Pagination page={data.page} totalPages={data.totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </section>
  )
}

export default ProjectsPage
