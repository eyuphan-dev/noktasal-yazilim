import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { adminService } from '../../features/admin/services'

const EMPTY_OBJECT = {}

const DEFAULT_HOME_SLIDES = [
  {
    tag: 'Modern Kurumsal Mimari',
    title: 'Kurumsal sureclerinizi guvenle dijitallestirin.',
    text: 'Kamu ve B2B odakli projelerde olceklenebilir yazilim platformlari gelistiriyoruz.',
    cta: 'Cozumleri Incele',
    ctaUrl: '/cozumler',
    photo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=80',
    stats: ['99.95% Uptime Hedefi', 'Canli Izleme ve Alarm', 'Mevzuata Uyumlu Surecler'],
  },
  {
    tag: 'Operasyon Odakli Tasarim',
    title: 'Entegrasyon ve operasyonu tek bir cati altinda yonetin.',
    text: 'Urun mimarisi, veri akislariniz ve raporlama ihtiyaciniz icin uc uca tasarim.',
    cta: 'Referanslara Goz At',
    ctaUrl: '/referanslar',
    photo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2200&q=80',
    stats: ['Rol Bazli Yetkilendirme', 'Izlenebilir Is Akislari', 'Dusuk Operasyon Maliyeti'],
  },
  {
    tag: 'Guvenlik ve Surdurulebilirlik',
    title: 'Yuksek guvenlik ve surdurulebilir kod standardi.',
    text: 'Uzun omurlu, bakimi kolay ve ekip buyumesine uygun sistemler kuruyoruz.',
    cta: 'Toplanti Planla',
    ctaUrl: '/iletisim',
    photo: 'https://images.unsplash.com/photo-1451188502541-13943edb6acb?auto=format&fit=crop&w=2200&q=80',
    stats: ['CI/CD Uyumlu Yapi', 'Kalite Guvencesi Sureci', 'Uzun Vadeli Olceklenme'],
  },
]

const DEFAULT_HOME_SECTIONS = {
  trustHeading: 'Sektorel tecrube ve operasyonel guveni tek bakista gosterin',
  trustDescription: 'Bu duzen, karar vericinin once guveni gorup sonra detaylara inmesini saglar.',
  whyHeading: 'Neden Noktasal?',
  focusHeading: 'Odak Alanlari',
  worksHeading: 'Farkli kurumlarda teslim ettigimiz projelerden seckiler',
  worksDescription: 'Canli cozumleri tek ekranda inceleyin ve detay sayfalarina ilerleyin.',
  trustItems: [
    { label: 'Kamu Kurumlari', detail: 'Mevzuata uyumlu dijital donusum' },
    { label: 'Finans Kuruluslari', detail: 'Guvenli islem ve raporlama altyapisi' },
    { label: 'Lojistik Operatorleri', detail: 'Anlik operasyon izleme ve optimizasyon' },
    { label: 'B2B Uretim Sirketleri', detail: 'Ucuca tedarik surec dijitallesmesi' },
  ],
  highlightStats: [
    { title: 'Kurumsal Proje', value: '40+', text: 'Canlida calisan teslimat sayisi' },
    { title: 'Sektorel Deneyim', value: '12', text: 'Farkli regulasyon yapisinda uygulama' },
    { title: 'Operasyon Destek', value: '7/24', text: 'SLA tabanli surekli izleme ve mudahale' },
  ],
  whyPoints: [
    'Kurumsal yonetim, guvenlik ve operasyon standartlarina uygun modern mimari.',
    'Urun odakli teslim modeliyle olceklenebilir ve surdurulebilir kod tabani.',
    'Entegrasyon, raporlama ve destek surecini tek merkezden yonetebilen ekip yapisi.',
  ],
  focusTags: ['Basvuru Sistemleri', 'Operasyon Panelleri', 'Karar Destek'],
}

function splitLines(value) {
  return String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Dosya okunamadi.'))
    reader.onload = () => resolve(String(reader.result || ''))
    reader.readAsDataURL(file)
  })
}

function normalizeHomeSliderPayload(payload) {
  const rawSlides = Array.isArray(payload?.slides) && payload.slides.length > 0 ? payload.slides : null

  if (!rawSlides) {
    const firstSlide = {
      ...DEFAULT_HOME_SLIDES[0],
      title: payload?.title || DEFAULT_HOME_SLIDES[0].title,
      text: payload?.subtitle || DEFAULT_HOME_SLIDES[0].text,
      cta: payload?.ctaLabel || DEFAULT_HOME_SLIDES[0].cta,
      ctaUrl: payload?.ctaUrl || DEFAULT_HOME_SLIDES[0].ctaUrl,
    }

    return {
      slides: [firstSlide, DEFAULT_HOME_SLIDES[1], DEFAULT_HOME_SLIDES[2]],
    }
  }

  const slides = DEFAULT_HOME_SLIDES.map((fallback, index) => {
    const current = rawSlides[index] || {}
    return {
      tag: current.tag || fallback.tag,
      title: current.title || fallback.title,
      text: current.text || fallback.text,
      cta: current.cta || fallback.cta,
      ctaUrl: current.ctaUrl || fallback.ctaUrl,
      photo: current.photo || fallback.photo,
      stats: Array.isArray(current.stats) && current.stats.length > 0 ? current.stats.filter(Boolean).slice(0, 3) : fallback.stats,
    }
  })

  return { slides }
}

function normalizeHomeSectionsPayload(payload) {
  return {
    trustHeading: payload?.trustHeading || DEFAULT_HOME_SECTIONS.trustHeading,
    trustDescription: payload?.trustDescription || DEFAULT_HOME_SECTIONS.trustDescription,
    whyHeading: payload?.whyHeading || DEFAULT_HOME_SECTIONS.whyHeading,
    focusHeading: payload?.focusHeading || DEFAULT_HOME_SECTIONS.focusHeading,
    worksHeading: payload?.worksHeading || DEFAULT_HOME_SECTIONS.worksHeading,
    worksDescription: payload?.worksDescription || DEFAULT_HOME_SECTIONS.worksDescription,
    trustItems: Array.isArray(payload?.trustItems) && payload.trustItems.length > 0 ? payload.trustItems : DEFAULT_HOME_SECTIONS.trustItems,
    highlightStats: Array.isArray(payload?.highlightStats) && payload.highlightStats.length > 0 ? payload.highlightStats : DEFAULT_HOME_SECTIONS.highlightStats,
    whyPoints: Array.isArray(payload?.whyPoints) && payload.whyPoints.length > 0 ? payload.whyPoints : DEFAULT_HOME_SECTIONS.whyPoints,
    focusTags: Array.isArray(payload?.focusTags) && payload.focusTags.length > 0 ? payload.focusTags : DEFAULT_HOME_SECTIONS.focusTags,
  }
}

function renderFields(sectionKey, formData, onChange, options = {}) {
  if (sectionKey === 'home-slider') {
    const slides = Array.isArray(formData.slides) ? formData.slides : DEFAULT_HOME_SLIDES
    const uploadingSlideIndex = Number.isInteger(options.uploadingSlideIndex) ? options.uploadingSlideIndex : -1

    const updateSlideField = (index, key, value) => {
      const nextSlides = slides.map((slide, slideIndex) => {
        if (slideIndex !== index) {
          return slide
        }

        return {
          ...slide,
          [key]: value,
        }
      })

      onChange('slides', nextSlides)
    }

    return (
      <>
        {slides.map((slide, index) => (
          <article key={`slide-editor-${index}`} className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
            <h3 className="text-sm font-semibold text-slate-800">Slide {index + 1}</h3>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700" htmlFor={`slider-tag-${index}`}>
                Etiket
                <input
                  id={`slider-tag-${index}`}
                  className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
                  value={slide.tag || ''}
                  onChange={(event) => updateSlideField(index, 'tag', event.target.value)}
                />
              </label>
              <label className="text-sm font-medium text-slate-700" htmlFor={`slider-photo-${index}`}>
                Foto URL
                <input
                  id={`slider-photo-${index}`}
                  className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
                  value={slide.photo || ''}
                  onChange={(event) => updateSlideField(index, 'photo', event.target.value)}
                />
              </label>
            </div>

            <div className="mt-4 rounded-md border border-slate-200 bg-white p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Gorsel Yukle</p>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                disabled={uploadingSlideIndex === index}
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (typeof options.onUploadSlideImage === 'function') {
                    options.onUploadSlideImage(index, file)
                  }
                }}
              />
              <p className="mt-2 text-xs text-slate-500">Desteklenen formatlar: JPG, JPEG, PNG, WEBP. Yani kalite korunurken backend tarafinda otomatik optimize edilip WEBP olarak kaydedilir.</p>
              {uploadingSlideIndex === index ? <p className="mt-2 text-xs font-semibold text-brand-700">Gorsel yukleniyor ve optimize ediliyor...</p> : null}

              {slide.photo ? (
                <div className="mt-3 space-y-2">
                  <img
                    src={slide.photo}
                    alt={`Slide ${index + 1} onizleme`}
                    className="h-28 w-full rounded-md border border-slate-200 object-cover"
                  />
                  <button
                    type="button"
                    className="focus-ring rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700"
                    onClick={() => updateSlideField(index, 'photo', '')}
                  >
                    Gorseli Temizle
                  </button>
                </div>
              ) : null}
            </div>

            <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor={`slider-title-${index}`}>
              Baslik
              <input
                id={`slider-title-${index}`}
                className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
                value={slide.title || ''}
                onChange={(event) => updateSlideField(index, 'title', event.target.value)}
              />
            </label>

            <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor={`slider-text-${index}`}>
              Aciklama
              <textarea
                id={`slider-text-${index}`}
                className="focus-ring mt-2 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2"
                value={slide.text || ''}
                onChange={(event) => updateSlideField(index, 'text', event.target.value)}
              />
            </label>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700" htmlFor={`slider-cta-${index}`}>
                CTA Metni
                <input
                  id={`slider-cta-${index}`}
                  className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
                  value={slide.cta || ''}
                  onChange={(event) => updateSlideField(index, 'cta', event.target.value)}
                />
              </label>
              <label className="text-sm font-medium text-slate-700" htmlFor={`slider-url-${index}`}>
                CTA URL
                <input
                  id={`slider-url-${index}`}
                  className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
                  value={slide.ctaUrl || ''}
                  onChange={(event) => updateSlideField(index, 'ctaUrl', event.target.value)}
                />
              </label>
            </div>

            <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor={`slider-stats-${index}`}>
              Alt Maddeler (her satir 1 oge)
              <textarea
                id={`slider-stats-${index}`}
                className="focus-ring mt-2 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2"
                value={(slide.stats || []).join('\n')}
                onChange={(event) => updateSlideField(index, 'stats', splitLines(event.target.value))}
              />
            </label>
          </article>
        ))}
      </>
    )
  }

  if (sectionKey === 'home-sections') {
    return (
      <>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="home-trust-heading">
            Guven Agi Basligi
            <input
              id="home-trust-heading"
              className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
              value={formData.trustHeading || ''}
              onChange={(event) => onChange('trustHeading', event.target.value)}
            />
          </label>
          <label className="text-sm font-medium text-slate-700" htmlFor="home-trust-description">
            Guven Agi Aciklamasi
            <input
              id="home-trust-description"
              className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
              value={formData.trustDescription || ''}
              onChange={(event) => onChange('trustDescription', event.target.value)}
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="home-why-heading">
            Neden Noktasal Basligi
            <input
              id="home-why-heading"
              className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
              value={formData.whyHeading || ''}
              onChange={(event) => onChange('whyHeading', event.target.value)}
            />
          </label>
          <label className="text-sm font-medium text-slate-700" htmlFor="home-focus-heading">
            Odak Alanlari Basligi
            <input
              id="home-focus-heading"
              className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
              value={formData.focusHeading || ''}
              onChange={(event) => onChange('focusHeading', event.target.value)}
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="home-works-heading">
            Yapilan Isler Basligi
            <input
              id="home-works-heading"
              className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
              value={formData.worksHeading || ''}
              onChange={(event) => onChange('worksHeading', event.target.value)}
            />
          </label>
          <label className="text-sm font-medium text-slate-700" htmlFor="home-works-description">
            Yapilan Isler Aciklamasi
            <input
              id="home-works-description"
              className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
              value={formData.worksDescription || ''}
              onChange={(event) => onChange('worksDescription', event.target.value)}
            />
          </label>
        </div>

        <label className="text-sm font-medium text-slate-700" htmlFor="home-trust-items">
          Guven Agi Kartlari (satir: Baslik | Aciklama)
          <textarea
            id="home-trust-items"
            className="focus-ring mt-2 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2"
            value={(formData.trustItems || []).map((item) => `${item.label || ''} | ${item.detail || ''}`).join('\n')}
            onChange={(event) => {
              const trustItems = splitLines(event.target.value).map((line) => {
                const [label, ...detailParts] = line.split('|')
                return {
                  label: (label || '').trim(),
                  detail: detailParts.join('|').trim(),
                }
              }).filter((item) => item.label && item.detail)
              onChange('trustItems', trustItems)
            }}
          />
        </label>

        <label className="text-sm font-medium text-slate-700" htmlFor="home-highlight-stats">
          Vurgu Istatistikleri (satir: Baslik | Deger | Aciklama)
          <textarea
            id="home-highlight-stats"
            className="focus-ring mt-2 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2"
            value={(formData.highlightStats || []).map((item) => `${item.title || ''} | ${item.value || ''} | ${item.text || ''}`).join('\n')}
            onChange={(event) => {
              const highlightStats = splitLines(event.target.value).map((line) => {
                const [title, value, ...textParts] = line.split('|')
                return {
                  title: (title || '').trim(),
                  value: (value || '').trim(),
                  text: textParts.join('|').trim(),
                }
              }).filter((item) => item.title && item.value && item.text)
              onChange('highlightStats', highlightStats)
            }}
          />
        </label>

        <label className="text-sm font-medium text-slate-700" htmlFor="home-why-points">
          Neden Noktasal Maddeleri (her satir 1 madde)
          <textarea
            id="home-why-points"
            className="focus-ring mt-2 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2"
            value={(formData.whyPoints || []).join('\n')}
            onChange={(event) => onChange('whyPoints', splitLines(event.target.value))}
          />
        </label>

        <label className="text-sm font-medium text-slate-700" htmlFor="home-focus-tags">
          Odak Etiketleri (virgulle ayir)
          <input
            id="home-focus-tags"
            className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
            value={(formData.focusTags || []).join(', ')}
            onChange={(event) => onChange('focusTags', event.target.value.split(',').map((item) => item.trim()).filter(Boolean))}
          />
        </label>
      </>
    )
  }

  if (sectionKey === 'about-page') {
    return (
      <>
        <label className="text-sm font-medium text-slate-700" htmlFor="about-title">
          Başlık
          <input id="about-title" className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2" value={formData.title || ''} onChange={(event) => onChange('title', event.target.value)} />
        </label>
        <label className="text-sm font-medium text-slate-700" htmlFor="about-body">
          Gövde Metni
          <textarea id="about-body" className="focus-ring mt-2 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2" value={formData.body || ''} onChange={(event) => onChange('body', event.target.value)} />
        </label>
        <label className="text-sm font-medium text-slate-700" htmlFor="about-highlight">
          Vurgu
          <input id="about-highlight" className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2" value={formData.highlight || ''} onChange={(event) => onChange('highlight', event.target.value)} />
        </label>
      </>
    )
  }

  if (sectionKey === 'contact-page') {
    return (
      <>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="contact-email">
            E-posta
            <input id="contact-email" className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2" value={formData.email || ''} onChange={(event) => onChange('email', event.target.value)} />
          </label>
          <label className="text-sm font-medium text-slate-700" htmlFor="contact-phone">
            Telefon
            <input id="contact-phone" className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2" value={formData.phone || ''} onChange={(event) => onChange('phone', event.target.value)} />
          </label>
        </div>
        <label className="text-sm font-medium text-slate-700" htmlFor="contact-address">
          Adres
          <textarea id="contact-address" className="focus-ring mt-2 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2" value={formData.address || ''} onChange={(event) => onChange('address', event.target.value)} />
        </label>
        <label className="text-sm font-medium text-slate-700" htmlFor="contact-map">
          Harita URL
          <input id="contact-map" className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2" value={formData.mapUrl || ''} onChange={(event) => onChange('mapUrl', event.target.value)} />
        </label>
      </>
    )
  }

  return <p className="text-sm text-slate-500">Bu bölüm için editör tanımı yapılmadı.</p>
}

function AdminContentPage() {
  const queryClient = useQueryClient()
  const [selectedKey, setSelectedKey] = useState(null)
  const [draftBySection, setDraftBySection] = useState({})
  const [uploadingSlideIndex, setUploadingSlideIndex] = useState(null)

  const sectionsQuery = useQuery({
    queryKey: ['admin-content-sections'],
    queryFn: () => adminService.getContentSections(),
  })

  const editorQuery = useQuery({
    queryKey: ['admin-content-editor', selectedKey],
    queryFn: () => adminService.getContentEditor(selectedKey),
    enabled: Boolean(selectedKey),
  })

  const currentFormData = useMemo(() => {
    if (!selectedKey) {
      return EMPTY_OBJECT
    }

    const rawData = draftBySection[selectedKey] || editorQuery.data || EMPTY_OBJECT

    if (selectedKey === 'home-slider') {
      return normalizeHomeSliderPayload(rawData)
    }

    if (selectedKey === 'home-sections') {
      return normalizeHomeSectionsPayload(rawData)
    }

    return rawData
  }, [draftBySection, editorQuery.data, selectedKey])

  const saveMutation = useMutation({
    mutationFn: ({ publish }) =>
      adminService.saveContentEditor(selectedKey, currentFormData, { publish }),
    onSuccess: () => {
      setDraftBySection((prev) => {
        const next = { ...prev }
        delete next[selectedKey]
        return next
      })
      queryClient.invalidateQueries({ queryKey: ['admin-content-sections'] })
      queryClient.invalidateQueries({ queryKey: ['admin-content-editor', selectedKey] })
    },
  })

  const sections = sectionsQuery.data || []

  const onFieldChange = (key, value) => {
    if (!selectedKey) {
      return
    }

    setDraftBySection((prev) => ({
      ...prev,
      [selectedKey]: {
        ...currentFormData,
        [key]: value,
      },
    }))
  }

  const onUploadSlideImage = async (slideIndex, file) => {
    if (!file || selectedKey !== 'home-slider') {
      return
    }

    if (!file.type.startsWith('image/')) {
      return
    }

    setUploadingSlideIndex(slideIndex)

    try {
      const dataUrl = await fileToDataUrl(file)
      const result = await adminService.uploadImage({
        dataUrl,
        folder: 'home-slider',
        fileName: file.name,
      })

      if (!result?.url) {
        return
      }

      const slides = Array.isArray(currentFormData.slides) ? currentFormData.slides : DEFAULT_HOME_SLIDES
      const nextSlides = slides.map((slide, index) => (index === slideIndex ? { ...slide, photo: result.url } : slide))
      onFieldChange('slides', nextSlides)
    } finally {
      setUploadingSlideIndex(null)
    }
  }

  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">İçerik Yönetimi</p>
      <h1 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">Sayfa ve bölüm içerikleri</h1>

      <div className="mt-8 space-y-3">
        {sections.map((item) => (
          <article key={item.key} className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-1 text-sm text-slate-500">Son güncelleme: {item.updatedAt}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.status === 'published'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {item.status}
                </span>
                <button className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700" type="button">
                  Düzenle
                </button>
                <button
                  className="focus-ring rounded-md border border-brand-200 px-3 py-2 text-sm font-medium text-brand-700"
                  type="button"
                  onClick={() => setSelectedKey(item.key)}
                >
                  Editör Aç
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedKey ? (
        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-slate-900">Bölüm Editörü: {selectedKey}</h2>
          {editorQuery.isLoading ? <p className="mt-3 text-sm text-slate-500">Editör yükleniyor...</p> : null}

          <form className="mt-5 space-y-4" noValidate>
            {renderFields(selectedKey, currentFormData, onFieldChange, {
              onUploadSlideImage,
              uploadingSlideIndex,
            })}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => saveMutation.mutate({ publish: false })}
                className="focus-ring rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Taslak Kaydet
              </button>
              <button
                type="button"
                onClick={() => saveMutation.mutate({ publish: true })}
                className="focus-ring rounded-md bg-brand-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Yayınla
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </section>
  )
}

export default AdminContentPage
