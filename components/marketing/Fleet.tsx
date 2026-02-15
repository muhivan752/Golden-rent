import { MessageCircle } from 'lucide-react';
import Container from '@/components/shared/Container';
import Button from '@/components/shared/Button';
import { fleet } from '@/lib/constants';
import { siteConfig } from '@/config/site';

export default function Fleet() {
  return (
    <section id="fleet" className="bg-slate-50 py-20 sm:py-28">
      <Container>
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Armada Kami
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Pilihan kendaraan berkualitas untuk berbagai kebutuhan perjalanan Anda
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map((vehicle) => (
            <div
              key={vehicle.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Placeholder */}
              <div className="flex h-44 items-center justify-center bg-gradient-to-br from-navy-800 to-navy-900">
                <span className="text-6xl">{vehicle.emoji}</span>
              </div>

              <div className="p-5">
                {/* Category Tag */}
                <span className="inline-block rounded-full bg-gold/10 px-3 py-0.5 text-xs font-medium text-gold-700">
                  {vehicle.category}
                </span>

                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  {vehicle.name}
                </h3>

                <p className="mt-1 text-lg font-bold text-gold">
                  {vehicle.price}
                </p>

                {/* Features */}
                <ul className="mt-3 flex flex-wrap gap-2">
                  {vehicle.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  href={`${siteConfig.whatsappUrl}?text=${encodeURIComponent(`Halo, saya tertarik dengan ${vehicle.name}. Bisa info lebih lanjut?`)}`}
                  variant="primary"
                  size="md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full"
                >
                  <MessageCircle className="h-4 w-4" />
                  Booking Sekarang
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
