import { NavLink } from 'react-router-dom'

function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-br from-slate-900 via-brand-950 to-slate-950 text-white">
      <div className="container-shell grid gap-8 py-12 md:grid-cols-3">
        <section>
          <img
            src="/logo.png"
            alt="Noktasal Yazılım Teknolojileri"
            className="h-12 w-auto object-contain brightness-0 invert"
            width="300"
            height="66"
            loading="lazy"
            decoding="async"
          />
          <p className="mt-3 max-w-sm text-sm leading-7 text-slate-200">
            Kurumsal yazılım projelerinde güvenli, ölçeklenebilir ve sürdürülebilir
            çözümler üretir.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">Bağlantılar</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-100">
            <li>
              <NavLink className="focus-ring rounded-sm hover:text-teal-200" to="/cozumler">
                Çözümler
              </NavLink>
            </li>
            <li>
              <NavLink className="focus-ring rounded-sm hover:text-teal-200" to="/referanslar">
                Referanslar
              </NavLink>
            </li>
            <li>
              <NavLink className="focus-ring rounded-sm hover:text-teal-200" to="/kariyer">
                Kariyer
              </NavLink>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">İletişim</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-100">
            <li>info@noktasalyazilim.com</li>
            <li>+90 212 000 00 00</li>
            <li>İstanbul, Türkiye</li>
          </ul>
        </section>
      </div>
      <div className="border-t border-white/10 bg-slate-950/40">
        <div className="container-shell flex flex-wrap items-center gap-4 py-4 text-xs font-medium text-slate-200">
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Kurumsal SLA Desteği</span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Güvenli Entegrasyon Altyapısı</span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Ölçeklenebilir Ürün Mimarisi</span>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-300">
        © 2026 Noktasal Yazılım. Tüm hakları saklıdır.
      </div>
    </footer>
  )
}

export default SiteFooter
