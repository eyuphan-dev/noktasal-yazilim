import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SectionIntro from '../../components/sections/SectionIntro'

const FORM_MODES = [
  {
    id: 'contact',
    title: 'İletişim Formu',
    helper: 'Proje, iş birliği veya genel sorularınız için iletişime geçin.',
    submitLabel: 'Mesaj Gönder',
  },
  {
    id: 'demo',
    title: 'Demo Talep Formu',
    helper: 'Ürün ve modülleri canlı görüşmede incelemek için bilgi bırakın.',
    submitLabel: 'Demo Talebi Gönder',
  },
  {
    id: 'application',
    title: 'Başvuru Formu',
    helper: 'Açılan ilanlara veya genel başvuruya uygun kısa aday bilgilerini iletin.',
    submitLabel: 'Başvuru Gönder',
  },
]

function getInitialMode(formKey) {
  if (formKey === 'demo' || formKey === 'application' || formKey === 'contact') {
    return formKey
  }
  return 'contact'
}

function ContactPage() {
  const [searchParams] = useSearchParams()

  const initialMode = getInitialMode(searchParams.get('form'))
  const selectedPosition = searchParams.get('position') || ''

  const [activeForm, setActiveForm] = useState(initialMode)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverMessage, setServerMessage] = useState('')

  const [contactValues, setContactValues] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  })

  const [demoValues, setDemoValues] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    preferredDate: '',
    message: '',
  })

  const [applicationValues, setApplicationValues] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: selectedPosition,
    experience: '',
    portfolio: '',
    note: '',
    cvFileName: '',
  })

  const activeCopy = useMemo(
    () => FORM_MODES.find((mode) => mode.id === activeForm) || FORM_MODES[0],
    [activeForm],
  )

  const runMockSubmit = async () => {
    setIsSubmitting(true)
    setServerMessage('')

    await new Promise((resolve) => setTimeout(resolve, 650))

    setServerMessage(
      `Talebiniz alındı (${activeCopy.title}). Bu adım şimdilik sadece UI tarafında çalışmaktadır.`,
    )
    setIsSubmitting(false)
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    await runMockSubmit()
  }

  const handleDemoSubmit = async (event) => {
    event.preventDefault()
    await runMockSubmit()
  }

  const handleApplicationSubmit = async (event) => {
    event.preventDefault()
    await runMockSubmit()
  }

  return (
    <section className="container-shell py-16 md:py-24">
      <SectionIntro
        eyebrow="İletişim"
        title="İletişim, demo ve başvuru süreçlerini tek noktadan yönetin"
        description="İhtiyacınıza göre form türünü seçin ve ilgili ekibe hızlı şekilde talep oluşturun."
      />

      <section className="mt-10 rounded-3xl border border-brand-100 bg-white p-6 shadow-soft md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">İletişim Bilgileri</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['E-posta', 'info@noktasalyazilim.com'],
            ['İK', 'ik@noktasal.com.tr'],
            ['Telefon', '+90 212 000 00 00'],
            ['Adres', 'Kocaeli Üniversitesi Teknoloji Geliştirme Bölgesi, Kocaeli'],
          ].map(([label, value]) => (
            <article key={label} className="rounded-2xl border border-brand-100 bg-brand-50/40 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-700">{label}</p>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-700">{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-soft">
        <div className="border-b border-brand-100 bg-gradient-to-r from-brand-950 to-slate-900 px-5 py-4 text-white md:px-7">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-100">Konum</p>
          <h2 className="mt-1 text-lg font-semibold md:text-xl">Teknopark ve ofis lokasyonu</h2>
        </div>
        <iframe
          title="Kocaeli Üniversitesi Teknoloji Geliştirme Bölgesi"
          src="https://www.google.com/maps?q=Kocaeli%20Universitesi%20Teknoloji%20Gelistirme%20Bolgesi&output=embed"
          className="h-[460px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <section className="mt-8 rounded-3xl border border-brand-100/80 bg-gradient-to-b from-white to-brand-50/35 p-5 shadow-soft md:p-7">
        <article className="rounded-3xl border border-brand-100/80 bg-white p-5 shadow-soft md:p-7">
          <div className="rounded-2xl border border-slate-800/70 bg-slate-950 p-1.5 sm:inline-flex">
            {FORM_MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  setActiveForm(mode.id)
                  setServerMessage('')
                }}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  activeForm === mode.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {mode.title}
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-brand-100 bg-white p-5 md:p-6">
            <h2 className="text-2xl font-semibold text-brand-950">{activeCopy.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{activeCopy.helper}</p>

            {activeForm === 'contact' && (
              <form className="mt-5 space-y-4" noValidate onSubmit={handleContactSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700">
                    Ad Soyad
                    <input
                      className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                      value={contactValues.fullName}
                      onChange={(event) => setContactValues((prev) => ({ ...prev, fullName: event.target.value }))}
                      autoComplete="name"
                      required
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700">
                    E-posta
                    <input
                      className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                      type="email"
                      value={contactValues.email}
                      onChange={(event) => setContactValues((prev) => ({ ...prev, email: event.target.value }))}
                      autoComplete="email"
                      required
                    />
                  </label>
                </div>

                <label className="block text-sm font-medium text-slate-700">
                  Telefon
                  <input
                    className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                    value={contactValues.phone}
                    onChange={(event) => setContactValues((prev) => ({ ...prev, phone: event.target.value }))}
                    autoComplete="tel"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Mesaj
                  <textarea
                    className="focus-ring mt-2 min-h-28 w-full rounded-lg border border-slate-300 px-3 py-2"
                    value={contactValues.message}
                    onChange={(event) => setContactValues((prev) => ({ ...prev, message: event.target.value }))}
                    required
                  />
                </label>

                <button
                  className="focus-ring w-full rounded-lg bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? 'Gönderiliyor...' : activeCopy.submitLabel}
                </button>
              </form>
            )}

            {activeForm === 'demo' && (
              <form className="mt-5 space-y-4" noValidate onSubmit={handleDemoSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700">
                    Ad Soyad
                    <input
                      className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                      value={demoValues.fullName}
                      onChange={(event) => setDemoValues((prev) => ({ ...prev, fullName: event.target.value }))}
                      autoComplete="name"
                      required
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700">
                    Kurum / Şirket
                    <input
                      className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                      value={demoValues.company}
                      onChange={(event) => setDemoValues((prev) => ({ ...prev, company: event.target.value }))}
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700">
                    E-posta
                    <input
                      className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                      type="email"
                      value={demoValues.email}
                      onChange={(event) => setDemoValues((prev) => ({ ...prev, email: event.target.value }))}
                      autoComplete="email"
                      required
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700">
                    Telefon
                    <input
                      className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                      value={demoValues.phone}
                      onChange={(event) => setDemoValues((prev) => ({ ...prev, phone: event.target.value }))}
                      autoComplete="tel"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700">
                    Tercih Edilen Tarih
                    <input
                      className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                      type="date"
                      value={demoValues.preferredDate}
                      onChange={(event) => setDemoValues((prev) => ({ ...prev, preferredDate: event.target.value }))}
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700">
                    Not
                    <input
                      className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                      value={demoValues.message}
                      onChange={(event) => setDemoValues((prev) => ({ ...prev, message: event.target.value }))}
                      placeholder="Odaklanmamızı istediğiniz modül"
                    />
                  </label>
                </div>

                <button
                  className="focus-ring w-full rounded-lg bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? 'Gönderiliyor...' : activeCopy.submitLabel}
                </button>
              </form>
            )}

            {activeForm === 'application' && (
              <form className="mt-5 space-y-4" noValidate onSubmit={handleApplicationSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700">
                    Ad Soyad
                    <input
                      className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                      value={applicationValues.fullName}
                      onChange={(event) => setApplicationValues((prev) => ({ ...prev, fullName: event.target.value }))}
                      autoComplete="name"
                      required
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700">
                    E-posta
                    <input
                      className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                      type="email"
                      value={applicationValues.email}
                      onChange={(event) => setApplicationValues((prev) => ({ ...prev, email: event.target.value }))}
                      autoComplete="email"
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700">
                    Telefon
                    <input
                      className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                      value={applicationValues.phone}
                      onChange={(event) => setApplicationValues((prev) => ({ ...prev, phone: event.target.value }))}
                      autoComplete="tel"
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700">
                    Başvurulan Pozisyon
                    <input
                      className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                      value={applicationValues.position}
                      onChange={(event) => setApplicationValues((prev) => ({ ...prev, position: event.target.value }))}
                      placeholder="Örn. Frontend Developer"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700">
                    Deneyim Seviyesi
                    <select
                      className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                      value={applicationValues.experience}
                      onChange={(event) => setApplicationValues((prev) => ({ ...prev, experience: event.target.value }))}
                    >
                      <option value="">Seçiniz</option>
                      <option value="0-2">0-2 Yıl</option>
                      <option value="2-5">2-5 Yıl</option>
                      <option value="5+">5+ Yıl</option>
                    </select>
                  </label>
                  <label className="text-sm font-medium text-slate-700">
                    Portfolyo / LinkedIn
                    <input
                      className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                      value={applicationValues.portfolio}
                      onChange={(event) => setApplicationValues((prev) => ({ ...prev, portfolio: event.target.value }))}
                      placeholder="https://"
                    />
                  </label>
                </div>

                <label className="block text-sm font-medium text-slate-700">
                  CV Dosyası
                  <input
                    className="focus-ring mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(event) => {
                      const file = event.target.files?.[0]
                      setApplicationValues((prev) => ({ ...prev, cvFileName: file ? file.name : '' }))
                    }}
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    {applicationValues.cvFileName ? `Seçilen dosya: ${applicationValues.cvFileName}` : 'PDF, DOC veya DOCX dosyası yükleyebilirsiniz.'}
                  </p>
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Kısa Not
                  <textarea
                    className="focus-ring mt-2 min-h-24 w-full rounded-lg border border-slate-300 px-3 py-2"
                    value={applicationValues.note}
                    onChange={(event) => setApplicationValues((prev) => ({ ...prev, note: event.target.value }))}
                    placeholder="Kısaca hangi alana odaklandığınızı yazabilirsiniz."
                  />
                </label>

                <button
                  className="focus-ring w-full rounded-lg bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? 'Gönderiliyor...' : activeCopy.submitLabel}
                </button>

                <p className="rounded-xl border border-brand-100 bg-brand-50/60 px-3 py-2 text-xs text-brand-800">
                  Özgeçmiş bilgilerinizi ayrıca ik@noktasal.com.tr adresine de iletebilirsiniz.
                </p>
              </form>
            )}

            {serverMessage ? (
              <p aria-live="polite" className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                {serverMessage}
              </p>
            ) : null}
          </div>
        </article>
      </section>
    </section>
  )
}

export default ContactPage
