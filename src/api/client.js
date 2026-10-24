// Error thrown for every failed request. Carries the backend's ErrorResponseDto:
// { timestamp, status, error, message, path, fieldErrors: [{ field, message }] }
export class ApiError extends Error {
  constructor(status, body) {
    super(body?.message || `Request failed with status ${status}`)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = body?.fieldErrors || []
    this.body = body
  }
}

export async function request(path, { method = 'GET', body } = {}) {
  let response
  try {
    response = await fetch(path, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    // fetch only throws when no response arrives at all
    throw new ApiError(0, { message: 'Cannot reach the server. Is the backend running?' })
  }

  // DELETE returns 200 with an empty body, so read text first and only parse if there is any
  const text = await response.text()
  let data = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      // not JSON, e.g. the dev proxy's plain-text error when the backend is down
      data = { message: text }
    }
  }

  if (!response.ok) {
    throw new ApiError(response.status, data)
  }
  return data
}

// [{ field: 'title', message: 'must not be blank' }] -> { title: 'must not be blank' }
// (several messages for the same field are joined with a comma)
export function fieldErrorsByName(err) {
  const byField = {}
  for (const fe of err.fieldErrors) {
    byField[fe.field] = byField[fe.field] ? `${byField[fe.field]}, ${fe.message}` : fe.message
  }
  return byField
}
