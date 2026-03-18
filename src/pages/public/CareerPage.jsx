import CtaBand from '../../components/sections/CtaBand'
import SectionIntro from '../../components/sections/SectionIntro'

function CareerPage() {
  return (
    <>
      <section className="container-shell py-16 md:py-24">
        <SectionIntro
          eyebrow="Kariyer"
          title="Uzun vadeli ürün ekipleri kuruyoruz"
          description="Yazılım kalitesi, ekip kültürü ve sürdürülebilir teslim modeline inanan ekip arkadaşları arıyoruz."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            ['Frontend Developer', 'İstanbul / Hibrit', 'React, performans ve tasarım sistemi deneyimi'],
            ['Backend Developer', 'Ankara / Uzaktan', 'API tasarımı, entegrasyon ve güvenlik odaklı geliştirme'],
          ].map(([title, location, summary]) => (
            <article key={title} className="interactive-lift rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-brand-950">{title}</h2>
              <p className="mt-2 text-sm font-medium text-brand-700">{location}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{summary}</p>
              <button
                className="focus-ring mt-6 rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
                type="button"
              >
                Başvuru Yap
              </button>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title="Açık pozisyon dışında da uzmanlığınızı paylaşabilirsiniz"
        text="Genel başvuruları değerlendiriyor, uygun role göre ekibimizle sizi buluşturuyoruz."
        primaryLabel="Genel Başvuru"
        primaryTo="/iletisim"
        secondaryLabel="Şirketi Tanı"
        secondaryTo="/hakkimizda"
      />
    </>
  )
}

export default CareerPage
