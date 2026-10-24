import { TASK_STATUSES } from '../api/tasks.js'

// value '' means "All" (no status filter)
function StatusFilter({ value, onChange }) {
  return (
    <div className="filter">
      <label htmlFor="status-filter">Status</label>
      <select id="status-filter" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All</option>
        {TASK_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  )
}

export default StatusFilter
