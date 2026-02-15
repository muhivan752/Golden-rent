import { Car, Clock, Building2, Users, type LucideIcon } from 'lucide-react';
import Container from '@/components/shared/Container';
import { services } from '@/lib/constants';

const iconMap: Record<string, LucideIcon> = {
  Car,
  Clock,
  Building2,
  Users,
};

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <Container>
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Layanan Kami
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Solusi lengkap untuk semua kebutuhan transportasi dan rental kendaraan Anda
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:ring-gold/30"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-navy-900">
                  {Icon && <Icon className="h-6 w-6" />}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
