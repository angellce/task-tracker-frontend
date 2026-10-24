import { request } from './client.js'

// newest first, so a project you just created shows up at the top of page 0
export function getProjects(page = 0, size = 10) {
  return request(`/api/projects?page=${page}&size=${size}&sort=id,desc`)
}

export function createProject({ name, description }) {
  return request('/api/projects', {
    method: 'POST',
    body: { name, description: description || null },
  })
}
