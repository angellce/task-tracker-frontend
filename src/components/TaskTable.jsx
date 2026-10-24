import { Link } from 'react-router-dom'

function TaskTable({ tasks, onDelete }) {
  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Due date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.status ?? '—'}</td>
            <td>{task.priority ?? '—'}</td>
            {/* shown as the backend's YYYY-MM-DD text; new Date() would read it as UTC and can shift the day */}
            <td>{task.dueDate ?? '—'}</td>
            <td className="row-actions">
              <Link to={`/projects/${task.projectId}/tasks/${task.id}/edit`}>Edit</Link>
              <button onClick={() => onDelete(task)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TaskTable
