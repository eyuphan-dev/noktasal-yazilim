import { AUTH_KEY } from '../../features/auth/auth-context'
import { apiConfig } from './config'
import { normalizeApiError } from './error'

function getAuthHeader() {
  const raw = window.localStorage.getItem(AUTH_KEY)
  if (!raw) {
    return {}
  }

  try {
    const session = JSON.parse(raw)
    const token = btoa(`${session.email}:${session.role}`)
    return { Authorization: `Bearer ${token}` }
  } catch {
    return {}
  }
}

export async function apiRequest(path, options = {}) {
  try {
    const response = await fetch(`${apiConfig.baseUrl}${path}`, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: options.signal,
    })

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}))
      throw {
        status: response.status,
        message: payload.message || 'API istegi basarisiz oldu.',
        details: payload,
      }
    }

    if (response.status === 204) {
      return null
    }

    return response.json()
  } catch (error) {
    throw normalizeApiError(error)
  }
}
