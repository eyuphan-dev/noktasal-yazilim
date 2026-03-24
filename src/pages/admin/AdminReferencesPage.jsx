import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { adminService } from '../../features/admin/services'

const EMPTY_LIST = []

const INITIAL_FORM = {
  name: '',
  period: '',
  logoUrl: '',
  status: 'draft',
}

function AdminReferencesPage() {
  const queryClient = useQueryClient()
  const [createForm, setCreateForm] = useState(INITIAL_FORM)
  const [editingId, setEditingId] = useState(null)
  const [editingDraft, setEditingDraft] = useState(null)

  const referencesQuery = useQuery({
    queryKey: ['admin-references'],
    queryFn: () => adminService.getReferences(),
  })

  const createMutation = useMutation({
    mutationFn: (payload) => adminService.createReference(payload),
    onSuccess: () => {
      setCreateForm(INITIAL_FORM)
      queryClient.invalidateQueries({ queryKey: ['admin-references'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => adminService.updateReference(id, payload),
    onSuccess: () => {
      setEditingId(null)
      setEditingDraft(null)
      queryClient.invalidateQueries({ queryKey: ['admin-references'] })
    },
  })

  const items = referencesQuery.data || EMPTY_LIST

  const startEdit = (item) => {
    setEditingId(item.id)
    setEditingDraft({
      name: item.name || '',
      period: item.period || '',
      logoUrl: item.logoUrl || '',
      status: item.status || 'draft',
    })
  }

  const submitCreate = (event) => {
    event.preventDefault()
    createMutation.mutate(createForm)
  }

  const submitEdit = (event) => {
    event.preventDefault()
    if (!editingId || !editingDraft) {
      return
    }
    updateMutation.mutate({ id: editingId, payload: editingDraft })
  }

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Referanslar</p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">Referans ve kategori yönetimi</h1>
        </div>
      </div>

      <form onSubmit={submitCreate} className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2 xl:grid-cols-4">
        <input value={createForm.name} onChange={(event) => setCreateForm((prev) => ({ ...prev, name: event.target.value }))} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Referans adı" required />
        <input value={createForm.period} onChange={(event) => setCreateForm((prev) => ({ ...prev, period: event.target.value }))} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Dönem" required />
        <input value={createForm.logoUrl} onChange={(event) => setCreateForm((prev) => ({ ...prev, logoUrl: event.target.value }))} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Logo URL (opsiyonel)" />
        <select value={createForm.status} onChange={(event) => setCreateForm((prev) => ({ ...prev, status: event.target.value }))} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm">
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
        <button className="focus-ring md:col-span-2 xl:col-span-4 rounded-lg bg-brand-900 px-4 py-2 text-sm font-semibold text-white" type="submit">Yeni Referans Ekle</button>
      </form>

      {editingId && editingDraft ? (
        <form onSubmit={submitEdit} className="mt-4 grid gap-3 rounded-xl border border-brand-200 bg-brand-50/40 p-4 md:grid-cols-2 xl:grid-cols-4">
          <input value={editingDraft.name} onChange={(event) => setEditingDraft((prev) => ({ ...prev, name: event.target.value }))} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Referans adı" required />
          <input value={editingDraft.period} onChange={(event) => setEditingDraft((prev) => ({ ...prev, period: event.target.value }))} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Dönem" required />
          <input value={editingDraft.logoUrl} onChange={(event) => setEditingDraft((prev) => ({ ...prev, logoUrl: event.target.value }))} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Logo URL" />
          <select value={editingDraft.status} onChange={(event) => setEditingDraft((prev) => ({ ...prev, status: event.target.value }))} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm">
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
          <div className="md:col-span-2 xl:col-span-4 flex gap-2">
            <button className="focus-ring rounded-md bg-brand-900 px-3 py-2 text-xs font-semibold text-white" type="submit">Kaydet</button>
            <button className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700" type="button" onClick={() => { setEditingId(null); setEditingDraft(null) }}>İptal</button>
          </div>
        </form>
      ) : null}

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">{item.name}</h2>
            <p className="mt-2 text-sm text-slate-500">Dönem: {item.period}</p>
            <p className="mt-1 text-sm text-slate-500">Durum: {item.status}</p>
            <button className="focus-ring mt-5 rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700" type="button" onClick={() => startEdit(item)}>
              Düzenle
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AdminReferencesPage
