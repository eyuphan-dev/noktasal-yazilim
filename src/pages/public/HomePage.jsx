import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import CtaBand from '../../components/sections/CtaBand'
import { A11y, Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'

const MotionBadge = motion.p
const MotionTitle = motion.h1
const MotionText = motion.p
const MotionLink = motion(Link)

const slides = [
  {
    id: 's1',
    tag: 'Modern Kurumsal Mimari',
    title: 'Kurumsal süreçlerinizi güvenle dijitalleştirin.',
    text: 'Kamu ve B2B odaklı projelerde ölçeklenebilir yazılım platformları geliştiriyoruz.',
    cta: 'Çözümleri İncele',
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
    photo:
      'https://images.unsplash.com/photo-1451188502541-13943edb6acb?auto=format&fit=crop&w=2200&q=80',
    panelTitle: 'Sürdürülebilir Kod Yaşam Döngüsü',
    panelText: 'Kod kalitesi, test otomasyonu ve ölçülebilir teslim yaklaşımı ile teknik borcu azaltan ürün geliştirme.',
    stats: ['CI/CD Uyumlu Yapı', 'Kalite Güvencesi Süreci', 'Uzun Vadeli Ölçeklenme'],
  },
]

const trustItems = [
  { label: 'Kamu Kurumları', detail: 'Mevzuata uyumlu dijital dönüşüm' },
  { label: 'Finans Kuruluşları', detail: 'Güvenli işlem ve raporlama altyapısı' },
  { label: 'Lojistik Operatörleri', detail: 'Anlık operasyon izleme ve optimizasyon' },
  { label: 'B2B Üretim Şirketleri', detail: 'Uçtan uca tedarik süreç dijitalleşmesi' },
]

const highlightStats = [
  { title: 'Kurumsal Proje', value: '40+', text: 'Canlıda çalışan teslimat sayısı' },
  { title: 'Sektörel Deneyim', value: '12', text: 'Farklı regülasyon yapısında uygulama' },
  { title: 'Operasyon Destek', value: '7/24', text: 'SLA tabanlı sürekli izleme ve müdahale' },
]

const whyPoints = [
  'Kurumsal yönetim, güvenlik ve operasyon standartlarına uygun modern mimari.',
  'Ürün odaklı teslim modeliyle ölçeklenebilir ve sürdürülebilir kod tabanı.',
  'Entegrasyon, raporlama ve destek sürecini tek merkezden yönetebilen ekip yapısı.',
]

function HomePage() {
  const reducedMotion = useReducedMotion()
  const [activeSlide, setActiveSlide] = useState(0)
  const [swiperInstance, setSwiperInstance] = useState(null)

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
          {slides.map((slide, index) => (
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
                  <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
                    <div>
                    <MotionBadge
                      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                      animate={activeSlide === index ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 4 }}
                      transition={{ duration: 0.46 }}
                      className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100"
                    >
                      {slide.tag}
                    </MotionBadge>
                    <MotionTitle
                      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                      animate={activeSlide === index ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 8 }}
                      transition={{ duration: 0.58 }}
                      className="mt-5 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl xl:text-6xl"
                    >
                      {slide.title}
                    </MotionTitle>
                    <MotionText
                      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                      animate={activeSlide === index ? { opacity: 1, y: 0 } : { opacity: 0.45, y: 6 }}
                      transition={{ duration: 0.6 }}
                      className="mt-6 max-w-2xl text-sm leading-7 text-slate-200 md:text-base"
                    >
                      {slide.text}
                    </MotionText>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <MotionLink
                        to="/iletisim"
                        initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                        animate={activeSlide === index ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 4 }}
                        transition={{ duration: 0.5 }}
                        className="focus-ring inline-flex rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
                      >
                        {slide.cta}
                      </MotionLink>
                      <Link
                        to="/cozumler"
                        className="focus-ring inline-flex rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                      >
                        Mimariyi İncele
                      </Link>
                    </div>
                    </div>

                    <motion.aside
                      initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
                      animate={activeSlide === index ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.6, y: 6, scale: 0.99 }}
                      transition={{ duration: 0.55 }}
                      className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md md:p-6"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">{slide.panelTitle}</p>
                      <p className="mt-3 text-sm leading-7 text-slate-200">{slide.panelText}</p>
                      <ul className="mt-5 space-y-2">
                        {slide.stats.map((stat) => (
                          <li key={stat} className="rounded-xl border border-white/15 bg-slate-900/35 px-3 py-2 text-sm font-medium text-slate-100">
                            {stat}
                          </li>
                        ))}
                      </ul>
                    </motion.aside>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="pointer-events-none absolute inset-y-0 left-3 z-20 hidden items-center sm:flex md:left-6">
          <div className="pointer-events-auto inline-flex flex-col items-center rounded-full border border-white/20 bg-slate-950/45 px-3 py-4 text-[11px] font-semibold tracking-[0.14em] text-slate-100 backdrop-blur-md">
            <span>{String(activeSlide + 1).padStart(2, '0')}</span>
            <span className="my-2 h-10 w-px bg-white/30" />
            <span>{String(slides.length).padStart(2, '0')}</span>
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

      <section className="container-shell pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white via-slate-50 to-brand-50/50 p-5 shadow-soft md:p-7">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Güven Ağı</p>
              <p className="mt-2 text-sm text-slate-600">Kritik operasyon süreçlerini yönettiğimiz sektörler</p>
            </div>
            <span className="rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold text-brand-800">Kurumsal Referans Ekosistemi</span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item) => (
              <article key={item.label} className="interactive-lift rounded-2xl border border-brand-100/80 bg-white/90 p-4">
                <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <h2 className="mt-3 text-sm font-semibold text-slate-900">{item.label}</h2>
                <p className="mt-1 text-xs leading-6 text-slate-600">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell pb-16 md:pb-24">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {highlightStats.map((item) => (
            <article key={item.title} className="interactive-lift rounded-2xl border border-brand-100/80 bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">{item.title}</p>
              <p className="mt-4 text-4xl font-semibold leading-none text-slate-900">{item.value}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              <div className="mt-4 h-1 w-14 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400" />
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell pb-16 md:pb-24">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="interactive-lift rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-brand-950 to-brand-900 p-7 text-white shadow-soft md:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">Neden Noktasal?</p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight md:text-3xl">Kurumsal teknoloji yolculuğunu yönetilebilir hale getiriyoruz</h2>
            <ul className="mt-7 space-y-4 text-sm leading-7 text-slate-100 md:text-base">
              {whyPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-400/20 text-teal-200">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="interactive-lift rounded-3xl border border-brand-100/70 bg-gradient-to-b from-white via-slate-50 to-brand-50/40 p-7 shadow-soft md:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Odak Alanları</p>
            <h3 className="mt-3 text-2xl font-semibold text-brand-950">Kamu ve B2B süreçleri</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">Başvuru, operasyon, entegrasyon ve karar destek sistemleri için yüksek görünürlükte kullanıcı deneyimi.</p>
            <div className="mt-5 rounded-2xl border border-brand-100 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Hızlı Değer Üretimi</p>
              <p className="mt-2 text-sm text-slate-700">İlk versiyon teslimi sonrası ölçümleme, iyileştirme ve ölçekleme adımlarını birlikte yönetiyoruz.</p>
            </div>
            <Link className="focus-ring mt-6 inline-flex rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800" to="/cozumler">
              Tüm Çözümleri Gör
            </Link>
          </article>
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
