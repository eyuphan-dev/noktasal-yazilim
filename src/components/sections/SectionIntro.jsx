function SectionIntro({ eyebrow, title, description, centered = false }) {
  return (
    <header className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{eyebrow}</p>
      <h1 className="mt-4 font-serif text-3xl leading-tight text-brand-950 sm:text-4xl md:text-5xl">{title}</h1>
      {description ? <p className="mt-5 text-sm leading-7 text-slate-600 md:mt-6 md:text-base md:leading-8">{description}</p> : null}
    </header>
  )
}

export default SectionIntro
