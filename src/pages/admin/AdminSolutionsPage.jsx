import { solutionItems } from '../../features/admin/mockData'

function AdminSolutionsPage() {
  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Çözümler</p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">Ürün ve çözüm listesi</h1>
        </div>
        <button className="focus-ring rounded-lg bg-brand-900 px-4 py-2 text-sm font-semibold text-white" type="button">
          Yeni Çözüm Ekle
        </button>
      </div>

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
            {solutionItems.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 font-medium text-slate-800">{item.title}</td>
                <td className="px-4 py-3 text-slate-600">{item.category}</td>
                <td className="px-4 py-3 text-slate-600">{item.status}</td>
                <td className="px-4 py-3">
                  <button className="focus-ring rounded-md border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700" type="button">
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
