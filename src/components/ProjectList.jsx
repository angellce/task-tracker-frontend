import { Link } from 'react-router-dom'

function ProjectList({ projects }) {
  return (
    <ul className="project-list">
      {projects.map((project) => (
        <li key={project.id} className="project-item">
          <div>
            <strong>{project.name}</strong>
            {project.description && <p>{project.description}</p>}
            <small>Created {new Date(project.createdAt).toLocaleDateString()}</small>
          </div>
          <Link to={`/projects/${project.id}/tasks`}>Open tasks</Link>
        </li>
      ))}
    </ul>
  )
}

export default ProjectList
