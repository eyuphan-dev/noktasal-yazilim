import { Link } from 'react-router-dom'

const homeVariants = [
  {
    key: 'home-v1',
    title: 'Varyant 1 - Kurumsal Hikaye Akisi',
    points: [
      'Hero + tek buyuk deger blogu',
      'Tek partner/logo bandi',
      'Tek guclu CTA alani',
    ],
  },
  {
    key: 'home-v2',
    title: 'Varyant 2 - Vaka Odakli Minimal',
    points: [
      'Hero + 2 buyuk vaka paneli',
      'Az bilesen, yuksek okunabilirlik',
      'Yalin akista tek karar noktasi',
    ],
  },
  {
    key: 'home-v3',
    title: 'Varyant 3 - Premium Segment Bloklar',
    points: [
      'Buyuk split bloklar',
      'Guçlu segment sunumu',
      'Premium kompozisyon, az kart',
    ],
  },
]

const solutionsVariants = [
  {
    key: 'sol-v1',
    title: 'Varyant 1 - Cozum Aileleri',
    points: [
      'Ustte tek cozum aileleri bandi',
      'Altta kompakt proje satirlari',
      'Detaya gecis tek aksiyonla',
    ],
  },
  {
    key: 'sol-v2',
    title: 'Varyant 2 - Case List',
    points: [
      'Kart yerine liste tabanli sergileme',
      '10-15+ is icin olceklenebilir yapi',
      'Kisa ozet + etki + detay',
    ],
  },
  {
    key: 'sol-v3',
    title: 'Varyant 3 - Segment + Is Satirlari',
    points: [
      'Kamu/Enerji/Operasyon segmentleri',
      'Her segmentte secili isler',
      'Yuksek bilgi yogunlugu, sade UX',
    ],
  },
]

function VariantCard({ title, points, accent = 'brand' }) {
  const accentStyles =
    accent === 'teal'
      ? 'border-teal-200/70 from-teal-50 to-white text-teal-900'
      : accent === 'slate'
        ? 'border-slate-300/80 from-slate-100 to-white text-slate-900'
        : 'border-brand-200/80 from-brand-50 to-white text-brand-950'

  return (
    <article className={`rounded-2xl border bg-gradient-to-br p-5 shadow-soft ${accentStyles}`}>
      <h3 className="text-base font-semibold leading-6">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {points.map((point) => (
          <li key={point} className="rounded-lg border border-slate-200 bg-white/80 px-3 py-2">
            {point}
          </li>
        ))}
      </ul>
    </article>
  )
}

function DesignComparisonPage() {
  return (
    <section className="container-shell py-14 md:py-20">
      <header className="rounded-3xl border border-brand-100/80 bg-gradient-to-br from-white to-brand-50/50 p-6 shadow-soft md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Tasarim Karsilastirma</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-brand-950 md:text-4xl">
          Anasayfa ve Cozumler icin 3 farkli gelistirme onerisi
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
          Bu ekran patron geri bildirimi icin hazirlandi. Her varyant daha az kart, daha buyuk parcali yapi ve daha odakli
          bilgi hiyerarsisi yaklasimini temsil eder.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="focus-ring inline-flex rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
          >
            Anasayfaya Don
          </Link>
          <Link
            to="/cozumler"
            className="focus-ring inline-flex rounded-full bg-brand-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            Cozumler Sayfasina Don
          </Link>
        </div>
      </header>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-slate-900">Anasayfa Alternatifleri</h2>
        <div className="mt-4 grid gap-4 xl:grid-cols-3">
          {homeVariants.map((variant, index) => (
            <VariantCard
              key={variant.key}
              title={variant.title}
              points={variant.points}
              accent={index === 1 ? 'teal' : index === 2 ? 'slate' : 'brand'}
            />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-slate-900">Cozumler Alternatifleri</h2>
        <div className="mt-4 grid gap-4 xl:grid-cols-3">
          {solutionsVariants.map((variant, index) => (
            <VariantCard
              key={variant.key}
              title={variant.title}
              points={variant.points}
              accent={index === 1 ? 'teal' : index === 2 ? 'slate' : 'brand'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default DesignComparisonPage
