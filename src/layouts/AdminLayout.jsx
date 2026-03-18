import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../features/auth/useAuth'

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/content', label: 'İçerik Yönetimi' },
  { to: '/admin/solutions', label: 'Çözümler' },
  { to: '/admin/references', label: 'Referanslar' },
  { to: '/admin/forms', label: 'Form Merkezi' },
  { to: '/admin/seo', label: 'SEO Yönetimi' },
]

function AdminLayout() {
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navContent = (
    <nav className="mt-6 lg:mt-8" aria-label="Admin menu">
      <ul className="space-y-2">
        {adminLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `focus-ring block rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-brand-100 text-brand-900'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )

  const sessionCard = (
    <div className="mt-6 lg:mt-8 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Oturum</p>
      <p className="mt-2 text-sm font-semibold text-slate-800">{user?.name}</p>
      <p className="text-xs text-slate-500">Rol: {user?.role}</p>
      <button
        onClick={logout}
        type="button"
        className="focus-ring mt-3 rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white"
      >
        Çıkış Yap
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:grid lg:grid-cols-[260px_1fr]">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-sm lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Admin Panel</p>
              <h1 className="mt-1 text-base font-semibold text-slate-900">Noktasal CMS</h1>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
              aria-expanded={isMobileMenuOpen}
              aria-controls="admin-mobile-menu"
            >
              {isMobileMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
            </button>
          </div>
          {isMobileMenuOpen ? (
            <div id="admin-mobile-menu" className="mt-4 border-t border-slate-200 pt-4">
              {navContent}
              {sessionCard}
            </div>
          ) : null}
        </header>

        <aside className="hidden border-r border-slate-200 bg-white p-6 lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Admin Panel</p>
          <h1 className="mt-3 text-xl font-semibold text-slate-900">Noktasal CMS</h1>
          {navContent}
          {sessionCard}
        </aside>

        <main className="p-4 sm:p-6 md:p-8 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
