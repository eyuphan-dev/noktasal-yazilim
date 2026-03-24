import CtaBand from '../../components/sections/CtaBand'
import SectionIntro from '../../components/sections/SectionIntro'

const milestones = [
  {
    title: '2012 - Kuruluş',
    text: 'Kocaeli Üniversitesi Teknoloji Geliştirme Bölgesinde, Coğrafi Bilgi Sistemlerine özgü yazılımlar geliştirmek amacıyla kuruldu.',
  },
  {
    title: '12+ Yıllık Uzmanlık',
    text: 'Kamu odaklı dijital projelerde, yenilikçi çözümler ve sürdürülebilir yazılım mimarileriyle üretime devam etti.',
  },
  {
    title: 'Bugün',
    text: 'Kurumların kritik verilerini güvenli biçimde yönetiyor; çapraz sorgu, raporlama ve istatistik üretimini tek çatı altında sunuyor.',
  },
]

const capabilityCards = [
  {
    title: 'Güvenli Veri Yönetimi',
    text: 'Mahrem kabul edilen kurumsal veriler için güvenlik odaklı saklama, erişim ve izleme altyapıları.',
  },
  {
    title: 'Çapraz Sorgu Altyapısı',
    text: 'Farklı veri kaynaklarını anlamlı ilişkilendirerek karar süreçlerini hızlandıran sorgu katmanları.',
  },
  {
    title: 'Rapor ve İstatistik',
    text: 'Yönetsel görünürlük sağlayan, ölçülebilir çıktılar üreten raporlama ve analitik paneller.',
  },
]

const certificates = [
  { id: 'iso-27001', title: 'ISO 27001', image: '/iso27001-150x150.png' },
  { id: 'iso-15504', title: 'ISO 15504', image: '/iso15504-150x150.png' },
]

const accreditations = ['Kamu Bilişim Yetki Belgesi', 'Yazılım Yetki Belgesi']

function AboutPage() {
  return (
    <>
      <section className="container-shell py-16 md:py-24">
        <SectionIntro
          eyebrow="Hakkımızda"
          title="Coğrafi bilgi sistemlerinde kurumsal güvenin ve sürdürülebilir yazılımın teknoloji ortağıyız."
          description="2012'den bu yana kamu kurumları için yüksek güvenlikli veri yönetimi, çapraz sorgu altyapıları ve karar destek çözümleri geliştiriyoruz."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-3xl border border-brand-100 bg-gradient-to-br from-white via-brand-50/35 to-white p-6 shadow-soft md:p-8">
            <p className="inline-flex rounded-full border border-brand-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
              Kurumsal Hikaye
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl">
              Kamu kurumlarının kritik süreçlerini güvenli yazılım altyapılarına dönüştürüyoruz
            </h2>

            <p className="mt-5 text-sm leading-8 text-slate-700 md:text-base">
              2012 yılında Kocaeli Üniversitesi Teknoloji Geliştirme Bölgesinde kuruldu. Coğrafi Bilgi Sistemlerine özgün yazılımlar geliştirmek için kurulan şirketimiz, 12 yılı aşkın süredir yenilikçi çözümler geliştirmeye devam etmektedir.
            </p>
            <p className="mt-4 text-sm leading-8 text-slate-700 md:text-base">
              Kamu müşterilerimize verdiğimiz güvenle, kurumların mahrem sayılacak verilerini yönetiyor; çapraz sorgulamalarla raporlar ve istatistikler sunuyoruz.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ['2012', 'Teknopark kuruluş yılı'],
                ['12+ Yıl', 'Kesintisiz çözüm geliştirme'],
                ['Kamu Odaklı', 'Yüksek güvenlik standardı'],
              ].map(([value, label]) => (
                <article key={label} className="rounded-2xl border border-brand-100 bg-white p-4">
                  <p className="text-2xl font-semibold leading-none text-slate-900">{value}</p>
                  <p className="mt-2 text-xs leading-6 text-slate-600">{label}</p>
                </article>
              ))}
            </div>
          </article>

          <article className="relative overflow-hidden rounded-3xl border border-slate-300/80 bg-slate-950 shadow-soft">
            <img
              src="/fuar.jpg"
              alt="Fuarda kurumsal çözüm sunumundan bir kare"
              className="h-full min-h-[320px] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">Saha Deneyimi</p>
              <p className="mt-2 text-sm leading-6 text-slate-100">Kurum ihtiyaçlarını sahada dinleyip, ürüne dönüştüren ekip kültürü.</p>
            </div>
          </article>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {capabilityCards.map((item) => (
            <article key={item.title} className="interactive-lift rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
              <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-brand-700">Yetkinlik</p>
              <h2 className="mt-2 text-lg font-semibold text-brand-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <section className="rounded-3xl border border-brand-100 bg-white p-6 shadow-soft md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Gelişim Çizgisi</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">Kuruluştan bugüne odaklandığımız değer üretim modeli</h3>

            <div className="mt-5 space-y-3">
              {milestones.map((step, index) => (
                <article key={step.title} className="rounded-2xl border border-brand-100 bg-slate-50/80 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-700">Bölüm {index + 1}</p>
                  <h4 className="mt-1 text-base font-semibold text-slate-900">{step.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{step.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-brand-100 bg-gradient-to-b from-white to-brand-50/40 p-6 shadow-soft md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Akreditasyon ve Standartlar</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">Bakanlık onaylı yetki belgeleri ve ISO standartlarıyla proje yürütümü</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              T.C. Sanayi Bakanlığı Milli Teknoloji Genel Müdürlüğü onaylı akreditasyonlarla, kamu projelerinde güven ve mevzuat uyumunu esas alıyoruz.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {accreditations.map((item) => (
                <span key={item} className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand-800">
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {certificates.map((item) => (
                <article key={item.id} className="rounded-2xl border border-brand-100 bg-white p-4 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-brand-100 bg-slate-50">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain p-1.5"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h4 className="mt-3 text-sm font-semibold text-slate-900">{item.title}</h4>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <CtaBand
        title="Kurumsal dönüşüm yolculuğunuz için teknik bir ekip arkadaşı arıyorsanız görüşelim"
        text="Mevcut sistemlerinizi, risklerinizi ve hedef mimariyi birlikte değerlendirelim."
        primaryLabel="İletişime Geç"
        primaryTo="/iletisim"
        secondaryLabel="Çözümlere Git"
        secondaryTo="/cozumler"
      />
    </>
  )
}

export default AboutPage
