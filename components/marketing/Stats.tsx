import { Car, MapPin, CalendarCheck, Users } from 'lucide-react';
import Container from '@/components/shared/Container';

const stats = [
  {
    icon: Car,
    value: '100+',
    label: 'Unit Armada',
    description: 'Siap melayani kebutuhan Anda',
  },
  {
    icon: MapPin,
    value: '10+',
    label: 'Kota',
    description: 'Jangkauan nasional',
  },
  {
    icon: CalendarCheck,
    value: '2.000+',
    label: 'Trip Terlayani',
    description: 'Sejak 2024',
  },
  {
    icon: Users,
    value: '50+',
    label: 'Mitra Aktif',
    description: 'Di seluruh Indonesia',
  },
];

export default function Stats() {
  return (
    <section className="relative -mt-12 z-20 pb-8 sm:-mt-16">
      <Container>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/10 sm:p-6"
            >
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-navy-900 sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-700">{stat.label}</p>
              <p className="mt-0.5 text-xs text-slate-400">{stat.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
