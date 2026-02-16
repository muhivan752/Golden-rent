import { Car, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import Container from '@/components/shared/Container';

const steps = [
  {
    number: 1,
    icon: Car,
    title: 'Pilih Mobil',
    description:
      'Lihat katalog armada kami dan pilih kendaraan yang sesuai dengan kebutuhan Anda. Filter berdasarkan tipe, jumlah penumpang, dan budget.',
  },
  {
    number: 2,
    icon: MessageCircle,
    title: 'Konfirmasi Booking',
    description:
      'Hubungi kami via WhatsApp atau telepon. Tim kami akan membantu konfirmasi detail rental, tanggal, lokasi penjemputan, dan pembayaran.',
  },
  {
    number: 3,
    icon: Sparkles,
    title: 'Nikmati Perjalanan',
    description:
      'Armada dan driver (jika paket with driver) akan tiba sesuai jadwal. Serah terima kendaraan, dan perjalanan Anda dimulai dengan aman dan nyaman.',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <Container>
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold-700">
            Cara Kerja
          </span>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Proses Rental yang{' '}
            <span className="bg-gradient-to-r from-gold-600 via-gold to-yellow-500 bg-clip-text text-transparent">
              Mudah & Cepat
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Hanya 3 langkah untuk mendapatkan kendaraan rental impian Anda
          </p>
        </div>

        <div className="grid items-start gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center">
              {/* Arrow connector — desktop only */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-12 hidden translate-x-1/2 md:block">
                  <ArrowRight className="h-6 w-6 text-gold/40" />
                </div>
              )}

              {/* Card */}
              <div className="group w-full rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/10">
                {/* Number badge with icon */}
                <div className="relative mx-auto mb-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold to-yellow-500 shadow-lg shadow-gold/25 transition-transform duration-300 group-hover:scale-110">
                    <step.icon className="h-7 w-7 text-white" />
                  </div>
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white ring-2 ring-white">
                    {step.number}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-navy-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
