import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth'

function ProtectedRoute({ children, roles }) {
  const location = useLocation()
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  if (roles?.length && !roles.includes(user.role)) {
    return <Navigate to="/admin/dashboard" replace />
  }

  return children
}

export default ProtectedRoute
