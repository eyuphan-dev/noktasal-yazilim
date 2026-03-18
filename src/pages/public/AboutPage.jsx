import CtaBand from '../../components/sections/CtaBand'
import SectionIntro from '../../components/sections/SectionIntro'

function AboutPage() {
  return (
    <>
      <section className="container-shell py-16 md:py-24">
        <SectionIntro
          eyebrow="Hakkımızda"
          title="Kurumsal süreçleri uzun ömürlü yazılım sistemlerine dönüştürüyoruz."
          description="Analiz, ürünleştirme, teslim ve operasyon aşamalarını aynı kalite standardında yönetiyoruz."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ['Misyon', 'Kurumsal süreçleri sade, ölçeklenebilir ve güvenilir dijital altyapılara taşımak.'],
            ['Vizyon', 'Kamu ve B2B odaklı yazılım projelerinde referans teknoloji ortağı olmak.'],
            ['Yaklaşım', 'İhtiyaç analizi, net kapsam, ölçülebilir çıktı ve sürdürülebilir teslim.'],
          ].map(([title, text]) => (
            <article key={title} className="interactive-lift rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
              <h2 className="text-lg font-semibold text-brand-950">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </article>
          ))}
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
