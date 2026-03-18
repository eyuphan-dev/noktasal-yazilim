import { Link } from 'react-router-dom'

function CtaBand({ title, text, primaryLabel, primaryTo, secondaryLabel, secondaryTo }) {
  return (
    <section className="container-shell py-14 md:py-20">
      <div className="rounded-3xl border border-brand-100 bg-brand-950 p-6 text-white shadow-soft sm:p-8 md:p-12">
        <h2 className="max-w-3xl text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">{title}</h2>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-brand-100 md:text-base">{text}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="focus-ring inline-flex w-full items-center justify-center rounded-full bg-accent-500 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-accent-700 sm:w-auto"
            to={primaryTo}
          >
            {primaryLabel}
          </Link>
          <Link
            className="focus-ring inline-flex w-full items-center justify-center rounded-full border border-brand-300 px-5 py-3 text-sm font-semibold text-brand-100 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-900 sm:w-auto"
            to={secondaryTo}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CtaBand
