import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAuth } from '../../features/auth/useAuth'

const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta giriniz.'),
  password: z
    .string()
    .min(8, 'Şifre en az 8 karakter olmalıdır.')
    .max(64, 'Şifre en fazla 64 karakter olmalıdır.'),
})

function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const from = location.state?.from || '/admin/dashboard'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  })

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true)
    setServerError('')
    const result = login(values)

    if (!result.ok) {
      setServerError(result.message)
      setIsSubmitting(false)
      return
    }

    navigate(from, { replace: true })
  })

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12">
      <section className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Admin Girişi</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">İçerik yönetim paneli</h1>
        <form className="mt-8 space-y-4" noValidate onSubmit={onSubmit}>
          <label className="block text-sm font-medium text-slate-700" htmlFor="email">
            E-posta
            <input
              {...register('email')}
              className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
              id="email"
              type="email"
              autoComplete="email"
              placeholder="yonetici@firma.com"
            />
            {errors.email ? (
              <span className="mt-1 block text-xs text-rose-700">{errors.email.message}</span>
            ) : null}
          </label>

          <label className="block text-sm font-medium text-slate-700" htmlFor="password">
            Şifre
            <input
              {...register('password')}
              className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
            />
            {errors.password ? (
              <span className="mt-1 block text-xs text-rose-700">{errors.password.message}</span>
            ) : null}
          </label>

          {serverError ? (
            <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {serverError}
            </p>
          ) : null}

          <button
            className="focus-ring w-full rounded-lg bg-brand-900 px-4 py-2 font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
          Test Hesapları: admin@noktasal.com / Admin1234! ve editor@noktasal.com / Editor1234!
        </div>

        <Link to="/" className="focus-ring mt-6 inline-flex rounded-sm text-sm font-medium text-brand-700 hover:text-brand-900">
          Siteye dön
        </Link>
      </section>
    </main>
  )
}

export default AdminLoginPage
