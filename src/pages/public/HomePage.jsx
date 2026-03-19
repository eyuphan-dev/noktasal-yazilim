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

const focusTags = ['Başvuru Sistemleri', 'Operasyon Panelleri', 'Karar Destek']

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
                        to="/iletisim"
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

      <section className="container-shell pt-6 pb-16 md:pt-8 md:pb-24">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-3xl border border-brand-100/80 bg-white p-6 shadow-soft md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Güven Ağı ve Ölçek</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900 md:text-3xl">Sektörel tecrübe ve operasyonel güveni tek bakışta gösterin</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">Bu düzen, karar vericinin önce güveni görüp sonra detaylara inmesini sağlar.</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {trustItems.map((item) => (
                  <article key={item.label} className="rounded-2xl border border-brand-100 bg-slate-50/80 p-4 transition hover:border-brand-300">
                    <h3 className="text-sm font-semibold text-slate-900">{item.label}</h3>
                    <p className="mt-1 text-xs leading-6 text-slate-600">{item.detail}</p>
                  </article>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {highlightStats.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-brand-100 bg-white p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">{item.title}</p>
                    <p className="mt-2 text-3xl font-semibold leading-none text-slate-900">{item.value}</p>
                    <p className="mt-2 text-xs leading-6 text-slate-600">{item.text}</p>
                  </article>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-brand-950 to-brand-900 p-6 text-white shadow-soft md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">Neden Noktasal?</p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-100">
                {whyPoints.map((point) => (
                  <li key={point} className="rounded-xl border border-white/15 bg-white/5 px-3 py-2">
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">Odak Alanları</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {focusTags.map((tag) => (
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
