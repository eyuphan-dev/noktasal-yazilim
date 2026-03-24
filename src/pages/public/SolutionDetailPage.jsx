import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import CtaBand from '../../components/sections/CtaBand'
import { publicApiService } from '../../features/public/services/publicApiService'

function SolutionDetailPage() {
  const { slug } = useParams()
  const solutionQuery = useQuery({
    queryKey: ['public-solution-detail', slug],
    queryFn: () => publicApiService.getSolutionBySlug(slug),
    enabled: Boolean(slug),
    retry: false,
  })

  const solution = solutionQuery.data || null

  if (solutionQuery.isLoading) {
    return (
      <section className="container-shell py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Çözüm Detayı</p>
        <h1 className="mt-4 text-3xl font-semibold text-brand-950 md:text-4xl">Kayıt yükleniyor...</h1>
      </section>
    )
  }

  if (!solution) {
    return (
      <section className="container-shell py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Çözüm Detayı</p>
        <h1 className="mt-4 text-3xl font-semibold text-brand-950 md:text-4xl">Kayıt bulunamadı</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
          Aradığınız çözüm kaydı bulunamadı veya henüz yayına alınmadı.
        </p>
        <Link
          to="/cozumler"
          className="focus-ring mt-6 inline-flex rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          Çözümlere Dön
        </Link>
      </section>
    )
  }

  return (
    <>
      <section className="container-shell py-16 md:py-24">
        <div className="rounded-3xl border border-brand-100/80 bg-gradient-to-br from-white to-brand-50/40 p-6 shadow-soft md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Çözüm Detayı</p>
          <h1 className="mt-4 break-words text-3xl font-semibold leading-tight text-brand-950 sm:text-4xl md:text-5xl">
            {solution.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
            <span className="rounded-full border border-brand-200 bg-white px-3 py-1 text-brand-700">{solution.category}</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600">{solution.period}</span>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-8 text-slate-700 md:text-base">{solution.summary}</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Proje Kapsamı</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">Uygulanan modüller</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {solution.modules.map((module) => (
                <li key={module} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                  {module}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-brand-100 bg-brand-950 p-6 text-white shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-100">Kurum</p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight">{solution.client}</h2>
            <p className="mt-4 text-sm leading-7 text-brand-100">
              Uçtan uca analiz, geliştirme ve operasyon süreçleri aynı kalite standardında yönetildi.
            </p>
            <Link
              to="/iletisim"
              className="focus-ring mt-6 inline-flex rounded-full bg-teal-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
            >
              Benzer Proje Planla
            </Link>
          </article>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Yaklaşım</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              {solution.highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-brand-100 bg-gradient-to-b from-white to-brand-50/40 p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Kazanım</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              {solution.outcomes.map((item) => (
                <li key={item} className="rounded-xl border border-brand-100 bg-white px-4 py-3 font-semibold text-brand-900">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <CtaBand
        title="Bu çözüm modelini kurumunuza uyarlamak için teknik keşif planlayalım"
        text="İhtiyaçlarınızı, entegrasyon gereksinimlerini ve hedef teslim planını birlikte netleştirebiliriz."
        primaryLabel="Toplantı Planla"
        primaryTo="/iletisim"
        secondaryLabel="Tüm Çözümler"
        secondaryTo="/cozumler"
      />
    </>
  )
}

export default SolutionDetailPage
