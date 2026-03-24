export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  useMock: (import.meta.env.VITE_USE_MOCK_API || 'false') === 'true',
}
