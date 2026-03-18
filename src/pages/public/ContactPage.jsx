import InquiryForm from '../../components/forms/InquiryForm'
import SectionIntro from '../../components/sections/SectionIntro'

function ContactPage() {
  return (
    <section className="container-shell py-16 md:py-24">
      <SectionIntro
        eyebrow="İletişim"
        title="Ekibimizle doğrudan iletişime geçin"
        description="İletişim veya demo talepleriniz için ilgili formu seçerek bize ulaşabilirsiniz."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <InquiryForm type="contact" />
        <InquiryForm type="demo" />
      </div>

      <article className="mt-8 rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-semibold text-brand-950">İletişim Bilgileri</h2>
        <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
          <li>E-posta: info@noktasalyazilim.com</li>
          <li>Telefon: +90 212 000 00 00</li>
          <li>Adres: İstanbul, Türkiye</li>
        </ul>
      </article>
    </section>
  )
}

export default ContactPage
