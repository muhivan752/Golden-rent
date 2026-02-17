import { Bike, Zap, MapPin, Clock, ChevronRight } from 'lucide-react';
import Container from '@/components/shared/Container';
import Button from '@/components/shared/Button';
import { siteConfig } from '@/config/site';

const bikeFeatures = [
  {
    icon: Bike,
    title: 'Motor Harian & Mingguan',
    description: 'Sewa motor untuk kebutuhan harian hingga mingguan dengan harga terjangkau.',
  },
  {
    icon: Zap,
    title: 'Motor Matic & Manual',
    description: 'Pilihan lengkap dari motor matic populer hingga motor sport.',
  },
  {
    icon: MapPin,
    title: 'Tersedia di Banyak Kota',
    description: 'Layanan rental motor di kota-kota wisata dan kota besar Indonesia.',
  },
  {
    icon: Clock,
    title: 'Proses Cepat & Mudah',
    description: 'Booking mudah, ambil motor langsung, tanpa ribet.',
  },
];

export default function ComingSoon() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28">
      {/* Decorative elements */}
      <div className="absolute -left-32 top-20 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute -right-32 bottom-20 h-64 w-64 rounded-full bg-navy/5 blur-3xl" />

      <Container className="relative z-10">
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            Coming Soon
          </span>
        </div>

        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-3xl font-bold text-navy-900 sm:text-4xl">
            Rental <span className="bg-gradient-to-r from-gold-600 via-gold to-yellow-500 bg-clip-text text-transparent">Motor</span> Segera Hadir
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            GoRent akan segera memperluas layanan ke rental motor. Solusi transportasi roda dua yang praktis dan terjangkau.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mb-14 grid max-w-4xl gap-6 sm:grid-cols-2">
          {bikeFeatures.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-white">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy-900">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="mb-5 text-slate-500">Tertarik? Hubungi kami untuk info lebih lanjut</p>
          <Button
            href={siteConfig.whatsappUrl}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hubungi Kami
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
