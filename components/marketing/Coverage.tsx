import { MapPin } from 'lucide-react';
import Container from '@/components/shared/Container';
import { cities } from '@/lib/constants';

export default function Coverage() {
  return (
    <section id="coverage" className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy to-navy-800 py-20 text-white sm:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="coverageGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#coverageGrid)" />
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Jangkauan <span className="text-gold">Nasional</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Tersedia di 33 provinsi di seluruh Indonesia melalui jaringan mitra kami
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {cities.map((city) => (
            <div
              key={city}
              className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm transition-all duration-200 hover:border-gold/50 hover:bg-gold/10"
            >
              <MapPin className="h-3.5 w-3.5 text-gold" />
              <span>{city}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
