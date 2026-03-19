import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CtaBand from '../../components/sections/CtaBand'
import SectionIntro from '../../components/sections/SectionIntro'
import { solutionCatalog } from '../../features/solutions/solutionCatalog'

const projectGalleryImages = [
  'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1573164713712-03790a178651?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80',
]

function SolutionsPage() {
  const reducedMotion = useReducedMotion()
  const [categoryFilter, setCategoryFilter] = useState('Tümü')
  const [featuredIndex, setFeaturedIndex] = useState(0)

  const categories = useMemo(
    () => ['Tümü', ...new Set(solutionCatalog.map((item) => item.category))],
    [],
  )

  const categoryCountMap = useMemo(() => {
    const counts = { Tümü: solutionCatalog.length }

    solutionCatalog.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1
    })

    return counts
  }, [])

  const visibleSolutions = useMemo(() => {
    if (categoryFilter === 'Tümü') {
      return solutionCatalog
    }

    return solutionCatalog.filter((item) => item.category === categoryFilter)
  }, [categoryFilter])

  useEffect(() => {
    setFeaturedIndex(0)
  }, [categoryFilter])

  useEffect(() => {
    if (visibleSolutions.length <= 1) {
      return undefined
    }

    const intervalId = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % visibleSolutions.length)
    }, 4600)

    return () => clearInterval(intervalId)
  }, [visibleSolutions.length])

  const activeFeaturedIndex = featuredIndex % Math.max(visibleSolutions.length, 1)
  const featuredSolution = visibleSolutions[activeFeaturedIndex]
  const remainingSolutions = visibleSolutions.filter((_, index) => index !== activeFeaturedIndex)

  const getProjectVisual = (index) => projectGalleryImages[index % projectGalleryImages.length]

  const showcaseGroups = useMemo(() => {
    const groups = []
    for (let i = 0; i < remainingSolutions.length; i += 5) {
      groups.push(remainingSolutions.slice(i, i + 5))
    }
    return groups
  }, [remainingSolutions])

  const getShowcaseSpanClass = (groupSize, itemIndex) => {
    if (groupSize >= 5) {
      const fullPattern = [
        'xl:col-span-7 xl:row-span-2',
        'xl:col-span-5 xl:row-span-1',
        'xl:col-span-5 xl:row-span-1',
        'xl:col-span-4 xl:row-span-1',
        'xl:col-span-8 xl:row-span-1',
      ]
      return fullPattern[itemIndex]
    }

    if (groupSize === 4) {
      const pattern = ['xl:col-span-6', 'xl:col-span-6', 'xl:col-span-4', 'xl:col-span-8']
      return pattern[itemIndex]
    }

    if (groupSize === 3) {
      return 'xl:col-span-4'
    }

    if (groupSize === 2) {
      return 'xl:col-span-6'
    }

    return 'xl:col-span-12'
  }

  return (
    <>
      <section className="container-shell py-16 md:py-24">
        <SectionIntro
          eyebrow="Çözümler"
          title="Ürün ve çözüm portföyü"
          description="Kurumunuzun operasyonel ihtiyacına göre farklı olgunluk seviyelerinde ürünleştirilmiş modüller."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
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

        <div className="mt-8 rounded-2xl border border-brand-100 bg-white/95 p-4 shadow-soft md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">Filtreleme</p>
              <p className="mt-1 text-sm text-slate-600">Kategori seçerek ilgili çözüm kümelerini hızlıca daraltın.</p>
            </div>
            <span className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              Toplam {visibleSolutions.length} çözüm
            </span>
          </div>

          <div className="mt-4 md:hidden">
            <label htmlFor="category-filter-mobile" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Mobil Kategori Seçimi
            </label>
            <div className="flex items-center gap-2">
              <select
                id="category-filter-mobile"
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="focus-ring h-11 w-full rounded-xl border border-brand-200 bg-white px-3 text-sm font-semibold text-slate-700"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category} ({categoryCountMap[category] || 0})
                  </option>
                ))}
              </select>
              {categoryFilter !== 'Tümü' && (
                <button
                  type="button"
                  onClick={() => setCategoryFilter('Tümü')}
                  className="focus-ring inline-flex h-11 shrink-0 items-center justify-center rounded-xl border border-brand-200 bg-white px-3 text-xs font-semibold text-brand-700 transition hover:bg-brand-50"
                >
                  Sıfırla
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 hidden flex-wrap gap-2 md:flex">
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
                <span className="ml-1.5 opacity-80">{categoryCountMap[chip] || 0}</span>
              </button>
            ))}
          </div>
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

          {visibleSolutions.length > 0 ? (
            <>
              {featuredSolution && (
                <div className="relative mt-7 overflow-hidden rounded-3xl border border-slate-300/65 bg-slate-950 text-white">
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-20 top-8 h-44 w-44 rounded-full bg-cyan-400/25 blur-3xl"
                    animate={reducedMotion ? { opacity: 0.35 } : { opacity: [0.22, 0.38, 0.22], x: [0, 16, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-14 bottom-6 h-40 w-40 rounded-full bg-teal-300/20 blur-3xl"
                    animate={reducedMotion ? { opacity: 0.3 } : { opacity: [0.2, 0.34, 0.2], y: [0, -10, 0] }}
                    transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `linear-gradient(112deg, rgba(2,6,23,0.9) 10%, rgba(2,6,23,0.62) 48%, rgba(2,6,23,0.8) 100%), url(${getProjectVisual(activeFeaturedIndex)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_20%,rgba(255,255,255,0.18),transparent_40%)]" />

                  <div className="relative z-10 grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-start md:p-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={featuredSolution.id}
                        initial={reducedMotion ? false : { opacity: 0, y: 10, filter: 'blur(4px)' }}
                        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, filter: 'blur(4px)' }}
                        transition={{ duration: 0.42, ease: 'easeOut' }}
                        className="max-w-2xl"
                      >
                        <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-100">
                          Öne Çıkan Proje - {String(activeFeaturedIndex + 1).padStart(2, '0')}
                        </p>
                        <h3 className="mt-4 text-2xl font-semibold leading-tight md:text-3xl">{featuredSolution.title}</h3>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/85">{featuredSolution.client} - {featuredSolution.period}</p>
                        <p className="mt-4 text-sm leading-7 text-slate-100 md:text-base">{featuredSolution.summary}</p>
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                          <Link
                            to={`/cozumler/${featuredSolution.slug}`}
                            className="focus-ring inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                          >
                            Öne Çıkan Projeyi Aç
                          </Link>
                          <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                            Canlı geçiş 4.6 sn
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <div className="inline-flex h-fit items-center gap-1 rounded-xl border border-white/30 bg-black/30 p-1.5 backdrop-blur-sm">
                      {visibleSolutions.map((item, index) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFeaturedIndex(index)}
                          className={`focus-ring h-2.5 w-2.5 rounded-full transition ${
                            index === activeFeaturedIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                          }`}
                          aria-label={`${item.title} projesini öne çıkar`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <motion.div
                key="showcase"
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="mt-5 space-y-4"
              >
                {showcaseGroups.map((group, groupIndex) => (
                  <div key={`showcase-group-${groupIndex}`} className="grid gap-4 md:grid-cols-2 xl:grid-cols-12 xl:auto-rows-[150px]">
                    {group.map((item, itemIndex) => {
                      const visualIndex = groupIndex * 5 + itemIndex + 1
                      const spanClass = getShowcaseSpanClass(group.length, itemIndex)
                      const isLarge = group.length >= 5 && itemIndex === 0

                      return (
                        <article
                          key={item.id}
                          className={`group relative overflow-hidden rounded-2xl border border-slate-300/70 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg ${spanClass}`}
                          style={{
                            backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.12) 5%, rgba(2,6,23,0.75) 100%), url(${getProjectVisual(visualIndex)})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/35 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                          <div className={`relative z-10 flex h-full flex-col justify-end p-4 text-white md:p-5 ${isLarge ? 'xl:p-6' : ''}`}>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-100">{item.category}</p>
                            <h4 className={`mt-2 line-clamp-2 font-semibold leading-6 ${isLarge ? 'text-lg xl:text-xl' : 'text-base md:text-lg'}`}>
                              {item.title}
                            </h4>
                            <div className="mt-3 flex items-center justify-between gap-2">
                              <span className="text-[11px] font-medium text-slate-200">{item.period}</span>
                              <Link
                                to={`/cozumler/${item.slug}`}
                                className="focus-ring inline-flex rounded-full border border-white/35 bg-black/25 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/20"
                              >
                                İncele
                              </Link>
                            </div>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                ))}
              </motion.div>
            </>
          ) : (
            <div className="mt-7 rounded-2xl border border-dashed border-brand-200 bg-white/80 p-6 text-center">
              <p className="text-sm font-semibold text-slate-800">Bu kategori için çözüm bulunamadı.</p>
              <p className="mt-2 text-sm text-slate-600">Farklı bir kategori deneyebilir veya tüm sonuçlara dönebilirsiniz.</p>
              <button
                type="button"
                onClick={() => setCategoryFilter('Tümü')}
                className="focus-ring mt-4 inline-flex rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
              >
                Tümünü Göster
              </button>
            </div>
          )}
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
