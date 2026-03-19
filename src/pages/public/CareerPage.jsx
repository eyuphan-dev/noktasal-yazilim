import { Link } from 'react-router-dom'
import CtaBand from '../../components/sections/CtaBand'
import SectionIntro from '../../components/sections/SectionIntro'

const openRoles = [
  {
    title: 'Frontend Developer',
    location: 'Istanbul / Hibrit',
    summary: 'React, performans, komponent mimarisi ve tasarim sistemi deneyimi.',
  },
  {
    title: 'Backend Developer',
    location: 'Ankara / Uzaktan',
    summary: 'API tasarimi, entegrasyonlar, veri guvenligi ve olceklenebilir servis gelistirme.',
  },
]

function CareerPage() {
  return (
    <>
      <section className="container-shell py-16 md:py-24">
        <SectionIntro
          eyebrow="Kariyer"
          title="Kamu ve kurumsal projelerde deger uretecek ekip arkadaslari ariyoruz"
          description="Cografi bilgi sistemleri ve kurumsal yazilim projelerinde sorumluluk alan, urun kalitesine onem veren ekiplerle calismayi hedefliyoruz."
        />

        <article className="mt-10 rounded-3xl border border-brand-100 bg-gradient-to-br from-white via-brand-50/30 to-white p-6 shadow-soft md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Basvuru Bilgisi</p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl">
            Ozgecmisinizi tek adimda iletin, uygun pozisyon icin insan kaynaklari ekibimiz sizinle iletisime gecsin
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            Ozgecmis bilgilerinizi <span className="font-semibold text-brand-900">ik@noktasal.com.tr</span> adresine gonderebilirsiniz.
          </p>
        </article>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {openRoles.map((role) => (
            <article key={role.title} className="interactive-lift rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-brand-950">{role.title}</h2>
              <p className="mt-2 text-sm font-medium text-brand-700">{role.location}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{role.summary}</p>
              <Link
                to={`/iletisim?form=application&position=${encodeURIComponent(role.title)}`}
                className="focus-ring mt-6 rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
              >
                Başvuru Yap
              </Link>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title="Açık pozisyon dışında da uzmanlığınızı paylaşabilirsiniz"
        text="Genel başvuruları değerlendiriyor, uygun role göre ekibimizle sizi buluşturuyoruz."
        primaryLabel="Genel Başvuru"
        primaryTo="/iletisim?form=application"
        secondaryLabel="Şirketi Tanı"
        secondaryTo="/hakkimizda"
      />
    </>
  )
}

export default CareerPage
