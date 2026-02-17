import { Shield, Award, Clock, Headphones, type LucideIcon } from 'lucide-react';
import Container from '@/components/shared/Container';
import { whyUs } from '@/lib/constants';

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Award,
  Clock,
  Headphones,
};

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 sm:py-28">
      <Container>
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Mengapa GoRent?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Komitmen kami untuk memberikan layanan terbaik bagi setiap pelanggan
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold">
                  {Icon && <Icon className="h-8 w-8" />}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
