import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { inquirySchema } from '../../features/forms/inquirySchema'

const FORM_COPY = {
  contact: {
    title: 'İletişim Formu',
    helper: 'Projenizle ilgili talebinizi iletin, en kısa sürede dönüş yapalım.',
    submitLabel: 'Mesajı Gönder',
  },
  demo: {
    title: 'Demo Talep Formu',
    helper: 'Ürünü canlı görmek için kısa bilgilerinizi paylaşın, toplantıyı planlayalım.',
    submitLabel: 'Demo Talep Et',
  },
}

function InquiryForm({ type = 'contact' }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverMessage, setServerMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      type,
    },
    mode: 'onTouched',
  })

  const copy = FORM_COPY[type]

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true)
    setServerMessage('')

    await new Promise((resolve) => setTimeout(resolve, 500))

    setServerMessage(
      `Talebiniz alındı (${values.type}). En kısa sürede ${values.email} adresine dönüş yapacağız.`,
    )
    reset({
      name: '',
      email: '',
      phone: '',
      message: '',
      type,
    })
    setIsSubmitting(false)
  })

  return (
    <form
      className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft md:p-8"
      noValidate
      onSubmit={onSubmit}
    >
      <input type="hidden" {...register('type')} />

      <h2 className="text-2xl font-semibold text-brand-950">{copy.title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{copy.helper}</p>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700" htmlFor={`name-${type}`}>
          Ad Soyad
          <input
            {...register('name')}
            className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
            id={`name-${type}`}
            name="name"
            autoComplete="name"
          />
          {errors.name ? <span className="mt-1 block text-xs text-rose-700">{errors.name.message}</span> : null}
        </label>

        <label className="text-sm font-medium text-slate-700" htmlFor={`email-${type}`}>
          E-posta
          <input
            {...register('email')}
            className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
            id={`email-${type}`}
            name="email"
            type="email"
            autoComplete="email"
          />
          {errors.email ? (
            <span className="mt-1 block text-xs text-rose-700">{errors.email.message}</span>
          ) : null}
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor={`phone-${type}`}>
        Telefon
        <input
          {...register('phone')}
          className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
          id={`phone-${type}`}
          name="phone"
          autoComplete="tel"
        />
        {errors.phone ? <span className="mt-1 block text-xs text-rose-700">{errors.phone.message}</span> : null}
      </label>

      <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor={`message-${type}`}>
        Mesaj
        <textarea
          {...register('message')}
          className="focus-ring mt-2 min-h-28 w-full rounded-lg border border-slate-300 px-3 py-2"
          id={`message-${type}`}
          name="message"
        />
        {errors.message ? (
          <span className="mt-1 block text-xs text-rose-700">{errors.message.message}</span>
        ) : null}
      </label>

      <button
        className="focus-ring mt-6 w-full rounded-lg bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Gönderiliyor...' : copy.submitLabel}
      </button>

      {serverMessage ? (
        <p aria-live="polite" className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          {serverMessage}
        </p>
      ) : null}
    </form>
  )
}

export default InquiryForm
