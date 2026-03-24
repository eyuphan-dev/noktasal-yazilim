import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CtaBand from '../../components/sections/CtaBand'
import SectionIntro from '../../components/sections/SectionIntro'
import { publicApiService } from '../../features/public/services/publicApiService'

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
  const solutionsQuery = useQuery({
    queryKey: ['public-solutions-list'],
    queryFn: () => publicApiService.getSolutions(),
  })

  const visibleSolutions = solutionsQuery.data || []

  const getProjectVisual = (index) => projectGalleryImages[index % projectGalleryImages.length]

  const showcaseGroups = useMemo(() => {
    const groups = []
    for (let i = 0; i < visibleSolutions.length; i += 5) {
      groups.push(visibleSolutions.slice(i, i + 5))
    }
    return groups
  }, [visibleSolutions])

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
