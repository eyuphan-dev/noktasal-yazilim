import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SectionIntro from '../../components/sections/SectionIntro'
import { apiRequest } from '../../lib/api/client'
import { apiConfig } from '../../lib/api/config'
import { publicApiService } from '../../features/public/services/publicApiService'

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

const baseInputClass =
  'focus-ring mt-2 w-full border px-3.5 py-2.5 text-sm transition placeholder:text-slate-400'
const baseTextAreaClass =
  'focus-ring mt-2 w-full border px-3.5 py-2.5 text-sm transition placeholder:text-slate-400'

const MONO_THEME = {
  outer: 'rounded-[2rem] bg-white p-4 md:p-6',
  article: 'rounded-[1.75rem] bg-white p-4 ring-1 ring-slate-200 md:p-6',
  modeWrap: 'inline-flex min-w-max items-center gap-1 rounded-2xl bg-slate-100 p-1.5',
  modeActive: 'bg-slate-900 text-white',
  modeIdle: 'text-slate-600 hover:bg-slate-200 hover:text-slate-900',
  panel: 'mt-5 rounded-2xl bg-white p-5 ring-1 ring-slate-200 md:p-6',
  title: 'text-slate-900',
  helper: 'text-slate-700',
  hint: 'text-slate-500',
  input: 'rounded-lg border-2 border-dashed border-slate-300 bg-white text-slate-900 focus:border-slate-500',
  submit: 'rounded-lg bg-slate-900 text-white hover:bg-slate-800',
  note: 'rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-700',
  success: 'rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-900',
}

const PHONE_PATTERN = '^\\+?[0-9\\s()-]{10,}$'

const normalizePhoneInput = (value) => {
  const cleaned = value.replace(/[^0-9+()\-\s]/g, '')
  return cleaned.replace(/(?!^)\+/g, '')
}

const FALLBACK_CONTACT_CONTENT = {
  email: 'info@noktasalyazilim.com',
  hrEmail: 'ik@noktasal.com.tr',
  phone: '+90 212 000 00 00',
  address: 'Kocaeli Üniversitesi Teknoloji Geliştirme Bölgesi, Kocaeli',
  mapUrl:
    'https://www.google.com/maps?q=Kocaeli%20Universitesi%20Teknoloji%20Gelistirme%20Bolgesi&output=embed',
}

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

  const contactContentQuery = useQuery({
    queryKey: ['public-content-section', 'contact-page'],
    queryFn: () => publicApiService.getContentSection('contact-page'),
  })

  const contactContent = {
    ...FALLBACK_CONTACT_CONTENT,
    ...(contactContentQuery.data || {}),
  }

  const runMockSubmit = async () => {
    setIsSubmitting(true)
    setServerMessage('')

    await new Promise((resolve) => setTimeout(resolve, 650))

    setServerMessage(
      `Talebiniz alındı (${activeCopy.title}). Bu adım şimdilik sadece UI tarafında çalışmaktadır.`,
    )
    setIsSubmitting(false)
  }

  const submitForm = async ({ type, name, email, phone, message }) => {
    if (apiConfig.useMock) {
      await runMockSubmit()
      return
    }

    setIsSubmitting(true)
    setServerMessage('')

    try {
      await apiRequest('/forms', {
        method: 'POST',
        body: { type, name, email, phone, message },
      })

      setServerMessage(`Talebiniz alindi (${activeCopy.title}). En kisa surede sizinle iletisime gececegiz.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    await submitForm({
      type: 'contact',
      name: contactValues.fullName,
      email: contactValues.email,
      phone: contactValues.phone,
      message: contactValues.message,
    })

    setContactValues({
      fullName: '',
      email: '',
      phone: '',
      message: '',
    })
  }

  const handleDemoSubmit = async (event) => {
    event.preventDefault()
    await submitForm({
      type: 'demo',
      name: demoValues.fullName,
      email: demoValues.email,
      phone: demoValues.phone,
      message: `Kurum: ${demoValues.company}\nTercih Edilen Tarih: ${demoValues.preferredDate}\nNot: ${demoValues.message}`,
    })

    setDemoValues({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      preferredDate: '',
      message: '',
    })
  }

  const handleApplicationSubmit = async (event) => {
    event.preventDefault()
    await submitForm({
      type: 'application',
      name: applicationValues.fullName,
      email: applicationValues.email,
      phone: applicationValues.phone,
      message: `Pozisyon: ${applicationValues.position}\nDeneyim: ${applicationValues.experience}\nPortfolyo: ${applicationValues.portfolio}\nCV: ${applicationValues.cvFileName || 'Belirtilmedi'}\nNot: ${applicationValues.note}`,
    })

    setApplicationValues({
      fullName: '',
      email: '',
      phone: '',
      position: selectedPosition,
      experience: '',
      portfolio: '',
      note: '',
      cvFileName: '',
    })
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
            ['E-posta', contactContent.email],
            ['İK', contactContent.hrEmail],
            ['Telefon', contactContent.phone],
            ['Adres', contactContent.address],
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
          src={contactContent.mapUrl}
          className="h-[460px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <section className={`mt-8 ${MONO_THEME.outer}`}>
        <article className={MONO_THEME.article}>
          <div className="overflow-x-auto pb-1">
            <div className={MONO_THEME.modeWrap}>
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
                      ? MONO_THEME.modeActive
                      : MONO_THEME.modeIdle
                  }`}
                >
                  {mode.title}
                </button>
              ))}
            </div>
          </div>

          <div className={MONO_THEME.panel}>
            <h2 className={`text-2xl font-semibold ${MONO_THEME.title}`}>{activeCopy.title}</h2>
            <p className={`mt-2 text-sm leading-7 ${MONO_THEME.helper}`}>{activeCopy.helper}</p>
            <p className={`mt-1 text-xs ${MONO_THEME.hint}`}>Bilgileri eksiksiz doldurmanız, talebinize daha hızlı dönüş sağlanmasına yardımcı olur.</p>

            {activeForm === 'contact' && (
              <form className="mt-5 space-y-4" onSubmit={handleContactSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className={`text-sm font-medium ${MONO_THEME.helper}`}>
                    Ad Soyad
                    <input
                      className={`${baseInputClass} ${MONO_THEME.input}`}
                      value={contactValues.fullName}
                      onChange={(event) => setContactValues((prev) => ({ ...prev, fullName: event.target.value }))}
                      placeholder="Örn: Ahmet Yılmaz"
                      autoComplete="name"
                      minLength={2}
                      maxLength={80}
                      required
                    />
                  </label>
                  <label className={`text-sm font-medium ${MONO_THEME.helper}`}>
                    E-posta
                    <input
                      className={`${baseInputClass} ${MONO_THEME.input}`}
                      type="email"
                      value={contactValues.email}
                      onChange={(event) => setContactValues((prev) => ({ ...prev, email: event.target.value }))}
                      placeholder="ornek@firma.com"
                      autoComplete="email"
                      maxLength={120}
                      required
                    />
                  </label>
                </div>

                <label className={`block text-sm font-medium ${MONO_THEME.helper}`}>
                  Telefon
                  <input
                    className={`${baseInputClass} ${MONO_THEME.input}`}
                    value={contactValues.phone}
                    onChange={(event) =>
                      setContactValues((prev) => ({ ...prev, phone: normalizePhoneInput(event.target.value) }))
                    }
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Örn: 0555 123 45 67"
                    pattern={PHONE_PATTERN}
                    title="Telefon alanına en az 10 hane olacak şekilde yalnızca rakam ve + ( ) - karakterlerini girin."
                    maxLength={20}
                    required
                  />
                </label>

                <label className={`block text-sm font-medium ${MONO_THEME.helper}`}>
                  Mesaj
                  <textarea
                    className={`${baseTextAreaClass} ${MONO_THEME.input} min-h-28 resize-y`}
                    value={contactValues.message}
                    onChange={(event) => setContactValues((prev) => ({ ...prev, message: event.target.value }))}
                    placeholder="Mesajınızı yazınız..."
                    minLength={10}
                    maxLength={1500}
                    required
                  />
                </label>

                <button
                  className={`focus-ring w-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${MONO_THEME.submit}`}
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? 'Gönderiliyor...' : activeCopy.submitLabel}
                </button>
              </form>
            )}

            {activeForm === 'demo' && (
              <form className="mt-5 space-y-4" onSubmit={handleDemoSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className={`text-sm font-medium ${MONO_THEME.helper}`}>
                    Ad Soyad
                    <input
                      className={`${baseInputClass} ${MONO_THEME.input}`}
                      value={demoValues.fullName}
                      onChange={(event) => setDemoValues((prev) => ({ ...prev, fullName: event.target.value }))}
                      placeholder="Örn: Ahmet Yılmaz"
                      autoComplete="name"
                      minLength={2}
                      maxLength={80}
                      required
                    />
                  </label>
                  <label className={`text-sm font-medium ${MONO_THEME.helper}`}>
                    Kurum / Şirket
                    <input
                      className={`${baseInputClass} ${MONO_THEME.input}`}
                      value={demoValues.company}
                      onChange={(event) => setDemoValues((prev) => ({ ...prev, company: event.target.value }))}
                      placeholder="Örn: ABC Teknoloji"
                      minLength={2}
                      maxLength={120}
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className={`text-sm font-medium ${MONO_THEME.helper}`}>
                    E-posta
                    <input
                      className={`${baseInputClass} ${MONO_THEME.input}`}
                      type="email"
                      value={demoValues.email}
                      onChange={(event) => setDemoValues((prev) => ({ ...prev, email: event.target.value }))}
                      placeholder="ornek@firma.com"
                      autoComplete="email"
                      maxLength={120}
                      required
                    />
                  </label>
                  <label className={`text-sm font-medium ${MONO_THEME.helper}`}>
                    Telefon
                    <input
                      className={`${baseInputClass} ${MONO_THEME.input}`}
                      value={demoValues.phone}
                      onChange={(event) =>
                        setDemoValues((prev) => ({ ...prev, phone: normalizePhoneInput(event.target.value) }))
                      }
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="Örn: 0555 123 45 67"
                      pattern={PHONE_PATTERN}
                      title="Telefon alanına en az 10 hane olacak şekilde yalnızca rakam ve + ( ) - karakterlerini girin."
                      maxLength={20}
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className={`text-sm font-medium ${MONO_THEME.helper}`}>
                    Tercih Edilen Tarih
                    <input
                      className={`${baseInputClass} ${MONO_THEME.input}`}
                      type="date"
                      value={demoValues.preferredDate}
                      onChange={(event) => setDemoValues((prev) => ({ ...prev, preferredDate: event.target.value }))}
                      required
                    />
                  </label>
                  <label className={`text-sm font-medium ${MONO_THEME.helper}`}>
                    Not
                    <input
                      className={`${baseInputClass} ${MONO_THEME.input}`}
                      value={demoValues.message}
                      onChange={(event) => setDemoValues((prev) => ({ ...prev, message: event.target.value }))}
                      placeholder="Odaklanmamızı istediğiniz modül"
                      minLength={3}
                      maxLength={250}
                      required
                    />
                  </label>
                </div>

                <button
                  className={`focus-ring w-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${MONO_THEME.submit}`}
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? 'Gönderiliyor...' : activeCopy.submitLabel}
                </button>
              </form>
            )}

            {activeForm === 'application' && (
              <form className="mt-5 space-y-4" onSubmit={handleApplicationSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className={`text-sm font-medium ${MONO_THEME.helper}`}>
                    Ad Soyad
                    <input
                      className={`${baseInputClass} ${MONO_THEME.input}`}
                      value={applicationValues.fullName}
                      onChange={(event) => setApplicationValues((prev) => ({ ...prev, fullName: event.target.value }))}
                      placeholder="Örn: Ahmet Yılmaz"
                      autoComplete="name"
                      minLength={2}
                      maxLength={80}
                      required
                    />
                  </label>
                  <label className={`text-sm font-medium ${MONO_THEME.helper}`}>
                    E-posta
                    <input
                      className={`${baseInputClass} ${MONO_THEME.input}`}
                      type="email"
                      value={applicationValues.email}
                      onChange={(event) => setApplicationValues((prev) => ({ ...prev, email: event.target.value }))}
                      placeholder="ornek@firma.com"
                      autoComplete="email"
                      maxLength={120}
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className={`text-sm font-medium ${MONO_THEME.helper}`}>
                    Telefon
                    <input
                      className={`${baseInputClass} ${MONO_THEME.input}`}
                      value={applicationValues.phone}
                      onChange={(event) =>
                        setApplicationValues((prev) => ({ ...prev, phone: normalizePhoneInput(event.target.value) }))
                      }
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="Örn: 0555 123 45 67"
                      pattern={PHONE_PATTERN}
                      title="Telefon alanına en az 10 hane olacak şekilde yalnızca rakam ve + ( ) - karakterlerini girin."
                      maxLength={20}
                      required
                    />
                  </label>
                  <label className={`text-sm font-medium ${MONO_THEME.helper}`}>
                    Başvurulan Pozisyon
                    <input
                      className={`${baseInputClass} ${MONO_THEME.input}`}
                      value={applicationValues.position}
                      onChange={(event) => setApplicationValues((prev) => ({ ...prev, position: event.target.value }))}
                      placeholder="Örn. Frontend Developer"
                      minLength={2}
                      maxLength={80}
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className={`text-sm font-medium ${MONO_THEME.helper}`}>
                    Deneyim Seviyesi
                    <select
                      className={`${baseInputClass} ${MONO_THEME.input}`}
                      value={applicationValues.experience}
                      onChange={(event) => setApplicationValues((prev) => ({ ...prev, experience: event.target.value }))}
                      required
                    >
                      <option value="">Seçiniz</option>
                      <option value="0-2">0-2 Yıl</option>
                      <option value="2-5">2-5 Yıl</option>
                      <option value="5+">5+ Yıl</option>
                    </select>
                  </label>
                  <label className={`text-sm font-medium ${MONO_THEME.helper}`}>
                    Portfolyo / LinkedIn
                    <input
                      className={`${baseInputClass} ${MONO_THEME.input}`}
                      value={applicationValues.portfolio}
                      onChange={(event) => setApplicationValues((prev) => ({ ...prev, portfolio: event.target.value }))}
                      placeholder="https://"
                      type="url"
                      pattern="https?://.+"
                      title="Lütfen http:// veya https:// ile başlayan geçerli bir bağlantı girin."
                      required
                    />
                  </label>
                </div>

                <label className={`block text-sm font-medium ${MONO_THEME.helper}`}>
                  CV Dosyası
                  <input
                    className={`${baseInputClass} ${MONO_THEME.input}`}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(event) => {
                      const file = event.target.files?.[0]
                      setApplicationValues((prev) => ({ ...prev, cvFileName: file ? file.name : '' }))
                    }}
                  />
                  <p className={`mt-2 text-xs ${MONO_THEME.hint}`}>
                    {applicationValues.cvFileName ? `Seçilen dosya: ${applicationValues.cvFileName}` : 'PDF, DOC veya DOCX dosyası yükleyebilirsiniz.'}
                  </p>
                </label>

                <label className={`block text-sm font-medium ${MONO_THEME.helper}`}>
                  Kısa Not
                  <textarea
                    className={`${baseTextAreaClass} ${MONO_THEME.input} min-h-24 resize-y`}
                    value={applicationValues.note}
                    onChange={(event) => setApplicationValues((prev) => ({ ...prev, note: event.target.value }))}
                    placeholder="Kısaca hangi alana odaklandığınızı yazabilirsiniz."
                    minLength={10}
                    maxLength={1500}
                    required
                  />
                </label>

                <button
                  className={`focus-ring w-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${MONO_THEME.submit}`}
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? 'Gönderiliyor...' : activeCopy.submitLabel}
                </button>

                <p className={`px-3 py-2 text-xs ${MONO_THEME.note}`}>
                  Özgeçmiş bilgilerinizi ayrıca ik@noktasal.com.tr adresine de iletebilirsiniz.
                </p>
              </form>
            )}

            {serverMessage ? (
              <p aria-live="polite" className={`mt-4 p-3 text-sm ${MONO_THEME.success}`}>
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
