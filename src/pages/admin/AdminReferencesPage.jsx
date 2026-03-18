import { referenceItems } from '../../features/admin/mockData'

function AdminReferencesPage() {
  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Referanslar</p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">Referans ve kategori yönetimi</h1>
        </div>
        <button className="focus-ring rounded-lg bg-brand-900 px-4 py-2 text-sm font-semibold text-white" type="button">
          Yeni Referans Ekle
        </button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {referenceItems.map((item) => (
          <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-500">Kategori: {item.category}</p>
            <p className="mt-1 text-sm text-slate-500">Durum: {item.status}</p>
            <button className="focus-ring mt-5 rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700" type="button">
              Düzenle
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AdminReferencesPage
