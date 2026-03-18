import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { adminService } from '../../features/admin/services'

const DEFAULT_FORM = {
  pageKey: 'home',
  title: '',
  description: '',
  ogTitle: '',
  ogDescription: '',
}

const EMPTY_PAGES = []

function AdminSeoPage() {
  const queryClient = useQueryClient()
  const [pageKey, setPageKey] = useState('home')
  const [draftByPage, setDraftByPage] = useState({})

  const seoQuery = useQuery({
    queryKey: ['admin-seo-settings'],
    queryFn: () => adminService.getSeoSettings(),
  })

  const pages = seoQuery.data || EMPTY_PAGES

  const form = useMemo(() => {
    const fromDraft = draftByPage[pageKey]
    if (fromDraft) {
      return fromDraft
    }

    const fromService = pages.find((item) => item.pageKey === pageKey)
    return fromService || { ...DEFAULT_FORM, pageKey }
  }, [draftByPage, pageKey, pages])

  const saveMutation = useMutation({
    mutationFn: () => adminService.saveSeoSettings(form),
    onSuccess: () => {
      setDraftByPage((prev) => {
        const next = { ...prev }
        delete next[pageKey]
        return next
      })
      queryClient.invalidateQueries({ queryKey: ['admin-seo-settings'] })
    },
  })

  const onFieldChange = (field, value) => {
    setDraftByPage((prev) => ({
      ...prev,
      [pageKey]: {
        ...form,
        [field]: value,
      },
    }))
  }

  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">SEO Yönetimi</p>
      <h1 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">Sayfa bazlı meta alanları</h1>

      <form className="mt-8 grid gap-4 rounded-xl border border-slate-200 bg-white p-5 md:grid-cols-2" noValidate>
        <label className="text-sm font-medium text-slate-700" htmlFor="seo-page">
          Sayfa
          <select
            id="seo-page"
            value={pageKey}
            onChange={(event) => setPageKey(event.target.value)}
            className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
          >
            {pages.map((item) => (
              <option key={item.pageKey} value={item.pageKey}>
                {item.pageKey}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-slate-700" htmlFor="seo-title">
          Meta Title
          <input
            id="seo-title"
            value={form.title || ''}
            onChange={(event) => onFieldChange('title', event.target.value)}
            className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </label>

        <label className="text-sm font-medium text-slate-700 md:col-span-2" htmlFor="seo-desc">
          Meta Description
          <textarea
            id="seo-desc"
            value={form.description || ''}
            onChange={(event) => onFieldChange('description', event.target.value)}
            className="focus-ring mt-2 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </label>

        <label className="text-sm font-medium text-slate-700" htmlFor="seo-og-title">
          OG Title
          <input
            id="seo-og-title"
            value={form.ogTitle || ''}
            onChange={(event) => onFieldChange('ogTitle', event.target.value)}
            className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </label>

        <label className="text-sm font-medium text-slate-700" htmlFor="seo-og-desc">
          OG Description
          <input
            id="seo-og-desc"
            value={form.ogDescription || ''}
            onChange={(event) => onFieldChange('ogDescription', event.target.value)}
            className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </label>

        <button
          type="button"
          onClick={() => saveMutation.mutate()}
          className="focus-ring rounded-lg bg-brand-900 px-4 py-2 text-sm font-semibold text-white md:col-span-2 md:w-max"
        >
          SEO Kaydet
        </button>
      </form>
    </section>
  )
}

export default AdminSeoPage
