import { CheckCircle2, Building, Target, Handshake } from 'lucide-react';
import Container from '@/components/shared/Container';

const milestones = [
  'Berdiri tahun 2024 di Medan, Sumatera Utara',
  'Ekspansi ke 33 provinsi di seluruh Indonesia',
  'Membangun jaringan 50+ mitra rental terpercaya',
  'Melayani 2.000+ trip untuk personal & corporate',
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Content */}
          <div>
            <span className="mb-4 inline-block rounded-full bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold-700">
              Tentang Kami
            </span>
            <h2 className="mb-6 text-3xl font-bold text-navy-900 sm:text-4xl">
              PT. Solusi Rental{' '}
              <span className="bg-gradient-to-r from-gold-600 via-gold to-yellow-500 bg-clip-text text-transparent">
                Indonesia
              </span>
            </h2>
            <p className="mb-4 text-base leading-relaxed text-slate-600">
              GoRent adalah platform rental kendaraan on-demand di bawah naungan PT. Solusi Rental Indonesia.
              Berdiri sejak 2024, kami hadir untuk menjawab kebutuhan transportasi yang andal, profesional,
              dan terjangkau di seluruh Indonesia.
            </p>
            <p className="mb-8 text-base leading-relaxed text-slate-600">
              Dengan armada sendiri dan jaringan mitra terpercaya di berbagai kota, kami mampu melayani
              kebutuhan rental harian, bulanan, corporate fleet, hingga airport transfer dengan standar
              layanan yang konsisten.
            </p>

            {/* Milestones */}
            <ul className="space-y-3">
              {milestones.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                  <span className="text-sm text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Vision cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">Visi</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Menjadi platform rental kendaraan #1 di Indonesia yang menghubungkan penyedia dan
                penyewa secara digital.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <Handshake className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">Misi</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Memberikan layanan rental yang mudah, transparan, dan terpercaya bagi setiap pelanggan
                di seluruh Indonesia.
              </p>
            </div>

            <div className="col-span-full rounded-2xl border border-slate-100 bg-gradient-to-br from-navy-900 to-navy-800 p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/20 text-gold">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">Legalitas Perusahaan</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                PT. Solusi Rental Indonesia adalah badan usaha yang terdaftar secara resmi dan beroperasi
                sesuai regulasi yang berlaku di Indonesia.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300">
                  PT Terdaftar
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300">
                  NIB Resmi
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300">
                  Asuransi Kendaraan
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
