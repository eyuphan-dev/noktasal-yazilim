import { useMemo, useState } from 'react'
import AuthContext, { AUTH_KEY } from './auth-context'

const users = {
  'admin@noktasal.com': { password: 'Admin1234!', role: 'super_admin', name: 'Sistem Yöneticisi' },
  'editor@noktasal.com': { password: 'Editor1234!', role: 'editor', name: 'İçerik Editörü' },
}

function getInitialUser() {
  const stored = window.localStorage.getItem(AUTH_KEY)
  if (!stored) {
    return null
  }

  try {
    return JSON.parse(stored)
  } catch {
    window.localStorage.removeItem(AUTH_KEY)
    return null
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser)

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login(credentials) {
        const normalizedEmail = credentials.email.toLowerCase().trim()
        const found = users[normalizedEmail]

        if (!found || found.password !== credentials.password) {
          return { ok: false, message: 'E-posta veya şifre hatalı.' }
        }

        const session = {
          email: normalizedEmail,
          role: found.role,
          name: found.name,
        }

        setUser(session)
        window.localStorage.setItem(AUTH_KEY, JSON.stringify(session))
        return { ok: true }
      },
      logout() {
        setUser(null)
        window.localStorage.removeItem(AUTH_KEY)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
