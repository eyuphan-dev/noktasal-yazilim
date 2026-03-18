import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import CtaBand from '../../components/sections/CtaBand'
import SectionIntro from '../../components/sections/SectionIntro'
import { solutionCatalog } from '../../features/solutions/solutionCatalog'

function SolutionsPage() {
  const [categoryFilter, setCategoryFilter] = useState('Tümü')

  const categories = useMemo(
    () => ['Tümü', ...new Set(solutionCatalog.map((item) => item.category))],
    [],
  )

  const visibleSolutions = useMemo(() => {
    if (categoryFilter === 'Tümü') {
      return solutionCatalog
    }

    return solutionCatalog.filter((item) => item.category === categoryFilter)
  }, [categoryFilter])

  return (
    <>
      <section className="container-shell py-16 md:py-24">
        <SectionIntro
          eyebrow="Çözümler"
          title="Ürün ve çözüm portföyü"
          description="Kurumunuzun operasyonel ihtiyacına göre farklı olgunluk seviyelerinde ürünleştirilmiş modüller."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((chip) => (
            <button
              key={chip}
              className={`focus-ring rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition duration-300 hover:-translate-y-0.5 ${
                chip === categoryFilter
                  ? 'border-brand-900 bg-brand-900 text-white'
                  : 'border-brand-200 bg-white text-brand-700 hover:bg-brand-50'
              }`}
              type="button"
              onClick={() => setCategoryFilter(chip)}
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="interactive-lift rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50 p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Öne Çıkan Mimari</p>
            <h2 className="mt-3 text-2xl font-semibold text-brand-950">Modüler platform + domain tabanlı yapı</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              İhtiyaç arttıkça parçalı büyüyen, bakım maliyeti düşük ve kurum içi ekiplerle birlikte evrilebilen bir çözüm yaklaşımı sunuyoruz.
            </p>
          </article>

          <article className="interactive-lift rounded-2xl border border-brand-100 bg-brand-950 p-6 text-white shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-100">Hızlı Keşif</p>
            <h3 className="mt-3 text-2xl font-semibold">30 dakikalık teknik ön görüşme</h3>
            <p className="mt-4 text-sm leading-7 text-brand-100">
              Mevcut yapınızı, entegrasyon risklerini ve uygulanabilir MVP yol haritasını kısa sürede netleştiriyoruz.
            </p>
            <Link
              to="/iletisim"
              className="focus-ring mt-6 inline-flex rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-accent-700"
            >
              Keşif Talebi Oluştur
            </Link>
          </article>
        </div>

        <section className="mt-12 rounded-3xl border border-brand-100/80 bg-gradient-to-b from-white to-brand-50/40 p-6 shadow-soft md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Proje Kataloğu</p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight text-brand-950 md:text-3xl">
                Daha önce teslim edilen işleri kısa özetlerle inceleyin
              </h2>
            </div>
            <p className="rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold text-brand-700">
              Toplam {visibleSolutions.length} iş
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleSolutions.map((item) => (
              <article key={item.id} className="interactive-lift rounded-2xl border border-brand-100 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-700">
                    {item.category}
                  </p>
                  <span className="text-xs font-medium text-slate-500">{item.period}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{item.client}</p>
                <p className="mt-3 min-h-[84px] text-sm leading-7 text-slate-600">{item.summary}</p>
                <Link
                  to={`/cozumler/${item.slug}`}
                  className="focus-ring mt-5 inline-flex rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
                >
                  Detay Sayfası
                </Link>
              </article>
            ))}
          </div>
        </section>
      </section>

      <CtaBand
        title="Kurumunuza uygun çözüm kombinasyonunu birlikte belirleyelim"
        text="Sektör, ölçek ve mevzuat ihtiyacına göre en doğru ürün yol haritasını çıkarıyoruz."
        primaryLabel="Keşif Toplantısı"
        primaryTo="/iletisim"
        secondaryLabel="Referansları Göster"
        secondaryTo="/referanslar"
      />
    </>
  )
}

export default SolutionsPage
