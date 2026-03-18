export const contentSections = [
  { key: 'home-slider', title: 'Anasayfa Slider', status: 'published', updatedAt: '2026-03-17 14:10' },
  { key: 'home-sections', title: 'Anasayfa Sectionlar', status: 'draft', updatedAt: '2026-03-16 09:42' },
  { key: 'about-page', title: 'Hakkımızda', status: 'published', updatedAt: '2026-03-15 18:30' },
  { key: 'contact-page', title: 'İletişim Bilgileri', status: 'published', updatedAt: '2026-03-14 11:20' },
]

export const solutionItems = [
  { id: 'sol-01', title: 'Entegre Operasyon Platformu', category: 'Operasyon', status: 'published' },
  { id: 'sol-02', title: 'Kurumsal Başvuru Yönetimi', category: 'Başvuru', status: 'published' },
  { id: 'sol-03', title: 'Akıllı Raporlama ve Analitik', category: 'Analitik', status: 'draft' },
]

export const referenceItems = [
  { id: 'ref-01', title: 'Kamu Başvuru Platformu', category: 'Kamu', status: 'published' },
  { id: 'ref-02', title: 'Lojistik Operasyon Sistemi', category: 'Lojistik', status: 'published' },
  { id: 'ref-03', title: 'Finans Raporlama Modülü', category: 'Finans', status: 'draft' },
]

export const formEntries = [
  {
    id: 'frm-001',
    name: 'Ayşe Yılmaz',
    email: 'ayse@kurum.com',
    phone: '+90 532 000 00 00',
    message: 'Demo talep ediyoruz.',
    type: 'demo',
    date: '2026-03-18 10:20',
    status: 'new',
    notes: '',
    isRead: false,
    isArchived: false,
  },
  {
    id: 'frm-002',
    name: 'Mehmet Kaya',
    email: 'mehmet@firma.com',
    phone: '+90 533 111 22 33',
    message: 'Teklif süreci için görüşmek istiyoruz.',
    type: 'contact',
    date: '2026-03-17 16:05',
    status: 'in_progress',
    notes: 'Cuma günü geri dönüş yapılacak.',
    isRead: true,
    isArchived: false,
  },
  {
    id: 'frm-003',
    name: 'Zeynep Demir',
    email: 'zeynep@aday.com',
    phone: '+90 554 333 44 55',
    message: 'Frontend pozisyonu için başvuru yapmak istiyorum.',
    type: 'career',
    date: '2026-03-17 11:48',
    status: 'resolved',
    notes: 'İK ekibine aktarıldı.',
    isRead: true,
    isArchived: false,
  },
]

export const contentEditorSeed = {
  'home-slider': {
    title: 'Kurumsal süreçlerinizi güvenle dijitalleştirin.',
    subtitle: 'Kamu ve B2B odaklı projelerde ölçeklenebilir yazılım platformları.',
    ctaLabel: 'Çözümleri İncele',
    ctaUrl: '/cozumler',
  },
  'about-page': {
    title: 'Kurumsal süreçleri uzun ömürlü yazılım sistemlerine dönüştürüyoruz.',
    body: 'Analiz, ürünleştirme, teslim ve operasyon aşamalarını aynı kalite standardında yönetiyoruz.',
    highlight: 'Sektör odaklı çözüm ekibi',
  },
  'contact-page': {
    email: 'info@noktasalyazilim.com',
    phone: '+90 212 000 00 00',
    address: 'İstanbul, Türkiye',
    mapUrl: 'https://maps.google.com',
  },
}

export const seoSeed = [
  {
    pageKey: 'home',
    title: 'Noktasal Yazılım | Kurumsal B2B Çözümler',
    description: 'Kurumsal süreçleriniz için premium ve güven odaklı yazılım platformları.',
    ogTitle: 'Noktasal Yazılım',
    ogDescription: 'Kamu ve B2B odaklı yazılım çözümleri.',
  },
  {
    pageKey: 'about',
    title: 'Hakkımızda | Noktasal Yazılım',
    description: 'Kurumsal projelerde uzun ömürlü yazılım sistemleri.',
    ogTitle: 'Noktasal Yazılım Hakkımızda',
    ogDescription: 'Misyon, vizyon ve teslim modeli.',
  },
  {
    pageKey: 'solutions',
    title: 'Çözümler | Noktasal Yazılım',
    description: 'Ürün ve çözüm portföyü.',
    ogTitle: 'Noktasal Çözüm Portföyü',
    ogDescription: 'Başvuru, operasyon ve analitik çözümleri.',
  },
  {
    pageKey: 'references',
    title: 'Referanslar | Noktasal Yazılım',
    description: 'Sektör bazlı başarı hikayeleri.',
    ogTitle: 'Noktasal Referanslar',
    ogDescription: 'Kurumsal vaka çalışmaları.',
  },
]
