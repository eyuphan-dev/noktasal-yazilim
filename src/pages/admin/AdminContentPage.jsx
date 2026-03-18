import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { adminService } from '../../features/admin/services'

const EMPTY_OBJECT = {}

function renderFields(sectionKey, formData, onChange) {
  if (sectionKey === 'home-slider') {
    return (
      <>
        <label className="text-sm font-medium text-slate-700" htmlFor="slider-title">
          Başlık
          <input id="slider-title" className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2" value={formData.title || ''} onChange={(event) => onChange('title', event.target.value)} />
        </label>
        <label className="text-sm font-medium text-slate-700" htmlFor="slider-subtitle">
          Açıklama
          <textarea id="slider-subtitle" className="focus-ring mt-2 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2" value={formData.subtitle || ''} onChange={(event) => onChange('subtitle', event.target.value)} />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="slider-cta">
            CTA Metni
            <input id="slider-cta" className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2" value={formData.ctaLabel || ''} onChange={(event) => onChange('ctaLabel', event.target.value)} />
          </label>
          <label className="text-sm font-medium text-slate-700" htmlFor="slider-url">
            CTA URL
            <input id="slider-url" className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2" value={formData.ctaUrl || ''} onChange={(event) => onChange('ctaUrl', event.target.value)} />
          </label>
        </div>
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

    return draftBySection[selectedKey] || editorQuery.data || EMPTY_OBJECT
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
    setDraftBySection((prev) => ({
      ...prev,
      [selectedKey]: {
        ...currentFormData,
        [key]: value,
      },
    }))
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
            {renderFields(selectedKey, currentFormData, onFieldChange)}

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
