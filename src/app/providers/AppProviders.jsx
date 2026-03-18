import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import AuthProvider from '../../features/auth/AuthContext'

function AppProviders({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  )
}

export default AppProviders
