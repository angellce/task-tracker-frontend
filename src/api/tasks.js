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

export function getTask(id) {
  return request(`/api/tasks/${id}`)
}

export function createTask(projectId, task) {
  return request(`/api/projects/${projectId}/tasks`, { method: 'POST', body: toRequestBody(task) })
}

// PUT needs projectId in the body: the backend reads it from there, not from the URL
export function updateTask(id, projectId, task) {
  return request(`/api/tasks/${id}`, { method: 'PUT', body: { ...toRequestBody(task), projectId } })
}

// form fields are strings; optional ones left empty are sent as null
function toRequestBody(task) {
  return {
    title: task.title,
    description: task.description || null,
    status: task.status || null,
    priority: task.priority || null,
    dueDate: task.dueDate || null,
    assignee: task.assignee || null,
  }
}
