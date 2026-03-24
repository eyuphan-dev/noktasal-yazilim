import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { adminService } from '../../features/admin/services'

const EMPTY_LIST = []

const INITIAL_FORM = {
  title: '',
  category: '',
  client: '',
  period: '',
  summary: '',
  modulesText: '',
  outcomesText: '',
  highlightsText: '',
  status: 'draft',
}

function toLineList(value) {
  return String(value || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function toMultilineText(value) {
  if (!Array.isArray(value)) {
    return ''
  }
  return value.filter(Boolean).join('\n')
}

function AdminSolutionsPage() {
  const queryClient = useQueryClient()
  const [createForm, setCreateForm] = useState(INITIAL_FORM)
  const [editingId, setEditingId] = useState(null)
  const [editingDraft, setEditingDraft] = useState(null)

  const solutionsQuery = useQuery({
    queryKey: ['admin-solutions'],
    queryFn: () => adminService.getSolutions(),
  })

  const createMutation = useMutation({
    mutationFn: (payload) => adminService.createSolution(payload),
    onSuccess: () => {
      setCreateForm(INITIAL_FORM)
      queryClient.invalidateQueries({ queryKey: ['admin-solutions'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => adminService.updateSolution(id, payload),
    onSuccess: () => {
      setEditingId(null)
      setEditingDraft(null)
      queryClient.invalidateQueries({ queryKey: ['admin-solutions'] })
    },
  })

  const items = solutionsQuery.data || EMPTY_LIST

  const startEdit = (item) => {
    setEditingId(item.id)
    setEditingDraft({
      title: item.title || '',
      category: item.category || '',
      client: item.client || '',
      period: item.period || '',
      summary: item.summary || '',
      modulesText: toMultilineText(item.modules),
      outcomesText: toMultilineText(item.outcomes),
      highlightsText: toMultilineText(item.highlights),
      status: item.status || 'draft',
    })
  }

  const submitCreate = (event) => {
    event.preventDefault()
    createMutation.mutate({
      ...createForm,
      modules: toLineList(createForm.modulesText),
      outcomes: toLineList(createForm.outcomesText),
      highlights: toLineList(createForm.highlightsText),
    })
  }

  const submitEdit = (event) => {
    event.preventDefault()
    if (!editingId || !editingDraft) {
      return
    }
    updateMutation.mutate({
      id: editingId,
      payload: {
        ...editingDraft,
        modules: toLineList(editingDraft.modulesText),
        outcomes: toLineList(editingDraft.outcomesText),
        highlights: toLineList(editingDraft.highlightsText),
      },
    })
  }

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Çözümler</p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">Ürün ve çözüm listesi</h1>
        </div>
      </div>

      <form onSubmit={submitCreate} className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2 xl:grid-cols-3">
        <input value={createForm.title} onChange={(event) => setCreateForm((prev) => ({ ...prev, title: event.target.value }))} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Başlık" required />
        <input value={createForm.category} onChange={(event) => setCreateForm((prev) => ({ ...prev, category: event.target.value }))} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Kategori" required />
        <input value={createForm.client} onChange={(event) => setCreateForm((prev) => ({ ...prev, client: event.target.value }))} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Kurum" required />
        <input value={createForm.period} onChange={(event) => setCreateForm((prev) => ({ ...prev, period: event.target.value }))} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Dönem" required />
        <select value={createForm.status} onChange={(event) => setCreateForm((prev) => ({ ...prev, status: event.target.value }))} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm">
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
        <button className="focus-ring rounded-lg bg-brand-900 px-4 py-2 text-sm font-semibold text-white" type="submit">Yeni Çözüm Ekle</button>
        <textarea value={createForm.summary} onChange={(event) => setCreateForm((prev) => ({ ...prev, summary: event.target.value }))} className="focus-ring md:col-span-2 xl:col-span-3 min-h-20 rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Özet" required />
        <textarea value={createForm.modulesText} onChange={(event) => setCreateForm((prev) => ({ ...prev, modulesText: event.target.value }))} className="focus-ring min-h-20 rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Modüller (her satır 1 madde)" />
        <textarea value={createForm.outcomesText} onChange={(event) => setCreateForm((prev) => ({ ...prev, outcomesText: event.target.value }))} className="focus-ring min-h-20 rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Çıktılar (her satır 1 madde)" />
        <textarea value={createForm.highlightsText} onChange={(event) => setCreateForm((prev) => ({ ...prev, highlightsText: event.target.value }))} className="focus-ring min-h-20 rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Öne Çıkanlar (her satır 1 madde)" />
      </form>

      {editingId && editingDraft ? (
        <form onSubmit={submitEdit} className="mt-4 grid gap-3 rounded-xl border border-brand-200 bg-brand-50/40 p-4 md:grid-cols-2 xl:grid-cols-3">
          <input value={editingDraft.title} onChange={(event) => setEditingDraft((prev) => ({ ...prev, title: event.target.value }))} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Başlık" required />
          <input value={editingDraft.category} onChange={(event) => setEditingDraft((prev) => ({ ...prev, category: event.target.value }))} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Kategori" required />
          <input value={editingDraft.client} onChange={(event) => setEditingDraft((prev) => ({ ...prev, client: event.target.value }))} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Kurum" required />
          <input value={editingDraft.period} onChange={(event) => setEditingDraft((prev) => ({ ...prev, period: event.target.value }))} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Dönem" required />
          <select value={editingDraft.status} onChange={(event) => setEditingDraft((prev) => ({ ...prev, status: event.target.value }))} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm">
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
          <div className="flex gap-2">
            <button className="focus-ring rounded-md bg-brand-900 px-3 py-2 text-xs font-semibold text-white" type="submit">Kaydet</button>
            <button className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700" type="button" onClick={() => { setEditingId(null); setEditingDraft(null) }}>İptal</button>
          </div>
          <textarea value={editingDraft.summary} onChange={(event) => setEditingDraft((prev) => ({ ...prev, summary: event.target.value }))} className="focus-ring md:col-span-2 xl:col-span-3 min-h-20 rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Özet" required />
          <textarea value={editingDraft.modulesText} onChange={(event) => setEditingDraft((prev) => ({ ...prev, modulesText: event.target.value }))} className="focus-ring min-h-20 rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Modüller (her satır 1 madde)" />
          <textarea value={editingDraft.outcomesText} onChange={(event) => setEditingDraft((prev) => ({ ...prev, outcomesText: event.target.value }))} className="focus-ring min-h-20 rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Çıktılar (her satır 1 madde)" />
          <textarea value={editingDraft.highlightsText} onChange={(event) => setEditingDraft((prev) => ({ ...prev, highlightsText: event.target.value }))} className="focus-ring min-h-20 rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Öne Çıkanlar (her satır 1 madde)" />
        </form>
      ) : null}

      <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-[680px] divide-y divide-slate-200 text-sm sm:min-w-full">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="px-4 py-3">Başlık</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">Aksiyon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 font-medium text-slate-800">{item.title}</td>
                <td className="px-4 py-3 text-slate-600">{item.category}</td>
                <td className="px-4 py-3 text-slate-600">{item.status}</td>
                <td className="px-4 py-3">
                  <button className="focus-ring rounded-md border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700" type="button" onClick={() => startEdit(item)}>
                    Düzenle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminSolutionsPage
