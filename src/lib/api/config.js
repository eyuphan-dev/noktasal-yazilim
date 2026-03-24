const hasWindow = typeof window !== 'undefined'
const isGitHubPagesHost = hasWindow && window.location.hostname.endsWith('github.io')
const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL || ''

function resolveUseMock() {
  const explicit = import.meta.env.VITE_USE_MOCK_API
  if (typeof explicit === 'string' && explicit.length > 0) {
    return explicit === 'true'
  }

  // On GitHub Pages, fall back to mock when no public backend URL is provided.
  if (isGitHubPagesHost && !configuredBaseUrl) {
    return true
  }

  return false
}

export const apiConfig = {
  baseUrl: configuredBaseUrl || 'http://localhost:4000/api',
  useMock: resolveUseMock(),
}
