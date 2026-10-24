import { request } from './client.js'

// exact values of the backend enums TaskStatus and TaskPriority
export const TASK_STATUSES = ['TODO', 'IN_PROGRESS', 'COMPLETED']
export const TASK_PRIORITIES = ['HIGH', 'MEDIUM', 'LOW']

// uses GET /api/tasks because GET /api/projects/{id}/tasks cannot filter by status
export function getTasks({ projectId, status, page = 0, size = 10 }) {
  const params = new URLSearchParams({ projectId, page, size, sort: 'id,desc' })
  if (status) params.set('status', status)
  return request(`/api/tasks?${params}`)
}

export function deleteTask(id) {
  return request(`/api/tasks/${id}`, { method: 'DELETE' })
}
