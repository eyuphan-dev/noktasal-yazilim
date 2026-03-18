import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { adminService } from '../../features/admin/services'

const EMPTY_ENTRIES = []

function DetailsDrawer({ entry, noteDraft, setNoteDraft, onClose, onSaveNote }) {
  if (!entry) {
    return null
  }

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-slate-900/35"
        onClick={onClose}
        aria-label="Detay panelini kapat"
      />
      <aside className="fixed inset-0 z-50 w-full overflow-y-auto bg-white p-4 shadow-2xl sm:inset-y-0 sm:right-0 sm:left-auto sm:max-w-md sm:border-l sm:border-slate-200 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Talep Detayı</h2>
          <button
            onClick={onClose}
            type="button"
            className="focus-ring rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700"
          >
            Kapat
          </button>
        </div>

        <dl className="mt-6 space-y-3 text-sm">
          <div>
            <dt className="text-slate-500">Ad Soyad</dt>
            <dd className="font-medium text-slate-900">{entry.name}</dd>
          </div>
          <div>
            <dt className="text-slate-500">E-posta</dt>
            <dd className="font-medium text-slate-900">{entry.email}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Telefon</dt>
            <dd className="font-medium text-slate-900">{entry.phone}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Mesaj</dt>
            <dd className="rounded-md bg-slate-50 p-3 text-slate-700">{entry.message}</dd>
          </div>
        </dl>

        <label className="mt-6 block text-sm font-medium text-slate-700" htmlFor="entry-notes">
          İç Notlar
          <textarea
            id="entry-notes"
            className="focus-ring mt-2 min-h-28 w-full rounded-md border border-slate-300 px-3 py-2"
            value={noteDraft}
            onChange={(event) => setNoteDraft(event.target.value)}
          />
        </label>

        <button
          type="button"
          onClick={onSaveNote}
          className="focus-ring mt-4 w-full rounded-lg bg-brand-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Notu Kaydet
        </button>
      </aside>
    </>
  )
}

function AdminFormsPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showArchived, setShowArchived] = useState(false)
  const [selectedEntryId, setSelectedEntryId] = useState(null)
  const [noteDraft, setNoteDraft] = useState('')

  const entriesQuery = useQuery({
    queryKey: ['admin-form-entries'],
    queryFn: () => adminService.getFormEntries(),
  })

  const updateEntryMutation = useMutation({
    mutationFn: ({ id, payload }) => adminService.updateFormEntry(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-form-entries'] })
    },
  })

  const entries = entriesQuery.data || EMPTY_ENTRIES

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      if (!showArchived && entry.isArchived) {
        return false
      }

      if (typeFilter !== 'all' && entry.type !== typeFilter) {
        return false
      }

      if (statusFilter !== 'all' && entry.status !== statusFilter) {
        return false
      }

      if (!search.trim()) {
        return true
      }

      const keyword = search.toLowerCase().trim()
      return (
        entry.name.toLowerCase().includes(keyword) ||
        entry.email.toLowerCase().includes(keyword) ||
        entry.message.toLowerCase().includes(keyword)
      )
    })
  }, [entries, search, showArchived, statusFilter, typeFilter])

  const selectedEntry = entries.find((entry) => entry.id === selectedEntryId) || null

  const updateEntry = (id, payload) => {
    updateEntryMutation.mutate({ id, payload })
  }

  const openEntryDetails = (entry) => {
    setSelectedEntryId(entry.id)
    setNoteDraft(entry.notes || '')
  }

  const saveNote = () => {
    if (!selectedEntry) {
      return
    }

    updateEntry(selectedEntry.id, { notes: noteDraft, isRead: true })
  }

  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Form Merkezi</p>
      <h1 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">İletişim, demo ve kariyer kayıtları</h1>

      <div className="mt-8 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-4">
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          Ara
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm normal-case"
            placeholder="Ad, e-posta veya mesaj"
          />
        </label>

        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          Tip
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm normal-case"
          >
            <option value="all">Tüm tipler</option>
            <option value="contact">İletişim</option>
            <option value="demo">Demo</option>
            <option value="career">Kariyer</option>
          </select>
        </label>

        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          Durum
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm normal-case"
          >
            <option value="all">Tüm durumlar</option>
            <option value="new">new</option>
            <option value="in_progress">in_progress</option>
            <option value="resolved">resolved</option>
          </select>
        </label>

        <label className="flex items-end gap-2 text-sm font-medium text-slate-700">
          <input
            checked={showArchived}
            onChange={(event) => setShowArchived(event.target.checked)}
            className="h-4 w-4"
            type="checkbox"
          />
          Arşivlenenleri göster
        </label>
      </div>

      {entriesQuery.isLoading ? <p className="mt-6 text-sm text-slate-500">Kayıtlar yükleniyor...</p> : null}

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-[760px] divide-y divide-slate-200 text-sm sm:min-w-full">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="px-4 py-3">Kişi</th>
              <th className="px-4 py-3">Tip</th>
              <th className="px-4 py-3">Tarih</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">Okuma</th>
              <th className="px-4 py-3">Aksiyon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredEntries.map((entry) => (
              <tr key={entry.id}>
                <td className="px-4 py-3 align-top">
                  <p className="font-semibold text-slate-900">{entry.name}</p>
                  <p className="text-slate-500">{entry.email}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-500">{entry.message}</p>
                </td>
                <td className="px-4 py-3 text-slate-700">{entry.type}</td>
                <td className="px-4 py-3 text-slate-700">{entry.date}</td>
                <td className="px-4 py-3">
                  <select
                    className="focus-ring rounded-md border border-slate-300 px-2 py-1 text-xs"
                    value={entry.status}
                    onChange={(event) => updateEntry(entry.id, { status: event.target.value })}
                  >
                    <option value="new">new</option>
                    <option value="in_progress">in_progress</option>
                    <option value="resolved">resolved</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-slate-700">{entry.isRead ? 'Okundu' : 'Okunmadı'}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => updateEntry(entry.id, { isRead: !entry.isRead })}
                      className="focus-ring rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700"
                    >
                      {entry.isRead ? 'Okunmamış Yap' : 'Okundu Yap'}
                    </button>
                    <button
                      type="button"
                      onClick={() => updateEntry(entry.id, { isArchived: !entry.isArchived })}
                      className="focus-ring rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700"
                    >
                      {entry.isArchived ? 'Arşivden Çıkar' : 'Arşivle'}
                    </button>
                    <button
                      type="button"
                      onClick={() => openEntryDetails(entry)}
                      className="focus-ring rounded-md border border-brand-200 px-2 py-1 text-xs font-semibold text-brand-700"
                    >
                      Detay
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DetailsDrawer
        entry={selectedEntry}
        noteDraft={noteDraft}
        setNoteDraft={setNoteDraft}
        onClose={() => setSelectedEntryId(null)}
        onSaveNote={saveNote}
      />
    </section>
  )
}

export default AdminFormsPage
