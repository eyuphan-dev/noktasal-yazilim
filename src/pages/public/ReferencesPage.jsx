import { useQuery } from '@tanstack/react-query'
import SectionIntro from '../../components/sections/SectionIntro'
import { publicApiService } from '../../features/public/services/publicApiService'

function partnerInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

function ReferencesPage() {
  const referencesQuery = useQuery({
    queryKey: ['public-references'],
    queryFn: () => publicApiService.getReferences(),
  })

  const referencePartners = referencesQuery.data || []

  return (
    <section className="container-shell py-16 md:py-24">
      <SectionIntro
        eyebrow="Referanslar"
        title="İş birliği yapılan kurum ve firmalar"
        description="Kurumsal ölçekte birlikte çalıştığımız paydaşları logo ve kurum isimleriyle sunuyoruz."
      />

      <section className="mt-10 rounded-3xl border border-brand-100/80 bg-gradient-to-b from-white to-brand-50/40 p-5 shadow-soft md:p-7">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {referencePartners.map((partner) => (
            <article key={partner.id} className="interactive-lift rounded-2xl border border-brand-100 bg-white p-4 md:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-brand-100 bg-slate-50">
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-full w-full object-contain p-1"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="text-xs font-semibold text-brand-800">{partnerInitials(partner.name)}</span>
                  )}
                </div>
                <div>
                  <h2 className="text-sm font-semibold leading-6 text-slate-900">{partner.name}</h2>
                  <p className="text-xs font-medium text-slate-500">{partner.period}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}

export default ReferencesPage
