import { z } from 'zod'

export const inquirySchema = z.object({
  name: z
    .string()
    .min(2, 'Ad soyad en az 2 karakter olmalıdır.')
    .max(80, 'Ad soyad 80 karakterden uzun olamaz.'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz.'),
  phone: z
    .string()
    .min(10, 'Telefon numarası en az 10 karakter olmalıdır.')
    .max(20, 'Telefon numarası 20 karakterden uzun olamaz.'),
  type: z.enum(['contact', 'demo']),
  message: z
    .string()
    .min(10, 'Mesaj en az 10 karakter olmalıdır.')
    .max(1000, 'Mesaj 1000 karakterden uzun olamaz.'),
})
