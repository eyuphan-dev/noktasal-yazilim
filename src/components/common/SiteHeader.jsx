import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const menuItems = [
  { to: '/', label: 'Anasayfa' },
  { to: '/cozumler', label: 'Çözümler' },
  { to: '/referanslar', label: 'Referanslar' },
  { to: '/hakkimizda', label: 'Hakkımızda' },
  { to: '/kariyer', label: 'Kariyer' },
  { to: '/iletisim', label: 'İletişim' },
]

function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur-md">
      <div className="container-shell flex h-16 items-center justify-between gap-3 md:h-20 md:gap-6">
        <NavLink to="/" className="focus-ring rounded-md" aria-label="Noktasal Yazılım ana sayfa">
          <img
            src="/logo.png"
            alt="Noktasal Yazılım Teknolojileri"
            className="h-9 w-auto object-contain brightness-0 invert transition duration-300 hover:opacity-90 md:h-11"
            width="300"
            height="66"
            decoding="async"
            fetchPriority="high"
          />
        </NavLink>

        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex items-center gap-5">
            {menuItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `focus-ring rounded-md px-2 py-1 text-sm font-medium transition ${
                      isActive ? 'text-teal-300' : 'text-slate-100 hover:text-teal-200'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <NavLink
          to="/iletisim"
          className="focus-ring hidden rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/20 lg:inline-flex"
        >
          Demo Talebi
        </NavLink>

        <button
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/25 text-white lg:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">Menü aç</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div id="mobile-menu" className="border-t border-white/10 bg-slate-950/95 px-4 py-4 shadow-soft lg:hidden">
          <nav aria-label="Mobil menü">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `focus-ring block rounded-md px-3 py-2 text-sm font-medium transition ${
                        isActive ? 'bg-white/10 text-teal-200' : 'text-slate-100 hover:bg-white/10'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <NavLink
            to="/iletisim"
            onClick={() => setIsMobileMenuOpen(false)}
            className="focus-ring mt-4 inline-flex w-full items-center justify-center rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-950"
          >
            Demo Talebi
          </NavLink>
        </div>
      ) : null}
    </header>
  )
}

export default SiteHeader
