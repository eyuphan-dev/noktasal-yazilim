import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="container-shell py-20 text-center md:py-28">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-brand-950 md:text-5xl">Aradığınız sayfa bulunamadı</h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600">
        Link hatalı olabilir ya da ilgili içerik taşınmış olabilir.
      </p>
      <Link
        to="/"
        className="focus-ring mt-8 inline-flex rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
      >
        Anasayfaya dön
      </Link>
    </main>
  )
}

export default NotFoundPage
