import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { adminService } from '../../features/admin/services'

function AdminDashboardPage() {
  const formsQuery = useQuery({
    queryKey: ['admin-dashboard-forms'],
    queryFn: () => adminService.getFormEntries(),
  })

  const contentQuery = useQuery({
    queryKey: ['admin-dashboard-content'],
    queryFn: () => adminService.getContentSections(),
  })

  const solutionsQuery = useQuery({
    queryKey: ['admin-dashboard-solutions'],
    queryFn: () => adminService.getSolutions(),
  })

  const referencesQuery = useQuery({
    queryKey: ['admin-dashboard-references'],
    queryFn: () => adminService.getReferences(),
  })

  const cards = useMemo(() => {
    const forms = formsQuery.data || []
    const content = contentQuery.data || []
    const solutions = solutionsQuery.data || []
    const references = referencesQuery.data || []

    const unread = forms.filter((item) => !item.isRead).length
    const today = new Date().toISOString().slice(0, 10)
    const todayCount = forms.filter((item) => String(item.date || '').slice(0, 10) === today).length
    const publishedContent = content.filter((item) => item.status === 'published').length
    const draftContent = content.filter((item) => item.status === 'draft').length

    return [
      { title: 'Okunmamış Form', value: String(unread) },
      { title: 'Bugün Gelen Talep', value: String(todayCount) },
      { title: 'Yayında İçerik', value: String(publishedContent) },
      { title: 'Taslak İçerik', value: String(draftContent) },
      { title: 'Toplam Çözüm', value: String(solutions.length) },
      { title: 'Toplam Referans', value: String(references.length) },
    ]
  }, [formsQuery.data, contentQuery.data, solutionsQuery.data, referencesQuery.data])

  const recentForms = (formsQuery.data || []).slice(0, 3)

  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Genel Durum</p>
      <h1 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">Dashboard</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-medium text-slate-500">{card.title}</h2>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{card.value}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Son Formlar</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {recentForms.map((item) => (
              <li key={item.id}>{item.name} - {item.type} - {item.status}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Sistem Durumu</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li>Form servisi: {formsQuery.isLoading ? 'Yükleniyor' : 'Aktif'}</li>
            <li>İçerik servisi: {contentQuery.isLoading ? 'Yükleniyor' : 'Aktif'}</li>
            <li>Çözüm servisi: {solutionsQuery.isLoading ? 'Yükleniyor' : 'Aktif'}</li>
            <li>Referans servisi: {referencesQuery.isLoading ? 'Yükleniyor' : 'Aktif'}</li>
          </ul>
        </article>
      </div>
    </section>
  )
}

export default AdminDashboardPage
