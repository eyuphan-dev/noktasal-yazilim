import { motion, useReducedMotion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import CtaBand from '../../components/sections/CtaBand'
import { publicApiService } from '../../features/public/services/publicApiService'
import { A11y, Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'

const MotionBadge = motion.p
const MotionTitle = motion.h1
const MotionText = motion.p
const MotionLink = motion(Link)

const DEFAULT_SLIDES = [
  {
    id: 's1',
    tag: 'Modern Kurumsal Mimari',
    title: 'Kurumsal süreçlerinizi güvenle dijitalleştirin.',
    text: 'Kamu ve B2B odaklı projelerde ölçeklenebilir yazılım platformları geliştiriyoruz.',
    cta: 'Çözümleri İncele',
    ctaUrl: '/cozumler',
    photo:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=80',
    panelTitle: 'Platform Omurgası',
    panelText: 'Mikro servis entegrasyonları, güçlü loglama ve sürdürülebilir yayın modeliyle modern işletme mimarisi.',
    stats: ['99.95% Uptime Hedefi', 'Canlı İzleme ve Alarm', 'Mevzuata Uyumlu Süreçler'],
  },
  {
    id: 's2',
    tag: 'Operasyon Odaklı Tasarım',
    title: 'Entegrasyon ve operasyonu tek bir çatı altında yönetin.',
    text: 'Ürün mimarisi, veri akışlarınız ve raporlama ihtiyacınız için uç uca tasarım.',
    cta: 'Referanslara Göz At',
    ctaUrl: '/referanslar',
    photo:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2200&q=80',
    panelTitle: 'Operasyon Konsolu',
    panelText: 'Ekiplerin aynı anda çalışabildiği, hızlı karar almayı destekleyen sade ve görünür süreç ekranları.',
    stats: ['Rol Bazlı Yetkilendirme', 'İzlenebilir İş Akışları', 'Düşük Operasyon Maliyeti'],
  },
  {
    id: 's3',
    tag: 'Güvenlik ve Sürdürülebilirlik',
    title: 'Yüksek güvenlik ve sürdürülebilir kod standardı.',
    text: 'Uzun ömürlü, bakımı kolay ve ekip büyümesine uygun sistemler kuruyoruz.',
    cta: 'Toplantı Planla',
    ctaUrl: '/iletisim',
    photo:
      'https://images.unsplash.com/photo-1451188502541-13943edb6acb?auto=format&fit=crop&w=2200&q=80',
    panelTitle: 'Sürdürülebilir Kod Yaşam Döngüsü',
    panelText: 'Kod kalitesi, test otomasyonu ve ölçülebilir teslim yaklaşımı ile teknik borcu azaltan ürün geliştirme.',
    stats: ['CI/CD Uyumlu Yapı', 'Kalite Güvencesi Süreci', 'Uzun Vadeli Ölçeklenme'],
  },
]

const DEFAULT_TRUST_ITEMS = [
  { label: 'Kamu Kurumları', detail: 'Mevzuata uyumlu dijital dönüşüm' },
  { label: 'Finans Kuruluşları', detail: 'Güvenli işlem ve raporlama altyapısı' },
  { label: 'Lojistik Operatörleri', detail: 'Anlık operasyon izleme ve optimizasyon' },
  { label: 'B2B Üretim Şirketleri', detail: 'Uçtan uca tedarik süreç dijitalleşmesi' },
]

const DEFAULT_HIGHLIGHT_STATS = [
  { title: 'Kurumsal Proje', value: '40+', text: 'Canlıda çalışan teslimat sayısı' },
  { title: 'Sektörel Deneyim', value: '12', text: 'Farklı regülasyon yapısında uygulama' },
  { title: 'Operasyon Destek', value: '7/24', text: 'SLA tabanlı sürekli izleme ve müdahale' },
]

const DEFAULT_WHY_POINTS = [
  'Kurumsal yönetim, güvenlik ve operasyon standartlarına uygun modern mimari.',
  'Ürün odaklı teslim modeliyle ölçeklenebilir ve sürdürülebilir kod tabanı.',
  'Entegrasyon, raporlama ve destek sürecini tek merkezden yönetebilen ekip yapısı.',
]

const DEFAULT_FOCUS_TAGS = ['Başvuru Sistemleri', 'Operasyon Panelleri', 'Karar Destek']

const projectGalleryImages = [
  'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1573164713712-03790a178651?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80',
]

function normalizeSlides(payload) {
  if (Array.isArray(payload?.slides) && payload.slides.length > 0) {
    return DEFAULT_SLIDES.map((fallback, index) => {
      const current = payload.slides[index] || {}
      return {
        ...fallback,
        tag: current.tag || fallback.tag,
        title: current.title || fallback.title,
        text: current.text || fallback.text,
        cta: current.cta || fallback.cta,
        ctaUrl: current.ctaUrl || fallback.ctaUrl,
        photo: current.photo || fallback.photo,
        stats: Array.isArray(current.stats) && current.stats.length > 0 ? current.stats.filter(Boolean).slice(0, 3) : fallback.stats,
      }
    })
  }

  return DEFAULT_SLIDES.map((slide, index) => {
    if (index !== 0) {
      return slide
    }

    return {
      ...slide,
      title: payload?.title || slide.title,
      text: payload?.subtitle || slide.text,
      cta: payload?.ctaLabel || slide.cta,
      ctaUrl: payload?.ctaUrl || slide.ctaUrl,
    }
  })
}

function normalizeHomeSections(payload) {
  return {
    trustHeading: payload?.trustHeading || 'Sektörel tecrübe ve operasyonel güveni tek bakışta gösterin',
    trustDescription: payload?.trustDescription || 'Bu düzen, karar vericinin önce güveni görüp sonra detaylara inmesini sağlar.',
    whyHeading: payload?.whyHeading || 'Neden Noktasal?',
    focusHeading: payload?.focusHeading || 'Odak Alanları',
    worksHeading: payload?.worksHeading || 'Farklı kurumlarda teslim ettiğimiz projelerden seçkiler',
    worksDescription: payload?.worksDescription || 'Canlı çözümleri tek ekranda inceleyin ve detay sayfalarına ilerleyin.',
    trustItems: Array.isArray(payload?.trustItems) && payload.trustItems.length > 0 ? payload.trustItems : DEFAULT_TRUST_ITEMS,
    highlightStats: Array.isArray(payload?.highlightStats) && payload.highlightStats.length > 0 ? payload.highlightStats : DEFAULT_HIGHLIGHT_STATS,
    whyPoints: Array.isArray(payload?.whyPoints) && payload.whyPoints.length > 0 ? payload.whyPoints : DEFAULT_WHY_POINTS,
    focusTags: Array.isArray(payload?.focusTags) && payload.focusTags.length > 0 ? payload.focusTags : DEFAULT_FOCUS_TAGS,
  }
}

function HomePage() {
  const reducedMotion = useReducedMotion()
  const [activeSlide, setActiveSlide] = useState(0)
  const [swiperInstance, setSwiperInstance] = useState(null)
  const homeSliderQuery = useQuery({
    queryKey: ['public-content-section', 'home-slider'],
    queryFn: () => publicApiService.getContentSection('home-slider'),
  })
  const homeSectionsQuery = useQuery({
    queryKey: ['public-content-section', 'home-sections'],
    queryFn: () => publicApiService.getContentSection('home-sections'),
  })
  const solutionsQuery = useQuery({
    queryKey: ['public-solutions-home'],
    queryFn: () => publicApiService.getSolutions(),
  })
  const completedWorks = (solutionsQuery.data || []).slice(0, 6)
  const [rotatingWorkIndex, setRotatingWorkIndex] = useState(0)

  useEffect(() => {
    if (completedWorks.length <= 1) {
      return undefined
    }

    const intervalId = setInterval(() => {
      setRotatingWorkIndex((prev) => (prev + 1) % completedWorks.length)
    }, 4600)

    return () => clearInterval(intervalId)
  }, [completedWorks.length])

  const activeWork = completedWorks[rotatingWorkIndex % Math.max(completedWorks.length, 1)]

  const renderedSlides = useMemo(() => {
    return normalizeSlides(homeSliderQuery.data || {})
  }, [homeSliderQuery.data])

  const homeSections = useMemo(() => {
    return normalizeHomeSections(homeSectionsQuery.data || {})
  }, [homeSectionsQuery.data])

  const getWorkVisual = (index) => {
    return projectGalleryImages[index % projectGalleryImages.length]
  }

  const renderHeroClassic = (slide, index) => (
    <div className="mx-auto w-full max-w-5xl pb-4 text-center sm:pb-6">
      <MotionBadge
        initial={reducedMotion ? false : { opacity: 0, y: 14 }}
        animate={activeSlide === index ? { opacity: 1, y: 0 } : { opacity: 0.55, y: 5 }}
        transition={{ duration: 0.42 }}
        className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100"
      >
        {slide.tag}
      </MotionBadge>
      <MotionTitle
        initial={reducedMotion ? false : { opacity: 0, y: 22 }}
        animate={activeSlide === index ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 8 }}
        transition={{ duration: 0.55 }}
        className="mx-auto mt-5 max-w-4xl text-3xl font-semibold leading-tight sm:text-5xl xl:text-6xl"
      >
        {slide.title}
      </MotionTitle>
      <MotionText
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        animate={activeSlide === index ? { opacity: 1, y: 0 } : { opacity: 0.55, y: 6 }}
        transition={{ duration: 0.58 }}
        className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-slate-100 md:text-base"
      >
        {slide.text}
      </MotionText>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <MotionLink
          to={slide.ctaUrl || '/iletisim'}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={activeSlide === index ? { opacity: 1, y: 0 } : { opacity: 0.65, y: 4 }}
          transition={{ duration: 0.5 }}
          className="focus-ring inline-flex rounded-full bg-teal-400 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
        >
          {slide.cta}
        </MotionLink>
        <Link
          to="/cozumler"
          className="focus-ring inline-flex rounded-full border border-white/35 bg-white/10 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
        >
          Mimariyi İncele
        </Link>
      </div>
      <div className="mt-7 grid gap-2 sm:grid-cols-3">
        {slide.stats.map((stat) => (
          <div key={stat} className="rounded-xl border border-white/20 bg-slate-900/35 px-3 py-2 text-xs font-medium text-slate-100 sm:text-sm">
            {stat}
          </div>
        ))}
      </div>
    </div>
  )

  const resolveBackground = (slide) => {
    return {
      backgroundImage: `linear-gradient(110deg, rgba(2, 6, 23, 0.2) 10%, rgba(2, 6, 23, 0.74) 55%, rgba(2, 6, 23, 0.95) 100%), url(${slide.photo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }
  }

  return (
    <>
      <section className="hero-shell relative overflow-hidden bg-slate-950">
        <Swiper
          modules={[Autoplay, EffectFade, A11y]}
          className="hero-swiper hero-fluid"
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={960}
          loop
          onSwiper={setSwiperInstance}
          autoplay={
            reducedMotion
              ? false
              : {
                  delay: 5200,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
          }
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        >
          {renderedSlides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <article
                className="hero-panel relative overflow-hidden bg-slate-950 text-white"
                style={resolveBackground(slide)}
              >
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-32 right-[-4%] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl md:h-96 md:w-96"
                  animate={
                    reducedMotion
                      ? { opacity: 0.45 }
                      : {
                          opacity: activeSlide === index ? 0.65 : 0.3,
                          x: activeSlide === index ? 0 : 24,
                          y: activeSlide === index ? 0 : -12,
                        }
                  }
                  transition={{ duration: 1.1 }}
                />
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-36 left-[-2%] h-64 w-64 rounded-full bg-teal-400/25 blur-3xl md:h-80 md:w-80"
                  animate={
                    reducedMotion
                      ? { opacity: 0.4 }
                      : {
                          opacity: activeSlide === index ? 0.68 : 0.24,
                          scale: activeSlide === index ? 1.08 : 0.94,
                        }
                  }
                  transition={{ duration: 1.2 }}
                />

                <div className="container-shell relative z-10 flex min-h-[calc(100svh-4rem)] items-end py-8 sm:py-10 md:min-h-[calc(100svh-5rem)] md:py-14">
                  {renderHeroClassic(slide, index)}
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="pointer-events-none absolute inset-y-0 left-3 z-20 hidden items-center sm:flex md:left-6">
          <div className="pointer-events-auto inline-flex flex-col items-center rounded-full border border-white/20 bg-slate-950/45 px-3 py-4 text-[11px] font-semibold tracking-[0.14em] text-slate-100 backdrop-blur-md">
            <span>{String(activeSlide + 1).padStart(2, '0')}</span>
            <span className="my-2 h-10 w-px bg-white/30" />
            <span>{String(renderedSlides.length).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20">
          <div className="container-shell flex items-center justify-end">
            <div className="pointer-events-auto inline-flex items-center gap-1 rounded-full border border-white/20 bg-slate-950/45 p-1 backdrop-blur-md">
              <button
                type="button"
                onClick={() => swiperInstance?.slidePrev()}
                className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-100 transition hover:bg-white/15"
                aria-label="Önceki slide"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => swiperInstance?.slideNext()}
                className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Sonraki slide"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell pt-6 pb-16 md:pt-8 md:pb-24">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-3xl border border-brand-100/80 bg-white p-6 shadow-soft md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Güven Ağı ve Ölçek</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900 md:text-3xl">{homeSections.trustHeading}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{homeSections.trustDescription}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {homeSections.trustItems.map((item) => (
                  <article key={item.label} className="rounded-2xl border border-brand-100 bg-slate-50/80 p-4 transition hover:border-brand-300">
                    <h3 className="text-sm font-semibold text-slate-900">{item.label}</h3>
                    <p className="mt-1 text-xs leading-6 text-slate-600">{item.detail}</p>
                  </article>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {homeSections.highlightStats.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-brand-100 bg-white p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">{item.title}</p>
                    <p className="mt-2 text-3xl font-semibold leading-none text-slate-900">{item.value}</p>
                    <p className="mt-2 text-xs leading-6 text-slate-600">{item.text}</p>
                  </article>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-brand-950 to-brand-900 p-6 text-white shadow-soft md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">{homeSections.whyHeading}</p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-100">
                {homeSections.whyPoints.map((point) => (
                  <li key={point} className="rounded-xl border border-white/15 bg-white/5 px-3 py-2">
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">{homeSections.focusHeading}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {homeSections.focusTags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="focus-ring inline-flex rounded-full bg-teal-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300" to="/cozumler">
                  Tüm Çözümleri Gör
                </Link>
                <Link className="focus-ring inline-flex rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20" to="/iletisim">
                  Toplantı Talep Et
                </Link>
              </div>
            </article>
          </div>
      </section>

      <section className="container-shell pb-16 md:pb-24">
        <div className="rounded-3xl border border-brand-100/80 bg-gradient-to-b from-white to-brand-50/40 p-6 shadow-soft md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Yapılan İşler</p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight text-brand-950 md:text-3xl">
                {homeSections.worksHeading}
              </h2>
            </div>
            <Link
              to="/cozumler"
              className="focus-ring inline-flex rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
            >
              Tüm Projeleri Gör
            </Link>
          </div>

          {activeWork && (
            <motion.article
              key={`selected-${activeWork.id}`}
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34 }}
              className="mt-7 grid items-stretch gap-4 lg:grid-cols-[1.2fr_0.8fr]"
            >
              <div
                className="relative min-h-[400px] overflow-hidden rounded-3xl border border-slate-300/70 bg-slate-950 md:min-h-[440px]"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.14) 8%, rgba(2,6,23,0.82) 100%), url(${getWorkVisual(rotatingWorkIndex + 1)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(255,255,255,0.2),transparent_36%)]" />
                <div className="absolute inset-0 flex items-end p-6 text-white md:p-8">
                  <div className="w-full max-w-[36rem] rounded-2xl border border-white/25 bg-black/35 p-5 text-left backdrop-blur-sm md:p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-100">{activeWork.category}</p>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight md:text-4xl">{activeWork.title}</h3>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-100">{activeWork.client}</p>
                  </div>
                </div>
              </div>

              <div className="flex h-full flex-col rounded-3xl border border-brand-100 bg-white p-6 shadow-soft md:p-8">
                <span className="w-fit rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {activeWork.period}
                </span>
                <p className="mt-3 text-sm leading-7 text-slate-600">{homeSections.worksDescription}</p>
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-700">{activeWork.summary}</p>

                <div className="mt-6 p-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-2">
                      {completedWorks.map((item, index) => (
                        <button
                          key={`selected-dot-${item.id}`}
                          type="button"
                          onClick={() => setRotatingWorkIndex(index)}
                          className={`focus-ring rounded-full transition ${
                            index === rotatingWorkIndex
                              ? 'h-2.5 w-5 bg-brand-900'
                              : 'h-2.5 w-2.5 bg-brand-300 hover:bg-brand-500'
                          }`}
                          aria-label={`${item.title} projesini göster`}
                        />
                      ))}
                    </div>

                    <Link
                      to={`/cozumler/${activeWork.slug}`}
                      className="focus-ring inline-flex rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
                    >
                      Proje Detayı
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          )}
        </div>
      </section>

      <CtaBand
        title="İhtiyacınıza uygun kurumsal çözüm yol haritasını birlikte netleştirelim"
        text="Teklif, demo veya teknik keşif toplantısı için ekibimizle doğrudan iletişime geçebilirsiniz."
        primaryLabel="Toplantı Planla"
        primaryTo="/iletisim"
        secondaryLabel="Referansları İncele"
        secondaryTo="/referanslar"
      />
    </>
  )
}

export default HomePage
