-- ═══════════════════════════════════════════════════════════════
-- GoRent — Supabase Database Migration
-- ═══════════════════════════════════════════════════════════════
-- Jalankan SQL ini di Supabase Dashboard → SQL Editor
-- https://supabase.com/dashboard/project/YOUR_PROJECT/sql
-- ═══════════════════════════════════════════════════════════════

-- ─── Fleet / Armada ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fleet (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'MPV',
  fuel TEXT NOT NULL DEFAULT 'Bensin',
  price TEXT NOT NULL DEFAULT 'Hubungi Kami',
  year TEXT NOT NULL DEFAULT '2024',
  seats INTEGER NOT NULL DEFAULT 7,
  transmission TEXT NOT NULL DEFAULT 'Automatic',
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Testimonials ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  initials TEXT NOT NULL DEFAULT '',
  rating INTEGER NOT NULL DEFAULT 5,
  text TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT '',
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── FAQ ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Row Level Security ───────────────────────────────────────
-- Enable RLS pada semua table
ALTER TABLE fleet ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Public READ access (landing page bisa baca tanpa auth)
CREATE POLICY "Public read fleet" ON fleet FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (true);

-- Authenticated users (admin) bisa INSERT, UPDATE, DELETE
CREATE POLICY "Admin insert fleet" ON fleet FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update fleet" ON fleet FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete fleet" ON fleet FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert testimonials" ON testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update testimonials" ON testimonials FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete testimonials" ON testimonials FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert faqs" ON faqs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update faqs" ON faqs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete faqs" ON faqs FOR DELETE TO authenticated USING (true);

-- ─── Storage Bucket untuk foto armada ─────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('fleet-images', 'fleet-images', true)
ON CONFLICT DO NOTHING;

-- Public read access untuk images
CREATE POLICY "Public read fleet images" ON storage.objects
  FOR SELECT USING (bucket_id = 'fleet-images');

-- Admin upload/delete
CREATE POLICY "Admin upload fleet images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'fleet-images');
CREATE POLICY "Admin update fleet images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'fleet-images');
CREATE POLICY "Admin delete fleet images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'fleet-images');

-- ─── Seed Data (opsional) ─────────────────────────────────────
-- Data awal armada
INSERT INTO fleet (name, category, fuel, price, year, seats, transmission, sort_order) VALUES
  ('Toyota Agya', 'City Car', 'Bensin', 'Mulai Rp 250rb/hari', '2023', 5, 'Automatic', 1),
  ('Daihatsu Xenia', 'MPV', 'Bensin', 'Mulai Rp 350rb/hari', '2023', 7, 'Automatic', 2),
  ('Toyota Avanza', 'MPV', 'Bensin', 'Mulai Rp 400rb/hari', '2023', 7, 'Automatic', 3),
  ('Toyota Innova Reborn', 'MPV', 'Bensin', 'Mulai Rp 600rb/hari', '2022', 7, 'Automatic', 4),
  ('Honda CR-V', 'SUV', 'Bensin', 'Mulai Rp 800rb/hari', '2023', 7, 'Automatic', 5),
  ('Toyota Alphard', 'Luxury MPV', 'Bensin', 'Hubungi Kami', '2023', 7, 'Automatic', 6),
  ('Toyota Fortuner', 'SUV', 'Diesel', 'Mulai Rp 900rb/hari', '2023', 7, 'Automatic', 7),
  ('Mitsubishi Pajero Sport', 'SUV', 'Diesel', 'Mulai Rp 900rb/hari', '2023', 7, 'Automatic', 8),
  ('Toyota Innova Zenix', 'MPV', 'Hybrid', 'Mulai Rp 750rb/hari', '2024', 7, 'Automatic', 9),
  ('Wuling Air EV', 'City Car', 'Elektrik', 'Mulai Rp 350rb/hari', '2024', 4, 'Automatic', 10),
  ('Chery Omoda E5', 'SUV', 'Elektrik', 'Mulai Rp 600rb/hari', '2024', 5, 'Automatic', 11),
  ('BYD Atto 3', 'SUV', 'Elektrik', 'Mulai Rp 650rb/hari', '2024', 5, 'Automatic', 12);

-- Data awal FAQ
INSERT INTO faqs (question, answer, sort_order) VALUES
  ('Apa saja yang termasuk dalam harga rental?', 'Harga sudah termasuk kendaraan, driver (jika paket with driver), dan asuransi dasar. BBM, tol, dan parkir biasanya ditanggung penyewa, kecuali paket all-inclusive yang sudah mencakup semuanya.', 1),
  ('Berapa minimal waktu rental?', 'Minimal rental adalah 12 jam (full day). Untuk paket weekly (mingguan) dan monthly (bulanan), kami menyediakan harga spesial yang lebih hemat.', 2),
  ('Apakah bisa antar-jemput ke bandara?', 'Tentu! Kami melayani airport transfer di semua kota operasional kami. Hubungi kami untuk jadwal penjemputan yang fleksibel sesuai jam penerbangan Anda.', 3),
  ('Bagaimana cara melakukan booking?', 'Sangat mudah! Hubungi kami via WhatsApp di +62 813-7011-6181, pilih armada dan tanggal yang Anda inginkan, lalu kami akan mengirimkan detail dan konfirmasi pembayaran.', 4),
  ('Apa yang terjadi jika mobil rusak saat rental?', 'Semua armada kami sudah diasuransikan penuh. Untuk kerusakan akibat pemakaian normal (bukan kelalaian), akan ditangani langsung oleh asuransi tanpa biaya tambahan.', 5),
  ('Apakah ada denda jika terlambat mengembalikan kendaraan?', 'Ada overtime charge sebesar Rp 50.000/jam untuk keterlambatan. Jika keterlambatan lebih dari 6 jam, akan dikenakan biaya sewa 1 hari penuh sesuai rate yang berlaku.', 6),
  ('Apakah tersedia paket rental untuk event atau wedding?', 'Ya! Kami menyediakan paket khusus untuk event, wedding car, dan gathering corporate. Silakan hubungi kami untuk custom package sesuai kebutuhan acara Anda.', 7),
  ('Bagaimana sistem pembayaran yang tersedia?', 'Kami menerima pembayaran via transfer bank (BCA, Mandiri, BNI, BRI). Untuk corporate client, tersedia opsi invoice dengan payment term yang fleksibel.', 8);

-- Data awal testimonials
INSERT INTO testimonials (name, role, company, initials, rating, text, location, sort_order) VALUES
  ('Budi Santoso', 'HR Manager', 'PT. Asuransi Askrida Syariah', 'BS', 5, 'Pelayanan sangat profesional, driver ramah dan punctual. Armada yang dikirim selalu bersih dan terawat. Kami sudah menggunakan GoRent untuk transport karyawan dan sangat puas!', 'Jakarta', 1),
  ('Siti Rahma', 'Event Organizer', 'Eventku Indonesia', 'SR', 5, 'GoRent sangat membantu kesuksesan event kami. Koordinasi mudah, harga kompetitif, dan yang paling penting: reliable! Pernah butuh tambahan mobil mendadak, mereka langsung siapkan dalam 2 jam.', 'Bandung', 2),
  ('Andi Wijaya', 'Direktur', 'CV. Mitra Sejahtera', 'AW', 5, 'Untuk kebutuhan corporate fleet management, GoRent adalah pilihan terbaik. Sistem invoicing jelas, customer service responsif, dan armada selalu available.', 'Surabaya', 3),
  ('Lisa Permata', 'Travel Blogger', 'Personal', 'LP', 5, 'Saya sering rental mobil untuk trip ke luar kota. GoRent selalu jadi pilihan utama karena proses booking yang gampang via WhatsApp, driver yang familiar dengan rute wisata, dan harga yang fair.', 'Yogyakarta', 4),
  ('Rudi Hermawan', 'Project Manager', 'PT. Konstruksi Prima', 'RH', 5, 'Project kami sering butuh mobil untuk survey site di berbagai kota. GoRent coverage-nya luas dan service konsisten di setiap kota. One vendor, multiple cities — sangat memudahkan.', 'Medan', 5);
