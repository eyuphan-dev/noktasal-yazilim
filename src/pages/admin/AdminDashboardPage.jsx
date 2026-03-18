const cards = [
  { title: 'Okunmamış Form', value: '18' },
  { title: 'Bugün Gelen Talep', value: '7' },
  { title: 'Yayında İçerik', value: '34' },
  { title: 'Taslak İçerik', value: '11' },
]

function AdminDashboardPage() {
  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Genel Durum</p>
      <h1 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">Dashboard</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article key={card.title} className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-medium text-slate-500">{card.title}</h2>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{card.value}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Son İşlemler</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li>Anasayfa slider güncellendi.</li>
            <li>Demo talebi frm-001 kaydı okundu olarak işaretlendi.</li>
            <li>Finans referansı taslak olarak kaydedildi.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Bekleyen Görevler</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li>Çözümler sayfası SEO alanları tamamlanacak.</li>
            <li>Kariyer içeriği için yeni pozisyon metni bekleniyor.</li>
            <li>Form merkezi için arşivlenen kayıtlar dışa aktarılacak.</li>
          </ul>
        </article>
      </div>
    </section>
  )
}

export default AdminDashboardPage
