BEGIN;

INSERT INTO content_sections (key, title, status, updated_at) VALUES
('home-slider', 'Anasayfa Slider', 'published', '2026-03-17 14:10+03'),
('home-sections', 'Anasayfa Sectionlar', 'draft', '2026-03-16 09:42+03'),
('about-page', 'Hakkimizda', 'published', '2026-03-15 18:30+03'),
('contact-page', 'Iletisim Bilgileri', 'published', '2026-03-14 11:20+03')
ON CONFLICT (key) DO UPDATE SET
  title = EXCLUDED.title,
  status = EXCLUDED.status,
  updated_at = EXCLUDED.updated_at;

INSERT INTO content_section_payloads (section_key, payload, updated_at) VALUES
('home-slider', '{"slides":[{"tag":"Modern Kurumsal Mimari","title":"Kurumsal sureclerinizi guvenle dijitallestirin.","text":"Kamu ve B2B odakli projelerde olceklenebilir yazilim platformlari gelistiriyoruz.","cta":"Cozumleri Incele","ctaUrl":"/cozumler","photo":"https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=80","stats":["99.95% Uptime Hedefi","Canli Izleme ve Alarm","Mevzuata Uyumlu Surecler"]},{"tag":"Operasyon Odakli Tasarim","title":"Entegrasyon ve operasyonu tek bir cati altinda yonetin.","text":"Urun mimarisi, veri akislariniz ve raporlama ihtiyaciniz icin uc uca tasarim.","cta":"Referanslara Goz At","ctaUrl":"/referanslar","photo":"https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2200&q=80","stats":["Rol Bazli Yetkilendirme","Izlenebilir Is Akislari","Dusuk Operasyon Maliyeti"]},{"tag":"Guvenlik ve Surdurulebilirlik","title":"Yuksek guvenlik ve surdurulebilir kod standardi.","text":"Uzun omurlu, bakimi kolay ve ekip buyumesine uygun sistemler kuruyoruz.","cta":"Toplanti Planla","ctaUrl":"/iletisim","photo":"https://images.unsplash.com/photo-1451188502541-13943edb6acb?auto=format&fit=crop&w=2200&q=80","stats":["CI/CD Uyumlu Yapi","Kalite Guvencesi Sureci","Uzun Vadeli Olceklenme"]}]}'::jsonb, NOW()),
('home-sections', '{"trustHeading":"Sektorel tecrube ve operasyonel guveni tek bakista gosterin","trustDescription":"Bu duzen, karar vericinin once guveni gorup sonra detaylara inmesini saglar.","whyHeading":"Neden Noktasal?","focusHeading":"Odak Alanlari","worksHeading":"Farkli kurumlarda teslim ettigimiz projelerden seckiler","worksDescription":"Canli cozumleri tek ekranda inceleyin ve detay sayfalarina ilerleyin.","trustItems":[{"label":"Kamu Kurumlari","detail":"Mevzuata uyumlu dijital donusum"},{"label":"Finans Kuruluslari","detail":"Guvenli islem ve raporlama altyapisi"},{"label":"Lojistik Operatorleri","detail":"Anlik operasyon izleme ve optimizasyon"},{"label":"B2B Uretim Sirketleri","detail":"Ucuca tedarik surec dijitallesmesi"}],"highlightStats":[{"title":"Kurumsal Proje","value":"40+","text":"Canlida calisan teslimat sayisi"},{"title":"Sektorel Deneyim","value":"12","text":"Farkli regulasyon yapisinda uygulama"},{"title":"Operasyon Destek","value":"7/24","text":"SLA tabanli surekli izleme ve mudahale"}],"whyPoints":["Kurumsal yonetim, guvenlik ve operasyon standartlarina uygun modern mimari.","Urun odakli teslim modeliyle olceklenebilir ve surdurulebilir kod tabani.","Entegrasyon, raporlama ve destek surecini tek merkezden yonetebilen ekip yapisi."],"focusTags":["Basvuru Sistemleri","Operasyon Panelleri","Karar Destek"]}'::jsonb, NOW()),
('about-page', '{"title":"Kurumsal surecleri uzun omurlu yazilim sistemlerine donusturuyoruz.","body":"Analiz, urunlestirme, teslim ve operasyon asamalarini ayni kalite standardinda yonetiyoruz.","highlight":"Sektor odakli cozum ekibi"}'::jsonb, NOW()),
('contact-page', '{"email":"info@noktasalyazilim.com","phone":"+90 212 000 00 00","address":"Istanbul, Turkiye","mapUrl":"https://maps.google.com"}'::jsonb, NOW())
ON CONFLICT (section_key) DO UPDATE SET
  payload = EXCLUDED.payload,
  updated_at = EXCLUDED.updated_at;

INSERT INTO seo_settings (page_key, title, description, og_title, og_description, updated_at) VALUES
('home', 'Noktasal Yazilim | Kurumsal B2B Cozumler', 'Kurumsal surecleriniz icin premium ve guven odakli yazilim platformlari.', 'Noktasal Yazilim', 'Kamu ve B2B odakli yazilim cozumleri.', NOW()),
('about', 'Hakkimizda | Noktasal Yazilim', 'Kurumsal projelerde uzun omurlu yazilim sistemleri.', 'Noktasal Yazilim Hakkimizda', 'Misyon, vizyon ve teslim modeli.', NOW()),
('solutions', 'Cozumler | Noktasal Yazilim', 'Urun ve cozum portfoyu.', 'Noktasal Cozum Portfoyu', 'Basvuru, operasyon ve analitik cozumleri.', NOW()),
('references', 'Referanslar | Noktasal Yazilim', 'Sektor bazli basari hikayeleri.', 'Noktasal Referanslar', 'Kurumsal vaka calismalari.', NOW())
ON CONFLICT (page_key) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  og_title = EXCLUDED.og_title,
  og_description = EXCLUDED.og_description,
  updated_at = EXCLUDED.updated_at;

INSERT INTO solutions (id, slug, title, category, client, period, summary, modules, outcomes, highlights, is_published, sort_order, updated_at) VALUES
('sol-001', 'itfaiye-bilgi-sistemi', 'Itfaiye Bilgi Sistemi', 'Kamu Operasyon', 'Trabzon Buyuksehir Belediyesi', '2019-2025', 'Ihbar, ekip yonetimi, olay takibi ve raporlama sureclerini tek merkezde birlestiren kurumsal operasyon platformu.', '["Ihbar Yonetimi","Ekip/Istasyon Planlama","Canli Olay Takibi","Operasyon Raporlama"]'::jsonb, '["Mudahale koordinasyonunda %32 hizlanma","Vardiya planlama hatalarinda %26 azalma"]'::jsonb, '["Saha ekiplerinin mobil veri girisini destekleyen yapi","Yonetim panelinde anlik olay yogunlugu gorunurlugu"]'::jsonb, TRUE, 1, NOW()),
('sol-002', 'nolevs-numarataj-levhalama', 'NOLEVS Numarataj Levhalama Sistemi', 'Saha Uygulamalari', 'Kocaeli Buyuksehir Belediyesi', '2013-2025', 'Adres envanteri, levhalama plani ve saha uygulama adimlarini dijitallestiren entegre saha yonetim cozumu.', '["Adres Envanteri","Saha Is Emirleri","Levha Takibi","Fotograf Kanit Yonetimi"]'::jsonb, '["Saha is kapanis suresinde %38 iyilesme","Adres veri tutarliliginda %41 artis"]'::jsonb, '["Saha ekipleri icin cevrimdisi kullanim destegi","Merkez birimlerde dogrulanabilir uygulama gecmisi"]'::jsonb, TRUE, 2, NOW()),
('sol-003', 'tasinmaz-kiralama-sistemi', 'Tasinmaz Kiralama Sistemi', 'Kurumsal Varlik Yonetimi', 'Turkiye Buyuk Millet Meclisi', '2025', 'Tasinmaz portfoyu, sozlesme surecleri ve ihale adimlarini seffaf sekilde yoneten kurumsal yonetim sistemi.', '["Portfoy Yonetimi","Sozlesme Takibi","Ihale Sureci","Gelir Raporlama"]'::jsonb, '["Surec gorunurlugunde 3 kat artis","Evrak dongu suresinde %29 azalma"]'::jsonb, '["Yetki bazli erisim ve onay akislari","Yonetim icin tek panelde performans raporlari"]'::jsonb, TRUE, 3, NOW()),
('sol-004', 'maks-degisenler-servisi', 'MAKS Degisenler Servisi', 'Entegrasyon Servisleri', 'T.C. Cevre, Sehircilik ve Iklim Degisikligi Bakanligi', '2025', 'Adres ve numarataj degisimlerini kurum ici sistemlere guvenli bicimde aktaran servis altyapisi.', '["Delta Veri Servisi","Dogrulama Katmani","Hata Yonetimi","Izleme Dashboard"]'::jsonb, '["Veri senkron gecikmesinde %45 azalma","Entegrasyon hatalarinda %33 dusus"]'::jsonb, '["Kurumsal API sozlesmesiyle uyumlu servisler","Yuksek hacimde guvenilir veri akisi"]'::jsonb, TRUE, 4, NOW()),
('sol-005', 'maks-entegre-numarataj-uygulamasi', 'MAKS Entegre Numarataj Uygulamasi', 'Cografi Bilgi Sistemleri', 'Bursa Buyuksehir Belediyesi', '2022-2025', 'Cografi altyapi ile numarataj verisini tek platformda birlestirerek kurumlar arasi veri uyumu saglayan cozum.', '["CBS Katman Yonetimi","Numarataj Dogrulama","Saha Degisiklik Takibi","Harita Raporlari"]'::jsonb, '["Veri tutarliliginda %40 iyilesme","Saha koordinasyonunda %24 hizlanma"]'::jsonb, '["Harita tabanli karar destek ekranlari","Merkez-saha ekipleri icin ortak veri zemini"]'::jsonb, TRUE, 5, NOW()),
('sol-006', 'enerji-dagitim-saha-koordinasyon-platformu', 'Enerji Dagitim Saha Koordinasyon Platformu', 'Enerji Operasyon', 'BEDAS', '2025', 'Saha ekipleri, ariza yonetimi ve operasyon izleme sureclerini birlestiren dagitim odakli yonetim cozumu.', '["Ariza Akis Yonetimi","Saha Ekip Takibi","Gorev Onceliklendirme","Performans Paneli"]'::jsonb, '["Ariza kapanis suresinde %21 dusus","Ekip verimliliginde %18 artis"]'::jsonb, '["Yogun operasyon donemlerinde olceklenebilir yapi","Yonetim katmani icin gercek zamanli gorunurluk"]'::jsonb, TRUE, 6, NOW()),
('sol-007', 'trakya-enerji-raporlama-modulu', 'Trakya Enerji Raporlama Modulu', 'Analitik ve Raporlama', 'TREDAS', '2025', 'Dagitim sureclerini metriklerle izleyen ve yonetime karar destegi sunan raporlama odakli modul.', '["KPI Paneli","Operasyon Analizi","Bolgesel Karsilastirma","Rapor Planlama"]'::jsonb, '["Rapor hazirlama suresinde %47 azalma","Karar alma hizinda %28 artis"]'::jsonb, '["Kurum ici birimler icin rol bazli rapor erisimi","Trend analizi ile erken aksiyon imkani"]'::jsonb, TRUE, 7, NOW()),
('sol-008', 'belediye-cbs-operasyon-merkezi', 'Belediye CBS Operasyon Merkezi', 'Cografi Operasyon', 'Antalya Buyuksehir Belediyesi', '2025', 'CBS verileri uzerinden operasyon birimlerini koordine eden ve saha kararlarini hizlandiran merkezi yonetim paneli.', '["Harita Operasyon Merkezi","Saha Olay Katmani","Birim Bazli Izleme","Yetki Yonetimi"]'::jsonb, '["Saha koordinasyon suresinde %25 iyilesme","Operasyonel gorunurlukte belirgin artis"]'::jsonb, '["Cok birimli kullanim icin olcekli tasarim","Canli harita odakli kullanici deneyimi"]'::jsonb, TRUE, 8, NOW()),
('sol-009', 'akilli-basvuru-yonetimi', 'Akilli Basvuru Yonetimi', 'Basvuru Platformlari', 'Gaziosmanpasa Belediyesi', '2024-2025', 'Vatandas basvurularini siniflandirip ilgili birimlere otomatik yonlendiren dijital basvuru yonetim cozumu.', '["Basvuru Akis Motoru","Siniflandirma Kurallari","Birim Is Listeleri","Vatandas Geri Bildirimi"]'::jsonb, '["Ilk yanit suresinde %34 iyilesme","Birimler arasi devir hatalarinda %22 azalma"]'::jsonb, '["Vatandas deneyimi icin sade basvuru ekranlari","Yonetim icin izlenebilir surec raporlari"]'::jsonb, TRUE, 9, NOW()),
('sol-010', 'adres-veri-kalite-platformu', 'Adres Veri Kalite Platformu', 'Veri Kalitesi', 'Buyukcekmece Belediyesi', '2023-2025', 'Adres kayitlarinda kalite kurallari uygulayarak veri dogrulugunu ve kurum ici entegrasyon kalitesini artiran platform.', '["Veri Dogrulama Kurallari","Cakisma Analizi","Kalite Skoru","Duzeltme Is Akislari"]'::jsonb, '["Hatali kayit oraninda %39 dusus","Veri bakim maliyetinde %27 azalma"]'::jsonb, '["Surekli kalite kontrol yaklasimi","Entegrasyon surecleriyle uyumlu veri modeli"]'::jsonb, TRUE, 10, NOW()),
('sol-011', 'belediye-entegrasyon-katmani', 'Belediye Entegrasyon Katmani', 'Kurumsal Entegrasyon', 'Adana Buyuksehir Belediyesi', '2023-2025', 'Farkli kurumsal uygulamalar arasinda guvenli veri iletisimi saglayan merkezi entegrasyon katmani.', '["API Gateway","Servis Orkestrasyonu","Log ve Izleme","Hata Izleme"]'::jsonb, '["Entegrasyon gelistirme suresinde %30 iyilesme","Sistemler arasi tutarlilikta artis"]'::jsonb, '["Merkezi standartlarla dusuk operasyon riski","Yuksek erisilebilirlik odakli altyapi"]'::jsonb, TRUE, 11, NOW()),
('sol-012', 'kurumsal-karar-destek-paneli', 'Kurumsal Karar Destek Paneli', 'Yonetim Panelleri', 'Nilufer Belediyesi', '2021-2025', 'Yonetim ekipleri icin operasyon metriklerini ozetleyen ve stratejik aksiyonlari hizlandiran karar destek paneli.', '["Yonetici Dashboard","Hedef Takibi","Trend Izleme","Bildirim Altyapisi"]'::jsonb, '["Yonetim rapor dongusunde %36 kisalma","Kritik aksiyon suresinde %23 iyilesme"]'::jsonb, '["KPI odakli sade kullanici deneyimi","Kurumsal yonetime uygun guvenli erisim modeli"]'::jsonb, TRUE, 12, NOW())
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  client = EXCLUDED.client,
  period = EXCLUDED.period,
  summary = EXCLUDED.summary,
  modules = EXCLUDED.modules,
  outcomes = EXCLUDED.outcomes,
  highlights = EXCLUDED.highlights,
  is_published = EXCLUDED.is_published,
  sort_order = EXCLUDED.sort_order,
  updated_at = EXCLUDED.updated_at;

INSERT INTO reference_partners (id, name, period, logo_url, is_published, sort_order, updated_at) VALUES
('ref-001', 'Turkiye Buyuk Millet Meclisi', '2025', 'https://noktasal.com.tr/wp-content/uploads/tbmmlogo-150x150.png', TRUE, 1, NOW()),
('ref-002', 'T.C. Cevre, Sehircilik ve Iklim Degisikligi Bakanligi', '2025', 'https://noktasal.com.tr/wp-content/uploads/cevre-sehircilik-iklim-200x150.jpg', TRUE, 2, NOW()),
('ref-003', 'BEDAS - Bogazici Elektrik Dagitim A.S.', '2025', 'https://noktasal.com.tr/wp-content/uploads/bogazicick-150x150.jpg', TRUE, 3, NOW()),
('ref-004', 'Kocaeli Buyuksehir Belediyesi', '2013-2025', 'https://noktasal.com.tr/wp-content/uploads/kbblogonew-170x140.jpg', TRUE, 4, NOW()),
('ref-005', 'Trabzon Buyuksehir Belediyesi', '2019-2025', NULL, TRUE, 5, NOW()),
('ref-006', 'Bursa Buyuksehir Belediyesi', '2022-2025', NULL, TRUE, 6, NOW()),
('ref-007', 'TREDAS - Trakya Elektrik Dagitim A.S.', '2025', NULL, TRUE, 7, NOW()),
('ref-008', 'AEDAS - Akdeniz Elektrik Dagitim A.S.', '2025', NULL, TRUE, 8, NOW()),
('ref-009', 'CEDAS - Camlibel Elektrik Dagitim A.S.', '2025', NULL, TRUE, 9, NOW()),
('ref-010', 'Antalya Buyuksehir Belediyesi', '2025', NULL, TRUE, 10, NOW()),
('ref-011', 'Adana Buyuksehir Belediyesi', '2023-2025', NULL, TRUE, 11, NOW()),
('ref-012', 'Sanliurfa Buyuksehir Belediyesi', '2020-2025', NULL, TRUE, 12, NOW()),
('ref-013', 'Gaziosmanpasa Belediyesi', '2024-2025', NULL, TRUE, 13, NOW()),
('ref-014', 'Buyukcekmece Belediyesi', '2023-2025', NULL, TRUE, 14, NOW()),
('ref-015', 'Nilufer Belediyesi', '2021-2025', NULL, TRUE, 15, NOW()),
('ref-016', 'Istanbul Buyuksehir Belediyesi', '2015-2016', NULL, TRUE, 16, NOW()),
('ref-017', 'Ordu Buyuksehir Belediyesi', '2015-2023', NULL, TRUE, 17, NOW())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  period = EXCLUDED.period,
  logo_url = EXCLUDED.logo_url,
  is_published = EXCLUDED.is_published,
  sort_order = EXCLUDED.sort_order,
  updated_at = EXCLUDED.updated_at;

INSERT INTO form_entries (id, type, name, email, phone, message, status, notes, is_read, is_archived, created_at, updated_at) VALUES
('frm-001', 'demo', 'Ayse Yilmaz', 'ayse@kurum.com', '+90 532 000 00 00', 'Demo talep ediyoruz.', 'new', '', FALSE, FALSE, '2026-03-18 10:20+03', NOW()),
('frm-002', 'contact', 'Mehmet Kaya', 'mehmet@firma.com', '+90 533 111 22 33', 'Teklif sureci icin gorusmek istiyoruz.', 'in_progress', 'Cuma gunu geri donus yapilacak.', TRUE, FALSE, '2026-03-17 16:05+03', NOW()),
('frm-003', 'application', 'Zeynep Demir', 'zeynep@aday.com', '+90 554 333 44 55', 'Frontend pozisyonu icin basvuru yapmak istiyorum.', 'resolved', 'IK ekibine aktarildi.', TRUE, FALSE, '2026-03-17 11:48+03', NOW())
ON CONFLICT (id) DO UPDATE SET
  type = EXCLUDED.type,
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  message = EXCLUDED.message,
  status = EXCLUDED.status,
  notes = EXCLUDED.notes,
  is_read = EXCLUDED.is_read,
  is_archived = EXCLUDED.is_archived,
  updated_at = EXCLUDED.updated_at;

COMMIT;
